<template>
  <div id="app" @check="onCheck">
    <tree :treeData="data" v-model="checkedList" @check="onCheck" />
    {{checkedList}}
  </div>
</template>

<script>
import data from './area.json'
import Tree from '@/components/tree/Tree'

export default {
  name: 'App',

  data () {
    return {
      data,
      checkedList: []
    }
  },

  methods: {
    onCheck () {
      console.log('check')
    }
  },

  components: {
    Tree
  }
}
</script>
