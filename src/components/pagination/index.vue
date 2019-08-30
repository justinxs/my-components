<template>
    <div class="pagination-content">
        <span class="page-btn"  @click="handlePage(1)">首页</span>
        <main style="display: inline-block;float: left;">
            <el-pagination
                :background="background"
                layout="pager, next"
                :current-page.sync='curPage'
                :page-size="10"
                :total="80">
            </el-pagination>
        </main>
        
        <span class="page-btn" @click="handlePage(12)">尾页</span>
    </div>
</template>
<script>
import {Pagination, Button} from 'element-ui';

export default {
    data() {
        return {
            background: true,
            curPage: 1,
        }
    },
    components: {
        elPagination: Pagination,
        ElButton: Button
    },
    created() {
    },
    computed: {
    },
    methods: {
        handlePage(num) {
            console.log(this.curPage);
            // this.curPage = num
        }

    }
}
</script>
<style lang="scss" scoped>
    .pagination-content {
        margin-top: 100px;
        overflow: hidden;
    }
    .page-btn {
        float: left;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        width: 40px;
        text-align: center;
        cursor: pointer;
        background-color: #f4f4f5;
        box-sizing: border-box;
        vertical-align: middle;
        &:hover {
            background-color: skyblue;
            border-color: skyblue;
            color: #fff;

        }
    }
</style>