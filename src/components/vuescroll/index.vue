<template>
  <div id="parent">
    <!-- bind your own options in data -->
    <vue-scroll @handle-scroll="handleScroll" @handle-scroll-complete="handleComplete" :ops="ops">
      <div class="content" v-for="item in 11" :key="item">
        <span>{{item}}</span>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
import vuescroll from 'vuescroll/dist/vuescroll-native';
import Vue from 'vue';
Vue.use(vuescroll);
export default {
  data() {
    return {
        ops: {
        //   vuescroll: {},
        //   scrollPanel: {},
        //   rail: {},
        //   bar: {},
        //   scroller: {
        //     //   disabled: true
        //   }
        },
      itemArray: []
    };
  },
  created() {
    this.itemArray = Array.apply(null, { length: 1 }).map((item, index) => {
      return index;
    });
  },
  computed: {
    //   vuescroll
  },
  methods: {
    add(flag) {
      if (flag) {
        this.itemArray.push(this.itemArray.length);
      } else {
        this.itemArray.splice(0, 1);
      }
    },
    handleComplete() {
      console.log("scr8888oll complete!");
    },
    handleScroll(vertical, horizontal, nativeEvent) {
        console.log('scrolling');
        // console.log(vertical, horizontal, nativeEvent);
    }
  }
};
</script>
<style lang="scss" scoped>
    #operateArea {
        margin-left: 10px;;
        float: left;
    }
    #parent {
        width: 200px;
        height: 300px;
        float: left;
    }
    .content {   
        width: 450px;
        height: 50px;
        margin: 10px 0;
        transition:all 2s;
        background-color: #cecece;
    }
    .group-animate-enter {
        transform: translateX(-100px)
    }
    .group-animate-leave-to {
        transform: translateX(100px)
    }
</style>