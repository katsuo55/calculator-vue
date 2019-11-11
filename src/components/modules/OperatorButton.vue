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
      this.$store.commit('KeyboardStore/addOperator', { operator: this.operator })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
