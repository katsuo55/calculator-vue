<template>
  <div class="l-numberButton">
    <a class="m-numberButton m-keyboardButton" @click="clickNumber">{{number}}</a>
  </div>
</template>

<script>
export default {
  name: 'NumberButton',
  props: ['number'],
  methods: {
    clickNumber: function () {
      this.$store.commit('KeyboardStore/addNumber', { number: this.number })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
