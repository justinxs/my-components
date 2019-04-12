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
        console.log(this.$slots);
        console.log(this.$parent.$options.name);
    }
};
</script>

<style lang="scss" scoped>
</style>