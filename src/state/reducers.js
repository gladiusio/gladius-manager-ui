import { combineReducers } from 'redux';

export { default as applications } from './ducks/applications';
export { default as account } from './ducks/account';
export { default as authorization } from './ducks/authorization';
export { default as expectedUsage } from './ducks/expectedUsage';
export { default as pools } from './ducks/pools';
export { default as serviceInfo } from './ducks/serviceInfo';
export { default as signup } from './ducks/signup';
export { default as toasts } from './ducks/toasts';
export { default as transactions } from './ducks/transactions';
export { default as wallet } from './ducks/wallet';
export { reducer as form } from 'redux-form';
