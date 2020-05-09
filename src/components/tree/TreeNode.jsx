import PropTypes from 'vue-types'

export default {
  name: 'cTreeNode',

  inject: {
    cTree: { default: () => {} }
  },

  props: {
    children: PropTypes.array,
    checked: PropTypes.bool,
    halfChecked: PropTypes.bool,
    eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.any,
    pos: PropTypes.string
  },

  methods: {
    onCheck (e) {
      e.preventDefault()
      const {
        checked,
        cTree: { onNodeCheck }
      } = this

      const targetChecked = !checked
      onNodeCheck(e, this, targetChecked)
    },

    renderChildren () {
      const {
        pos,
        cTree: { renderTreeNode },
        title,
        children
      } = this

      if (children.length) {
        let placement = 'bottom'

        const render = children.map((node, index) => {
          if (!node.children) placement = 'rightTop'
          return renderTreeNode(node, index, pos)
        })

        return <a-popover trigger="click" placement={placement} getPopupContainer={triggerNode => triggerNode.parentNode}>
          {title}
          <template slot="content">
            <div class='c-tree-node'>
              {render}
            </div>
          </template>
        </a-popover>
      }

      return title
    }
  },

  render () {
    const { checked, halfChecked } = this.$props
    return <a-checkbox checked={checked} indeterminate={halfChecked} onChange={this.onCheck}>
      {this.renderChildren()}
    </a-checkbox>
  }
}
