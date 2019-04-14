<template>
    <label class="el-checkbox">
        <span class="el-checkbox__input">
            <span class="el-checkbox__inner"></span>
            <input type="checkbox" v-model="model" >
        </span>
        <span class="el-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
export default {
    data() {
        return {
            model: []
        }
    },
}
</script>

<style lang="scss" scoped>

</style>