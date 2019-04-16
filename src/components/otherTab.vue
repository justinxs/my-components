<template>
  <div class="container">
    <my-row :gutter="20">
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
    </my-row>
    <my-checkbox
      :indeterminate="isIndeterminate"
      :value="checkAll"
      @input="checkAll = $event"
      @change="handleCheckAllChange"
    >全选</my-checkbox>
    <div style="margin: 15px 0;"></div>
    <my-checkbox-group :value="checkedCities" @input="handleInput" :max="2" @change="handleCheckedCitiesChange">
      <my-checkbox v-for="city in cities" :label="city" :key="city" @change="handleCheckboxChange">{{city}}</my-checkbox>
    </my-checkbox-group>

    <my-checkbox v-for="v in arr" :label="v" :key="v" >{{v}}</my-checkbox>


     <el-checkbox-group 
    v-model="checkedCities1"
      >
    <el-checkbox v-for="city in cities" :label="city" :key="city" true-label="yes" false-label="no" @change="itemChange">{{city}}</el-checkbox>
  </el-checkbox-group>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
const cityOptions1 = ["上海", "北京", "广州", "深圳"];
import MyCheckboxGroup from "./checkbox/checkboxGroup";
import MyCheckbox from "./checkbox/checkbox";

import {Checkbox,CheckboxGroup} from "element-ui";
import Vue from 'vue';
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
export default {
  data() {
    return {
      arr: ['a', 'b', 'c', 'd'],
      checkAll: false,
      checkedCities: ["上海", "北京"],
      checkedCities1: ["上海", "北京"],
      cities: cityOptions,
      cities1: cityOptions1,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {

      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log('触发groupchange', value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckboxChange(val, e) {
      // console.log('checkbox自身change事件触发', val, e);
    },
    handleInput(val) {
      console.log('触发group的input', val);
      this.checkedCities = val;
      console.log('获取子组件group的value', this.$children, this.$children.filter(v => v.$options.componentName === 'MyCheckboxGroup')[0].value);
    },

    itemChange(v) {
      console.log('itemChange', v);
    }
  },
  created() {
    console.log("loading");
  },
  components: {
    "my-checkbox-group": MyCheckboxGroup,
    MyCheckbox
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 100px auto 0;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

