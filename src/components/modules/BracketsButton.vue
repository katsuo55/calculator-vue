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
      this.$store.commit('KeyboardStore/addBrackets', { brackets: this.brackets })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/KeyboardButton';
</style>
