import KeyBoard from '@/store/Keyboard'

const {
  addNumber,
  backspace,
  clear,
  addOperator,
  addDecimalPoint,
  addBrackets,
  calculation
} = KeyBoard.mutations

describe('Reverse Polish Notification', () => {
  test('addNumber', () => {
    const state = {
      formula: '',
      amount: 0,
      isInput: false
    }
    // ミューテーションを適用する
    addNumber(state, { number: 10 })
    // 結果を検証する
    expect(state.formula).toEqual('10')
    expect(state.isInput).toEqual(true)
  })
  test('backspace', () => {
    const state = {
      formula: '10',
      amount: '0',
      isInput: false
    }
    // ミューテーションを適用する
    backspace(state)
    // 結果を検証する
    expect(state.formula).toEqual('1')
  })
  test('clear', () => {
    const state = {
      formula: '10',
      amount: '0',
      isInput: true
    }
    // ミューテーションを適用する
    clear(state)
    // 結果を検証する
    expect(state.formula).toEqual('')
    expect(state.isInput).toEqual(false)
  })
  test('addOperator', () => {
    const state = {
      formula: '10',
      amount: '0',
      isInput: false
    }
    // ミューテーションを適用する
    addOperator(state, { operator: '+' })
    // 結果を検証する
    expect(state.formula).toEqual('10+')
    expect(state.isInput).toEqual(true)
  })
  test('addDecimalPoint', () => {
    const state = {
      formula: '10',
      amount: '0',
      isInput: false
    }
    // ミューテーションを適用する
    addDecimalPoint(state)
    // 結果を検証する
    expect(state.formula).toEqual('10.')
    expect(state.isInput).toEqual(true)
  })
  test('addBrackets', () => {
    const state = {
      formula: '10*',
      amount: '0',
      isInput: false
    }
    // ミューテーションを適用する
    addBrackets(state, { brackets: '(' })
    // 結果を検証する
    expect(state.formula).toEqual('10*(')
    expect(state.isInput).toEqual(true)
  })
  test('calculation', () => {
    const state = {
      formula: '1+2+3+4+5+6+7',
      amount: 0,
      isInput: false
    }
    // ミューテーションを適用する
    calculation(state)
    // 結果を検証する
    expect(state.formula).toEqual('28')
    expect(state.amount).toEqual('28')
    expect(state.isInput).toEqual(true)
  })
})
