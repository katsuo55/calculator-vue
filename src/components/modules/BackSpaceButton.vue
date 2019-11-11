<template>
  <div class="l-buckSpaceButton">
    <a class="m-buckSpaceButton m-keyboardButton" @click="click"><i class="fas fa-backspace"></i></a>
  </div>
</template>

<script>
export default {
  name: 'BackSpaceButton',
  methods: {
    click: function () {
      const formula = this.$store.getters.formula.slice(0, -1)
      // 数式設定
      this.$store.commit('KeyboardStore/setFormula', { formula })
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
