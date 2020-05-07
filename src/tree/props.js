function getType (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

const filterProps = (props, propsData = {}) => {
  const res = {}
  Object.keys(props).forEach(k => {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k]
    }
  })
  return res
}

const getOptionProps = instance => {
  if (instance.componentOptions) {
    const componentOptions = instance.componentOptions
    const { propsData = {}, Ctor = {} } = componentOptions
    const props = (Ctor.options || {}).props || {}
    const res = {}
    for (const [k, v] of Object.entries(props)) {
      const def = v.default
      if (def !== undefined) {
        res[k] =
          typeof def === 'function' && getType(v.type) !== 'Function' ? def.call(instance) : def
      }
    }
    return { ...res, ...propsData }
  }
  const { $options = {}, $props = {} } = instance
  return filterProps($props, $options.propsData)
}

export {
  filterProps,
  getOptionProps
}
