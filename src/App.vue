<template>
  <div id="app">
    <tree :treeData="data" />
  </div>
</template>

<script>
import data from './area.json'
import Tree from '@/components/tree/Tree'

export default {
  name: 'App',

  data () {
    return {
      data
    }
  },

  components: {
    Tree
  }
}
</script>
