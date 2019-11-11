import Keyboard from '@/store/Keyboard'

const {
  getIsInput,
  getFormula,
  getAmount
} = Keyboard.getters

const {
  updateAmount,
  calculate
} = Keyboard.actions

const {
  setIsInput,
  setFormula,
  setAmount,
  clear
} = Keyboard.mutations

describe('Keyboard getterテスト', () => {
  test('getIsInput', () => {
    const state = {
      isInput: false,
      formula: '',
      amount: '0'
    }
    const isInput = getIsInput(state)
    // 結果を検証する
    expect(isInput).toEqual(false)
  })
  test('getFormula', () => {
    const state = {
      isInput: false,
      formula: '1+1',
      amount: '0'
    }
    const formula = getFormula(state)
    // 結果を検証する
    expect(formula).toEqual('1+1')
  })
  test('getAmount', () => {
    const state = {
      isInput: false,
      formula: '1+1',
      amount: '100'
    }
    const amount = getAmount(state)
    // 結果を検証する
    expect(amount).toEqual('100')
  })
})

jest.mock("../../src/library/ReversePolishNotation", () => {
  return {
    // eslint-disable-next-line no-unused-vars
    calculation: (_list) => {
      return 100
    },
    // eslint-disable-next-line no-unused-vars
    convert: (_formula) => {
      return ['1', '2', '+']
    },
    // eslint-disable-next-line no-unused-vars
    checkFormula: (_formula) => {
      return true
    }
  }
})

describe('Keyboard actionテスト', () => {

  test('updateAmount', () => {
    let name = ''
    let params = null

    const commit = (_name, _params) => {
      name = _name
      params = JSON.parse(JSON.stringify(_params))
    }

    const state = {
      isInput: false,
      formula: '',
      amount: '0'
    }
    // ミューテーションを適用する
    updateAmount({commit, state })
    // 結果を検証する
    expect(name).toEqual('setAmount')
    expect(params).toEqual({ amount: '100' })
  })
  test('calculate', () => {
    let calls = []

    const commit = (_name, _params) => {
      calls.push({
        name: _name,
        params: JSON.parse(JSON.stringify(_params))
      })
    }

    const state = {
      isInput: false,
      formula: '1+1',
      amount: '0'
    }
    // ミューテーションを適用する
    calculate({commit, state })

    // 結果を検証する
    expect(calls[0]['name']).toEqual('setIsInput')
    expect(calls[0]['params']).toEqual({ isInput: true })
    expect(calls[1]['name']).toEqual('setAmount')
    expect(calls[1]['params']).toEqual({ amount: '100' })
    expect(calls[2]['name']).toEqual('setFormula')
    expect(calls[2]['params']).toEqual({ formula: '100' })
  })
})

describe('Keyboard mutationテスト', () => {
  test('setIsInput', () => {
    const state = {
      isInput: false,
      formula: '',
      amount: '0'
    }
    // ミューテーションを適用する
    setIsInput(state, { isInput: true })
    // 結果を検証する
    expect(state.isInput).toEqual(true)
  })
  test('setFormula', () => {
    const state = {
      isInput: false,
      formula: '',
      amount: '0'
    }
    // ミューテーションを適用する
    setFormula(state, { formula: '1+1' })
    // 結果を検証する
    expect(state.formula).toEqual('1+1')
  })
  test('setAmount', () => {
    const state = {
      isInput: false,
      formula: '',
      amount: '0'
    }
    // ミューテーションを適用する
    setAmount(state, { amount: '100' })
    // 結果を検証する
    expect(state.amount).toEqual('100')
  })
  test('clear', () => {
    const state = {
      fisInput: true,
      formula: '10×10',
      amount: '100'
    }
    // ミューテーションを適用する
    clear(state)
    // 結果を検証する
    expect(state.isInput).toEqual(false)
    expect(state.formula).toEqual('')
    expect(state.formula).toEqual('')
  })
})