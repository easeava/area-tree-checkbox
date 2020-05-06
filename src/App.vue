<template>
  <div id="app">
    <part :treeData='data'>

    </part>
  </div>
</template>

<script>
import Area from '@/components/area'
import Vue from 'vue'
import data from './area.json'
import '@/components/area/style/index.scss'

Vue.use(Area)

export default {
  name: 'App',

  data () {
    return {
      data,
      checked: []
    }
  },

  mounted () {
    console.log(data)
  }
}
</script>
