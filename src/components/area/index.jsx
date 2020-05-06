import County from './County'
import Part from './Part'
import Province from './Province'

const install = function (Vue) {
  Vue.component(County.name, County)
  Vue.component(Part.name, Part)
  Vue.component(Province.name, Province)
}

export {
  County,
  Part,
  Province
}

export default {
  install
}
