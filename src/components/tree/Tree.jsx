import PropTypes from 'vue-types'
import { conductCheck, convertTreeToEntities } from './util'

export default {
  name: 'cTree',

  props: {
    treeData: PropTypes.array,
    defaultCheckedKeys: PropTypes.array,
    checkedKeys: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  },

  data () {
    const state = {
      _keyEntities: new Map(),
      _checkedKeys: [],
      _halfCheckedKeys: [],
      _treeNode: []
    }

    return {
      ...state
    }
  },

  methods: {
    renderTreeNode () {
    }
  },

  mounted () {
    const { keyEntities } = convertTreeToEntities(this.treeData)
    console.log(conductCheck([820000], true, keyEntities))
  },

  render () {
    return <div></div>
  }
}
