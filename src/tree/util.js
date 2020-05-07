import omit from 'omit.js'
import TreeNode from './TreeNode'

const internalProcessProps = (props = {}) => {
  return {
    props: omit(props, ['on', 'key', 'class', 'className', 'style']),
    on: props.on || {},
    class: props.class || props.className,
    style: props.style,
    key: props.key
  }
}

export function convertDataToTree (h, treeData, processor) {
  if (!treeData) return []

  const { processProps = internalProcessProps } = processor || {}
  const list = Array.isArray(treeData) ? treeData : [treeData]
  return list.map(({ children, ...props }) => {
    const childrenNodes = convertDataToTree(h, children, processor)
    return <TreeNode {...processProps(props)}>{childrenNodes}</TreeNode>
  })
}

export function convertData (data) {
  if (!data) return []

  return data.map((item, index) => {
    let _item = Object.assign({}, item)

    if (_item.children) {
      _item = Object.assign({}, _item, {
        indeterminate: false,
        children: convertData(item.children)
      })
    }

    return _item
  })
}

export function isEmptyElement (c) {
  return !(c.tag || (c.text && c.text.trim() !== ''))
}

export function filterEmpty (children = []) {
  return children.filter(c => !isEmptyElement(c))
}

export function mapChildren (children = [], func) {
  const list = children.map(func)
  if (list.length === 1) {
    return list[0]
  }
  return list
}

export function getDeep (arr) {
  if (!arr || arr.length === 0) return 0
  const stack = []

  let pointer = 0
  let deep = pointer
  stack.push({ value: arr, isEnd: true })

  while (stack.length > 0) {
    const { value, isEnd } = stack.pop()

    if (Array.isArray(value)) {
      pointer++
      if (isEnd) {
        stack.push({ value: 1, isEnd: true })
      }
      deep = Math.max(deep, pointer)

      value.reduceRight((pre, cur, index) => {
        stack.push({ value: cur.children, isEnd: index === (value.length - 1) })
      }, 0)
    } else {
      if (isEnd) {
        pointer--
      }
    }
  }
  return deep
}
