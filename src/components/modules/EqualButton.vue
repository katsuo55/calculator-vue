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
      this.$store.commit('KeyboardStore/calculation')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
