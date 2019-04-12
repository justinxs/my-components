<template>
  <div>
    <base-layout>
      <!-- 
        子组件中base-layout this.$slot的所有VNode节点，包括text和自定义组件节点
        不具名的节点收集在 this.$slot.default数组中，具名节点收集到 this.$slot.nodeName中
      -->
      <h1>网页头部</h1>
      <h2>网页头部</h2>
      <h3>网页头部</h3>
      <template v-slot:main>网页内容</template>
      <template v-slot:footer>网页尾部</template>
    </base-layout>
    <slot></slot>
  </div>
</template>

<script>
import baseLayout from "./components/baseLayout";

console.log(baseLayout, 'baseLayout组件');
export default {
  name: "Myslot",
  data() {
    return {};
  },
  components: {
    "base-layout": baseLayout
  },
  created() {
    console.log(this.$slots);
  }
};
</script>

 <style lang="scss" scoped>
</style>
 