<template>
  <div class="l-equalButton">
    <a class="m-equalButton m-keyboardButton" @click="click"><i class="fas fa-equals"></i></a>
  </div>
</template>

<script>
export default {
  name: 'EqualButton',
  methods: {
    click: function () {
      // 合計値計算
      this.$store.dispatch('KeyboardStore/calculate')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
