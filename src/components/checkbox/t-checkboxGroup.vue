<template>
    <div class="el-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'checkboxGroup',
    componentName: 'checkboxGroup',
    data() {
        return {

        }
    },
    props: {
        value: {},
        disabled: Boolean,
        min: Number,
        max: Number,
        
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
}
</script>
