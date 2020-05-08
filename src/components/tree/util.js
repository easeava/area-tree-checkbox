import warning from 'warning'

export const getPosition = (level, index) => {
  return `${level}-${index}`
}

export const traverseTreeNodes = (treeNodes, callback) => {
  function processNode (node, index, parent) {
    const pos = node ? getPosition(parent.pos, index) : 0

    const childrenList = (node ? node.children : treeNodes) || []

    if (node) {
      let key = node.key
      if (!key && (key === undefined || key === null)) {
        key = pos
      }

      const data = {
        node,
        index,
        pos,
        key,
        parentPos: parent.node ? parent.pos : null
      }

      callback(data)
    }

    childrenList.forEach((subNode, subIndex) => {
      processNode(subNode, subIndex, { node, pos })
    })
  }

  processNode(null)
}

// 转换一维key=>value 方便匹配查找
export const convertTreeToEntities = (treeNodes) => {
  const posEntities = new Map()
  const keyEntities = new Map()

  const wrapper = {
    posEntities,
    keyEntities
  }

  traverseTreeNodes(treeNodes, item => {
    const { node, index, pos, key, parentPos } = item
    const entity = { node, index, key, pos }

    posEntities.set(pos, entity)
    keyEntities.set(key, entity)

    // Fill children
    entity.parent = posEntities.get(parentPos)
    if (entity.parent) {
      entity.parent.children = entity.parent.children || []
      entity.parent.children.push(entity)
    }
  })

  return wrapper
}

export const mapChildren = (children = [], callback) => {
  const list = children.map(callback)

  if (list.length === 1) {
    return list[0]
  }

  return list
}

export const conductCheck = (keyList, isCheck, keyEntities, checkStatus = {}) => {
  const checkedKeys = new Map()
  const halfCheckedKeys = new Map(); // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(key => {
    checkedKeys.set(key, true)
  });

  (checkStatus.halfCheckedKeys || []).forEach(key => {
    halfCheckedKeys.set(key, true)
  })

  // Conduct up
  function conductUp (key) {
    if (checkedKeys.get(key) === isCheck) return

    const entity = keyEntities.get(key)
    if (!entity) return

    const { children, parent } = entity

    // Check child node checked status
    let everyChildChecked = true
    let someChildChecked = false; // Child checked or half checked

    (children || [])
      .forEach(({ key: childKey }) => {
        const childChecked = checkedKeys.get(childKey)
        const childHalfChecked = halfCheckedKeys.get(childKey)

        if (childChecked || childHalfChecked) someChildChecked = true
        if (!childChecked) everyChildChecked = false
      })

    // Update checked status
    if (isCheck) {
      checkedKeys.set(key, everyChildChecked)
    } else {
      checkedKeys.set(key, false)
    }
    halfCheckedKeys.set(key, someChildChecked)

    if (parent) {
      conductUp(parent.key)
    }
  }

  // Conduct down
  function conductDown (key) {
    if (checkedKeys.get(key) === isCheck) return
    const entity = keyEntities.get(key)
    if (!entity) return

    const { children } = entity

    checkedKeys.set(key, isCheck);

    (children || []).forEach(child => {
      conductDown(child.key)
    })
  }

  function conduct (key) {
    const entity = keyEntities.get(key)

    if (!entity) {
      warning(false, `'${key}' does not exist in the tree.`)
      return
    }

    const { children, parent } = entity
    checkedKeys.set(key, isCheck);

    (children || []).forEach(child => {
      conductDown(child.key)
    })

    // Conduct up
    if (parent) {
      conductUp(parent.key)
    }
  }

  (keyList || []).forEach(key => {
    conduct(key)
  })

  const checkedKeyList = []
  const halfCheckedKeyList = []

  // Fill checked list
  for (const [key, value] of checkedKeys) {
    if (value) {
      checkedKeyList.push(key)
    }
  }

  // Fill half checked list
  for (const [key, value] of halfCheckedKeys) {
    if (!checkedKeys.get(key) && value) {
      halfCheckedKeyList.push(key)
    }
  }

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  }
}
