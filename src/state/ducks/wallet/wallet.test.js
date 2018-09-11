import test from 'tape';

import * as walletActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import mockStore from '../../../testUtils/mockStore';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import {
  SET_PROCESSING_BALANCE,
  SET_WALLET_ADDRESS,
  SET_WALLET_LOADING,
  SET_GLA_BALANCE_LOADING,
  SET_GLA_BALANCE_SUCCESS,
  SET_ETH_BALANCE_SUCCESS,
  API_FETCH_BALANCE,
  API_CREATE_WALLET
} from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.walletAddress, null, 'sets wallet address to null');
  t.equals(state.glaBalance, null, 'sets gla balance to null');
  t.equals(state.ethBalance, null, 'sets eth balance to null');
  t.equals(state.walletLoading, false, 'sets wallet loading to false');
  t.end();
});

test('Wallet - setWalletAddress', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(walletActions.setWalletAddress('mywalletaddress'))
  );

  t.strictEqual(state.walletAddress, 'mywalletaddress', 'sets the wallet address');
  t.end();
});

test('Wallet - setWalletIsLoading', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(walletActions.setWalletIsLoading(true))
  );

  t.equals(state.walletLoading, true, 'sets the wallet loading');
  t.end();
});

test('Wallet - setGlaBalanceSuccess', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(walletActions.setGlaBalanceSuccess(10))
  );

  t.equals(state.glaBalance, 10, 'sets the gla balance');
  t.end();
});

test('Wallet - setEthBalanceSuccess', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(walletActions.setEthBalanceSuccess(10))
  );

  t.equals(state.ethBalance, 10, 'sets the eth balance');
  t.end();
});

test('Wallet - createUserWallet', (t) => {
  const store = mockStore(
    { account: { name: 'kenny', email: 'test@example.com', passphraseValue: '1234' } }
  );

  store.dispatch(walletActions.createUserWallet()).then(async () => {
    t.same(
      await getAction(store, API_CREATE_WALLET),
      createApiAction(API_CREATE_WALLET, {}, {
        path: '/keystore/account/create',
        method: 'POST',
        body: { passphrase: '1234' },
      }),
      'makes the api request'
    );

    t.same(
      await getAction(store, SET_WALLET_ADDRESS),
      { type: SET_WALLET_ADDRESS, payload: { address: 'myaddresshere' } },
      'sets the address from the response'
    );
    t.end();
  });
});

test('Wallet - fetchGLABalance', (t) => {
  const store = mockStore(
    { wallet: { walletAddress: 'mytestaddress' } }
  );

  store.dispatch(walletActions.fetchGLABalance()).then(async () => {
    t.same(
      await getAction(store, API_FETCH_BALANCE),
      createApiAction(API_FETCH_BALANCE, {}, {
        path: '/account/mytestaddress/balance/gla',
        method: 'GET'
      }),
      'makes the api request'
    );

    t.same(
      await getAction(store, SET_GLA_BALANCE_SUCCESS),
      { type: SET_GLA_BALANCE_SUCCESS, payload: { glaBalance: 200 } },
      'sets the balance from the response'
    );
    t.end();
  });
});
