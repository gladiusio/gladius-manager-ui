import { nameAction } from '../../../util/createAction';

const namespace = 'applications';

export const GET_ALL_APPLICATIONS_ERROR = nameAction(
  namespace,
  'GET_ALL_APPLICATIONS_ERROR'
);
export const GET_ALL_APPLICATIONS_SUCCESS = nameAction(
  namespace,
  'GET_ALL_APPLICATIONS_SUCCESS'
);
export const API_FETCH_APPLICATIONS = nameAction(
  namespace,
  'API_FETCH_APPLICATIONS'
);
