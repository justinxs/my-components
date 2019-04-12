<template>
    <div>
        <base-layout>
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
 