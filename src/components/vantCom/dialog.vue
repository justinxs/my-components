<template>
    <div>
        <button @click="showDialog">打开弹窗</button>
    </div>
</template>
<script>
import { Dialog } from 'vant';

export default {
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        showDialog() {
            Dialog({
                message: '提示'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>