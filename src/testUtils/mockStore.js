import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import apiService from '../state/middlewares/apiService';

export default configureMockStore([apiService, thunk]);
