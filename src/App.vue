<template>
  <div id="app">
    <tree :treeData="data" />
  </div>
</template>

<script>
import data from './area.json'
import Tree from './tree/Tree'

export default {
  name: 'App',

  data () {
    return {
      data,
      checked: []
    }
  },

  components: {
    Tree
  },

  mounted () {
  }
}
</script>

<style lang="scss">
#app {
  width: 690px;
  margin: 50px auto;
}
</style>
