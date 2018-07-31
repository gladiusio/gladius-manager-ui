import { getJSON, delayed } from '../../../backend';
import mockedApplicationsResponse from '../../../mockedResponses/applications';

const mockData = process.env.MOCK_DATA === "true";

export function fetchApplications() {
  if (mockData) {
    return delayed(() => {
      return mockedApplicationsResponse;
    }, 2000);
  }

  return async (dispatch) => {
    return await dispatch(createApiAction(API_FETCH_APPLICATIONS, {}, {
      path: '/node/applications',
      method: 'GET'
    }));
  };
}
