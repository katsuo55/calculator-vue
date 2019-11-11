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
      this.$store.commit('KeyboardStore/backspace')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
