import { createAction, nameAction } from '../../util/createAction';
import { postData, delayed } from "../../backend";
import { getMockedResponse } from '../../mockedResponses';

const baseUrl = "http://localhost:3001/api";
const mockData = process.env.MOCK_DATA === "true";
const namespace = 'apiService';

function getStatusCodeType(statusCode) {
  return nameAction(namespace, `STATUS_CODE_${statusCode}`);
}

export const API_STATUS_CODE_UNAUTHORIZED = getStatusCodeType(405);
export const API_STATUS_CODE_NO_WALLET = getStatusCodeType(400);

function createStatusCodeAction(statusCode, response) {
  return createAction(getStatusCodeType(statusCode), { response });
}

const apiService = () => (next) => (action) => {
  const result = next(action);
  if (!action.meta || !action.meta.apiService) {
    return result;
  }

  const { path, method = "GET", body, headers } = action.meta.apiService;

  if (!path) {
    throw new Error(`'path' not specified for async action ${ action.type }`);
  }

  if (mockData) {
    return handleMockResponse(path);
  }

  const url = `${baseUrl}${path}`;

  return fetchAndCreateAction(url, body, headers, method, next);
};

export default apiService;

function fetchAndCreateAction(url, body, headers = {}, method = 'POST', next) {
  return window.fetch(url, {
    body: JSON.stringify(body),
    headers,
    method,
  }).then((res) => {
    const { status } = res;
    const responseJson = res.json();

    if (status && responseJson) {
      next(createStatusCodeAction(status, responseJson));
    }

    return responseJson;
  });
}

function handleMockResponse(path) {
  return delayed(() => getMockedResponse(path), 2000);
}
