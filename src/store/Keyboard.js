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
const actions = {
  updateAmount({ commit, state }) {
    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (!isCheck) {
      return
    }
    try {
      const list = ReversePolishNotation.convert(state.formula)
      const amount = '' + ReversePolishNotation.calculation(list)
      commit('setAmount', { amount })
    } catch (e) {
      commit('setAmount', { amount: 'エラー' })
    }
  },
  calculate({ commit, state }) {
    if (!state.formula) {
      return
    }
    commit('setIsInput', { isInput: true })
    const isCheck = ReversePolishNotation.checkFormula(state.formula)
    if (!isCheck) {
      commit('setAmount', { amount: 'エラー' })
      return
    }
    try {
      const list = ReversePolishNotation.convert(state.formula)
      const amount = ReversePolishNotation.calculation(list)

      commit('setAmount', { amount: `${amount}` })
      commit('setFormula', { formula: `${amount}` })
    } catch (e) {
      commit('setAmount', { amount: 'エラー' })
    }
  }
}

// mutations
const mutations = {
  setIsInput(state, { isInput }) {
    state.isInput = isInput
  },
  setFormula(state, { formula }) {
    state.formula = `${formula}`
  },
  setAmount(state, { amount }) {
    state.amount = `${amount}`
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
