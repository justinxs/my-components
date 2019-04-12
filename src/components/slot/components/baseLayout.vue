<template>
    <div class="container">
        <header>
            <slot></slot>
        </header>
        <main>
            <slot name="main"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
        //  this.$slot 获取在父组件中所有节点 <base-layout>[ this.$slot ]</base-layout>
        console.log(this.$slots);
        //  this.$parent 获取父组件
        console.log(this.$parent.$options.name);
    }
};
</script>

<style lang="scss" scoped>

</style>