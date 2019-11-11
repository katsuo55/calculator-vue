import ReversePolishNotation from '@/library/ReversePolishNotation'

// initial state
const state = {
  isInput: false,
  formula: '',
  amount: '0'
}

// getters
const getters = {
  getIsInput: (state) => {
    return state.isInput
  },
  getFormula: (state) => {
    return state.formula
  },
  getAmount: (state) => {
    return state.amount
  }
}

// actions
const actions = {}

// mutations
const mutations = {
  addNumber(state, { number }) {
    state.isInput = true
    state.formula += `${number}`
    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (!isCheck) {
      return
    }
    try {
      const list = ReversePolishNotation.convert(state.formula)
      state.amount = ReversePolishNotation.calculation(list)
    } catch (e) {
      state.amount = 'エラー'
    }
  },
  addOperator(state, { operator }) {
    state.isInput = true
    state.formula += `${operator}`
  },
  addDecimalPoint(state) {
    state.isInput = true
    state.formula += '.'
  },
  addBrackets(state, { brackets }) {
    state.isInput = true
    state.formula += `${brackets}`

    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (!isCheck) {
      return
    }
    try {
      const list = ReversePolishNotation.convert(state.formula)
      state.amount = ReversePolishNotation.calculation(list)
    } catch (e) {
      state.amount = 'エラー'
    }
  },
  calculation(state) {
    state.isInput = true
    if (!state.formula) {
      return
    }
    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (!isCheck) {
      state.amount = 'エラー'
      return
    }
    try {
      const list = ReversePolishNotation.convert(state.formula)
      const amount = ReversePolishNotation.calculation(list)
      state.formula = `${amount}`
      state.amount = `${amount}`
    } catch (e) {
      state.amount = 'エラー'
    }
  },
  backspace(state) {
    state.isInput = true
    state.formula = state.formula.slice(0, -1)
    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (isCheck) {
      const list = ReversePolishNotation.convert(state.formula)
      state.amount = ReversePolishNotation.calculation(list)
    }
  },
  clear(state) {
    state.isInput = false
    state.formula = ''
    state.amount = '0'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
