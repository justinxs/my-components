<template>
  <div class="container" v-loading="false" v-test="true" :element-loading-text="'loading'">
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
      <textarea maxlength="300" v-model="dataArr[0]" @change="textareaChange" style="width: 300px; height: 120px;resize: none;"></textarea>
    </div>

    <t-checkbox v-model="checkedAll" @change="isCheckedAll">全选</t-checkbox>
    <t-checkbox-group v-model="checked" :max="3" :min="1" @change="checkedChange" @is-limit="handleLimit('fruits')">
      <t-checkbox v-for="(item, index) in list" :label="item" :key="index">{{item}}</t-checkbox>
    </t-checkbox-group>
    
    <t-scroll></t-scroll>



    <div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-show="show">hello</p>
  </transition>


  <div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>


</div>
</div>
  </div>
</template>


<script>

import TCheckbox from './checkbox/t-checkbox'
import TCheckboxGroup from './checkbox/t-checkboxGroup'
import tScroll from './vuescroll/index'

import Loading from 'element-ui'
import Vue from 'vue'
Vue.use(Loading)

import UAParser from 'ua-parser-js'
export default {
  data() {
    return {
      checkedAll: false,
      checked: ['苹果', '香蕉'],
      list: ['苹果', '香蕉', '芒果', '西瓜'],
      ctrols: [false, true, true, false],
      fruits: false,
      show: false,
      items: [1,2],
    nextNum: 10,
    dataArr: [1]
    }
  },
  directives: {
      test: {
          bind(el, binding, vnode) {
              const vm = vnode.context;
              vm.handleLimit('list')
              const textExr = el.getAttribute('element-loading-text');
              console.log(textExr);

          }
      }
  },
  methods: {
      textareaChange() {
          console.log(this.dataArr);
      },
    isCheckedAll(val) {
      this.checked = val ? this.list : [];
    },
    checkedChange(val) {
      this.checkedAll = this.list.length === val.length;
    },
    handleLimit(id) {
      console.log('fruits', this[id]);
    },

    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
    //   this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
      this.items.push(this.nextNum++)
    },


  },
  created() {
    console.log(this.$parent);
    console.log(this.$parent.$options);
    console.log(this.$parent.$options.name);

    console.log(UAParser(navigator.userAgent), 'ua');
  },
  components: {
    // 'el-row': Row,
    // 'el-col': Col
    't-checkbox': TCheckbox,
    't-checkbox-group': TCheckboxGroup,
    't-scroll': tScroll,
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


/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active {
    transition: all 1s 1s;
}
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>