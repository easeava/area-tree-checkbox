export default {
  name: 'Part',

  props: {
    treeData: {
      type: Array,
      default () {
        return []
      }
    },
    defaultCheckedKeys: {
      type: Array,
      default () {
        return []
      }
    },
    checkedKeys: [Array, Object]
  },

  data () {
    const state = {
      visible: false
    }

    return {
      ...state
    }
  },

  methods: {
    handleShowModal () {
      this.visible = true
    },

    handleHideModal () {
      this.visible = false
    },

    renderCounty (node) {
      return node.counties ? <div slot="content" class='region-part_county'>
        {node.counties.map(county => <a-checkbox>{county.name}</a-checkbox>)}
      </div> : ''
    },

    renderCity (node) {
      return node.cities ? <div slot="content" class='region-part_city'>
        {node.cities.map(city => <a-checkbox>
          <a-popover trigger="hover" placement="rightTop" getPopupContainer={triggerNode => triggerNode.parentNode}>
            { city.name }
            <a-icon type="right" style={{ fontSize: '10px' }} />
            {this.renderCounty(city)}
          </a-popover>
        </a-checkbox>)}
      </div> : ''
    },

    renderProvince (node) {
      return node.provinces ? <a-checkbox-group class='region-part_province'>
        {node.provinces.map(province => <a-checkbox>
          <a-popover trigger="hover" placement="bottom">
            { province.name }
            <a-icon type="down" style={{ fontSize: '10px' }} />
            {this.renderCity(province)}
          </a-popover>
        </a-checkbox>)}
      </a-checkbox-group> : ''
    },

    renderPart () {
      const { treeData } = this.$props

      return treeData.map(node => <div class='region-part'>
        <a-checkbox>{ node.part }</a-checkbox>
        {this.renderProvince(node)}
      </div>)
    },

    renderModal () {
      const { visible } = this

      return <a-modal
        width='690px'
        title='选择区域'
        visible={visible}
        onOk={this.handleHideModal}
        onCancel={this.handleHideModal}
        class='area-modal'
      >
        {this.renderPart()}
        <div slot="footer" class='area-modal_footer'>
          <a-checkbox>全选</a-checkbox>
          <a-button>提交</a-button>
        </div>
      </a-modal>
    }
  },

  render () {
    return <div>
      <a-button onClick={this.handleShowModal}>选择</a-button>
      {this.renderModal()}
    </div>
  }
}
