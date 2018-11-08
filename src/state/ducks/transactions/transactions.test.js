import test from 'tape';

import * as transactionsActions from './actions';
import reducer from './reducers';
import createTestAction from '../../../testUtils/createTestAction';
import mockStore from '../../../testUtils/mockStore';
import getAction from '../../../testUtils/getAction';
import { createApiAction } from '../../../util/createAction';
import mockedTransactions from '../../../mockedResponses/transactions'
import { API_FETCH_TRANSACTIONS, GET_ALL_TRANSACTIONS_SUCCESS } from './types';

test('reducer defaults', (t) => {
  const state = reducer();

  t.equals(state.transactions.length, 0, 'sets transactions address to an empty array');
  t.equals(state.typeFilter, '', 'sets typeFiler to an empty string');
  t.end();
});

test('Transactions - getAllTransactionsSuccess', (t) => {
  let state = reducer();
  let testTransactions = [{ hash: 'tx1 '}, { hash: 'tx2' }];
  state = reducer(
    state,
    createTestAction(transactionsActions.getAllTransactionsSuccess(testTransactions))
  );

  t.strictEqual(state.transactions, testTransactions, 'sets the transactions');
  t.end();
});

test('Transactions - setFilterType', (t) => {
  let state = reducer();
  state = reducer(
    state,
    createTestAction(transactionsActions.setFilterType('withdraw'))
  );

  t.equals(state.typeFilter, 'withdraw', 'sets the filter type');
  t.end();
});

test('Transactions - getAllTransactions', (t) => {
  const store = mockStore(
    { wallet: { walletAddress: 'mytestaddress' } }
  );

  store.dispatch(transactionsActions.getAllTransactions()).then(async () => {
    t.same(
      await getAction(store, API_FETCH_TRANSACTIONS),
      createApiAction(API_FETCH_TRANSACTIONS, {}, {
        path: '/account/mytestaddress/transactions/gla',
        method: 'POST',
      }),
      'makes the api request'
    );

    t.same(
      await getAction(store, GET_ALL_TRANSACTIONS_SUCCESS),
      { type: GET_ALL_TRANSACTIONS_SUCCESS, payload: { transactions: mockedTransactions.response } },
      'sets the transactions from the response'
    );
    t.end();
  });
});
