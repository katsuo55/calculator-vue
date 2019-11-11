<template>
  <div class="l-additionButton">
    <a class="m-additionButton m-keyboardButton" @click="click">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'OperatorButton',
  props: ['operator'],
  methods: {
    click: function () {
      // 数式設定
      this.$store.commit('KeyboardStore/setFormula', {
        formula: `${this.$store.getters.formula}${this.operator}`
      })
      this.$store.commit('KeyboardStore/setIsInput', { isInput: true })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
