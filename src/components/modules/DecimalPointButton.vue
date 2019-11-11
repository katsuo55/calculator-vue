<template>
  <div class="l-DecimalPointButton">
    <a class="m-decimalPointButton m-keyboardButton" @click="click">.</a>
  </div>
</template>

<script>
export default {
  name: 'DecimalPointButton',
  methods: {
    click: function () {
      // 数式設定
      this.$store.commit('KeyboardStore/setFormula', {
        formula: `${this.$store.getters.formula}.`
      })
      this.$store.commit('KeyboardStore/setIsInput', { isInput: true })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
