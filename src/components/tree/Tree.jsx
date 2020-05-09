import PropTypes from 'vue-types'
import omit from 'omit.js'
import { convertTreeToEntities, getPosition, conductCheck } from './util'
import TreeNode from './TreeNode'
import './style.scss'

export default {
  name: 'cTree',

  provide () {
    return {
      cTree: this
    }
  },

  model: {
    prop: 'checkedKeys',
    event: 'check'
  },

  props: {
    treeData: PropTypes.array,
    defaultCheckedKeys: PropTypes.array,
    checkedKeys: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  },

  data () {
    const state = {
      // 值对应节点数据机和
      _keyEntities: new Map(),
      // 选中节点值机和
      _checkedKeys: [],
      // 半选节点值机和
      _halfCheckedKeys: []
    }

    return {
      ...state,
      ...this.init(this.$props)
    }
  },

  watch: {
    treeData: {
      handler () {
        this.init(this.$props)
      },
      immediate: true
    }
  },

  methods: {
    init (props) {
      const newState = {}
      const { keyEntities } = convertTreeToEntities(props.treeData)
      newState._keyEntities = keyEntities

      return newState
    },

    onNodeCheck (e, treeNode, checked) {
      const {
        _keyEntities: keyEntities,
        _checkedKeys: oriCheckedKeys,
        _halfCheckedKeys: oriHalfCheckedKeys
      } = this.$data

      const { eventKey } = treeNode

      const { checkedKeys, halfCheckedKeys } = conductCheck([eventKey], checked, keyEntities, {
        checkedKeys: oriCheckedKeys,
        halfCheckedKeys: oriHalfCheckedKeys
      })

      Object.assign(this.$data, {
        _checkedKeys: checkedKeys,
        _halfCheckedKeys: halfCheckedKeys
      })

      this.$forceUpdate()

      this.$emit('check', checkedKeys)
    },

    onCheck (key, e) {
      e.preventDefault()

      const {
        target: {
          checked
        }
      } = e

      this.onNodeCheck(e, {
        eventKey: key
      }, checked)
    },

    // 渲染节点树
    renderTreeNode (props, index, level = 0) {
      const {
        _checkedKeys: checkedKeys = [],
        _halfCheckedKeys: halfCheckedKeys = []
      } = this.$data
      const pos = getPosition(level, index)
      let key = props.key
      if (!key && (key === undefined || key === null)) {
        key = pos
      }

      return <TreeNode {...{
        props: {
          ...omit(props, ['key']),
          eventKey: key,
          checked: checkedKeys.indexOf(key) !== -1,
          halfChecked: halfCheckedKeys.indexOf(key) !== -1
        }
      }} />
    }
  },

  render () {
    const {
      _checkedKeys: checkedKeys = [],
      _halfCheckedKeys: halfCheckedKeys = []
    } = this.$data

    return <div class='c-tree'>
      {this.treeData.map(node => {
        return <div class='c-tree-section'>
          <a-checkbox onChange={this.onCheck.bind(this, node.key)} checked={checkedKeys.indexOf(node.key) !== -1} indeterminate={halfCheckedKeys.indexOf(node.key) !== -1} class='c-tree-part'>{node.title}</a-checkbox>
          <div class='c-tree-province'>
            {node.children.map((child, index) => { return this.renderTreeNode(child, index) })}
          </div>
        </div>
      })}
    </div>
  }
}
