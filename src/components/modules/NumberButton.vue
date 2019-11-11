<template>
  <div class="l-numberButton">
    <a class="m-numberButton m-keyboardButton" @click="click">{{number}}</a>
  </div>
</template>

<script>
export default {
  name: 'NumberButton',
  props: ['number'],
  methods: {
    click: function () {
      // 数式設定
      this.$store.commit('KeyboardStore/setFormula', {
        formula: `${this.$store.getters.formula}${this.number}`
      })
      this.$store.commit('KeyboardStore/setIsInput', { isInput: true })
      // 合計値更新
      this.$store.dispatch('KeyboardStore/updateAmount')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
