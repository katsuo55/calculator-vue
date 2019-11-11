<template>
  <div class="l-clearButton">
    <a class="m-clearButton m-keyboardButton" @click="click">AC</a>
  </div>
</template>

<script>
export default {
  name: 'ClearButton',
  methods: {
    click: function () {
      this.$store.commit('KeyboardStore/clear')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
