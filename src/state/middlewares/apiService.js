import { createAction, nameAction } from '../../util/createAction';
import serviceUrlMap from '../../util/serviceUrlMap';
import { postData, delayed } from "../../backend";
import { getMockedResponse } from '../../mockedResponses';

const mockData = process.env.MOCK_DATA === "true";
const namespace = 'apiService';

function getStatusCodeType(statusCode, service) {
  return nameAction(namespace, `${service.toUpperCase()}_STATUS_CODE_${statusCode}`);
}

export const API_STATUS_CODE_UNAUTHORIZED = getStatusCodeType(405, 'networkGateway');
export const API_STATUS_CODE_NO_WALLET = getStatusCodeType(400, 'networkGateway');

function createStatusCodeAction(statusCode, response, service) {
  return createAction(getStatusCodeType(statusCode, service), { response });
}

const apiService = () => (next) => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.apiService) {
    return result;
  }

  const {
    path,
    service = 'networkGateway',
    method = 'GET',
    body,
    headers
  } = action.meta.apiService;

  if (!path) {
    throw new Error(`'path' not specified for async action ${ action.type }`);
  }

  if (mockData) {
    return handleMockResponse(path);
  }

  let urlConstructor = serviceUrlMap[service];
  if (!urlConstructor) {
    urlConstructor = serviceUrlMap.networkGateway;
  }

  const url = urlConstructor(path);

  return fetchAndCreateAction(url, body, headers, method, next, service);
};

export default apiService;

function fetchAndCreateAction(url, body, headers = {}, method = 'POST', next, service) {
  return window.fetch(url, {
    body: JSON.stringify(body),
    headers,
    method,
  }).then((res) => {
    const { status } = res;
    const responseJson = res.json();

    if (status && responseJson) {
      next(createStatusCodeAction(status, responseJson, service));
    }

    return responseJson;
  });
}

function handleMockResponse(path) {
  return delayed(() => getMockedResponse(path), 200);
}
