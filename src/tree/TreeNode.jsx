import PropTypes from 'vue-types'
import { mapChildren } from './util'

export default {
  name: 'PTreeNode',

  inject: {
    pTree: { default: () => {} }
  },

  props: {
    name: PropTypes.any,
    value: PropTypes.any
  },

  methods: {
    onCheck () {

    },

    renderChildren () {
      const {
        pTree: { renderTreeNode },
        $slots: { default: children },
        name
      } = this
      console.log(children)
      return children ? <div>
        <a-checkbox>{ name }</a-checkbox>
        <ul>
          {mapChildren(children, (node, index) => renderTreeNode(node, index))}
        </ul>
      </div> : <a-checkbox>{ name }</a-checkbox>
    }
  },

  render () {
    return <li>
      {this.renderChildren()}
    </li>
  }
}
