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
      this.$store.commit('KeyboardStore/addDecimalPoint')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
