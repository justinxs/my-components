<template>
  <div class="container">
    <my-row>
      <my-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </my-col>
    </my-row>
    <my-row>
      <my-col :span="12">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
    </my-row>
    <my-row>
      <my-col :span="8">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
      <my-col :span="8">
        <div class="grid-content bg-purple"></div>
      </my-col>
    </my-row>
    <my-row>
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
    </my-row>
    <my-row>
      <my-col :span="4">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
      <my-col :span="4">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
      <my-col :span="4">
        <div class="grid-content bg-purple"></div>
      </my-col>
      <my-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </my-col>
    </my-row>


    <router-link to="/otherTab">跳 转</router-link>

    <div class="tx-area" style="padding: 100px 100px;">
      <textarea maxlength="300" style="width: 300px; height: 120px;resize: none;"></textarea>
    </div>

    <t-checkbox v-model="checkedAll" @change="isCheckedAll">全选</t-checkbox>
    <t-checkbox-group v-model="checked" :max="3" :min="1" @change="checkedChange" @is-limit="handleLimit('fruits')">
      <t-checkbox v-for="(item, index) in list" :label="item" :key="index">{{item}}</t-checkbox>
    </t-checkbox-group>
    
  </div>
</template>


<script>

import TCheckbox from './checkbox/t-checkbox'
import TCheckboxGroup from './checkbox/t-checkboxGroup'
export default {
  data() {
    return {
      checkedAll: false,
      checked: ['苹果', '香蕉'],
      list: ['苹果', '香蕉', '芒果', '西瓜'],
      ctrols: [false, true, true, false],
      fruits: false,
    }
  },
  methods: {
    isCheckedAll(val) {
      this.checked = val ? this.list : [];
    },
    checkedChange(val) {
      this.checkedAll = this.list.length === val.length;
    },
    handleLimit(id) {
      console.log('fruits', this[id]);
    }
  },
  created() {
    console.log(this.$parent);
    console.log(this.$parent.$options);
    console.log(this.$parent.$options.name);
  },
  components: {
    // 'el-row': Row,
    // 'el-col': Col
    't-checkbox': TCheckbox,
    't-checkbox-group': TCheckboxGroup,
  },
  watch: {
    myCheckbox(newVal) {
      console.log(newVal, '响应子组件的emit input');
    },
    erro(newVal) {
      console.log('islimit', newVal);
    }
  }
}
</script>


<style lang="scss" scoped>
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