import { authorizationActions } from '../ducks/authorization';
import { postData, delayed } from "../../backend";
import { getMockedResponse } from '../../mockedResponses';

const { setUnauthorized } = authorizationActions;
const baseUrl = "http://localhost:3001/api";
const mockData = process.env.MOCK_DATA === "true";

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

  return fetchCatch403(url, body, headers, method).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next),
  );
};

export default apiService;

function handleErrors(err, action, next) {
  next(setUnauthorized(action));
  return Promise.resolve(err);
}

function handleResponse(res, action, next) {
  return res;
}

function fetchCatch403(url, body, headers = {}, method = 'POST') {
  return window.fetch(url, {
    body: JSON.stringify(body),
    headers,
    method,
  }).then((res) => {
    const { status } = res;

    return new Promise((resolve, reject) => {
      if (status !== 403) {
        resolve(res.json());
      } else {
        reject(res.json());
      }
    });
  }, (err) => {
    Promise.resolve(err);
  });
}

function handleMockResponse(path) {
  return delayed(() => getMockedResponse(path), 2000);
}
