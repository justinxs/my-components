<template>
  <div>
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
  </div>
</template>


<script>

export default {
  data() {
    return {

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