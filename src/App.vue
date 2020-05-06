<template>
  <div id="app">
    <div class="region-part" v-for="part in data" :key="part.value">
      <a-checkbox>
        {{part.name}}
      </a-checkbox>
       <a-checkbox-group :options='part.provinces' class="region-part_province">
        <template slot="label" slot-scope="option">
          <a-popover trigger="hover" placement="bottom" :getPopupContainer="triggerNode => triggerNode.parentNode">
          {{option.name}}
          <a-icon type="right" :style="{ fontSize: '10px' }" />
          <template slot="content">
            <a-checkbox-group :options="option.cities" class="region-part_city">
              <template slot="label" slot-scope="option">
                <a-popover trigger="hover" placement="rightTop" :getPopupContainer="triggerNode => triggerNode.parentNode">
                  {{option.name}}
                  <a-icon type="right" :style="{ fontSize: '10px' }" />
                  <template slot='content'>
                    <a-checkbox-group :options="option.counties" class="region-part_county">
                      <template slot="label" slot-scope="option">
                        {{option.name}}
                      </template>
                    </a-checkbox-group>
                  </template>
                </a-popover>
              </template>
            </a-checkbox-group>
          </template>
          </a-popover>
      </template>
      </a-checkbox-group>
    </div>

    <!-- <a-checkbox-group :options='data'>
      <template slot="label" slot-scope="option">
        <a-popover trigger="hover" placement="bottom">
          {{option.name}}
          <a-icon type="down" :style='{ fontSize: "10px" }' />
          <template slot="content">
          </template>
        </a-popover>
      </template>
    </a-checkbox-group> -->
  </div>
</template>

<script>
import data from './area.json'

export default {
  name: 'App',

  data () {
    return {
      data,
      checked: [],
      demo: [
        {
          label: '测试',
          value: 1
        },
        {
          label: '测试',
          value: 2
        },
        {
          label: '测试',
          value: 3
        }
      ]
    }
  },

  mounted () {
    console.log(data)
  }
}
</script>

<style lang="scss">
.region-part {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  font-size: 12px;

  > .ant-checkbox-wrapper {
    flex-basis: 15%;
  }

  .region-part_province {
    flex-basis: 85%;

    > .ant-checkbox-wrapper {
      margin-bottom: 10px;
    }

    > .ant-checkbox-wrapper {
      width: 32%;
    }
  }

}

.region-part_city, .region-part_county, .region-part_province {
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
}

.region-part, .region-part_city, .region-part_county {

  .anticon {
    margin-left: 6px;
  }
}

.region-part_city, .region-part_county {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  max-height: 330px;
  overflow-y: auto;
}

.region-part_county {
  white-space: nowrap;
}

.area-modal {
  .ant-modal-header {
    padding: 10px 14px;
  }

  .ant-modal-close-x {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }

  .ant-modal-body {
    padding: 14px 14px 0;
  }
}

.area-modal_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

$__ant-checkbox: 'ant-checkbox';

.#{$__ant-checkbox}-wrapper:hover .#{$__ant-checkbox}-inner,
  .#{$__ant-checkbox}:hover .#{$__ant-checkbox}-inner,
  .#{$__ant-checkbox}-input:focus + .#{$__ant-checkbox}-inner {
    border-color: #d9d9d9;
  }
</style>
