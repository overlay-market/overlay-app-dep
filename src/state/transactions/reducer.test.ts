import {createStore, Store} from 'redux'
import {addTransaction} from './actions'
import reducer, {initialState, TransactionState} from './reducer'

describe('transaction reducer', () => {
  let store: Store<TransactionState>

  beforeEach(() => {
    store = createStore(reducer, initialState)
  })

  describe('addTransaction', () => {
    it('adds the transaction', () => {
      const initialTime = new Date().getTime()
      store.dispatch(
        addTransaction({
          chainId: 1,
          summary: 'meow meow meow',
          hash: '0x69',
          approval: {tokenAddress: 'abc', spender: 'def'},
          from: 'abc',
        }),
      )
      const txs = store.getState()
      expect(txs[1]).toBeTruthy()
      expect(txs[1]?.['0x69']).toBeTruthy()
      const tx = txs[1]?.['0x69']
      expect(tx).toBeTruthy()
      expect(tx?.hash).toEqual('0x69')
      expect(tx?.summary).toEqual('meow meow meow')
      expect(tx?.approval).toEqual({tokenAddress: 'abc', spender: 'def'})
      expect(tx?.from).toEqual('abc')
      expect(tx?.addedTime).toBeGreaterThanOrEqual(initialTime)
    })
  })
})
