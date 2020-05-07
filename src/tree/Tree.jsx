import PropTypes from 'vue-types'
import { getDeep, convertData } from './util'

export default {
  name: 'PTree',

  model: {
    prop: 'checkedKeys',
    event: 'check'
  },

  props: {
    /** （受控）选中复选框的树节点 */
    checkedKeys: PropTypes.array,
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys: PropTypes.array,
    treeData: PropTypes.array
  },

  data () {
    const state = {
      _treeData: []
    }

    return {
      ...state
    }
  },

  watch: {
    treeData () {
      this.getTreeData()
    }
  },

  computed: {
    maxLevel () {
      const { treeData } = this
      return getDeep(treeData) - 1
    }
  },

  provide () {
    return {
      pTree: this
    }
  },

  mounted () {
    this.getTreeData()
  },

  methods: {
    getTreeData () {
      this._treeData = convertData(this.treeData)

      this.$forceUpdate()
    },

    onNodeCheck () {

    },

    handleChange (e, level) {
      console.log(e, level)
    },

    renderTreeNode (node, level = 0) {
      const { maxLevel } = this

      return <a-checkbox-group
        name="test"
        onChange={this.handleChange.bind(this, level)}
        options={node}
        {...{
          scopedSlots: {
            label: option => {
              const iconType = level ? 'right' : 'down'
              const placement = level === maxLevel - 1 ? 'rightTop' : 'bottom'

              return option.children ? <a-popover trigger="click" placement={placement} getPopupContainer={triggerNode => triggerNode.parentNode}>
                { option.name }
                <a-icon type={iconType} style={{ fontSize: '10px' }} />
                <template slot="content">
                  {this.renderTreeNode(option.children, level + 1)}
                </template>
              </a-popover> : option.name
            }
          }
        }}>
      </a-checkbox-group>
    }
  },

  render () {
    const { _treeData: treeData } = this

    return this.renderTreeNode(treeData)
  }
}
