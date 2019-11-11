<template>
  <div class="l-bracketsButton">
    <a class="m-bracketsButton m-keyboardButton" @click="click">{{brackets}}</a>
  </div>
</template>

<script>
export default {
  name: 'BracketsButton',
  props: ['brackets'],
  methods: {
    click: function () {
      // 数式設定
      this.$store.commit('KeyboardStore/setFormula', {
        formula: `${this.$store.getters.formula}${this.brackets}`
      })
      this.$store.commit('KeyboardStore/setIsInput', { isInput: true })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
