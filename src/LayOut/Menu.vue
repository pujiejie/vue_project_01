<template>
    <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/lesson">
            <i class="el-icon-document"></i>
            <span slot="title">课程管理</span>
        </el-menu-item>
    </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu {
    height: 100%;
}
</style>

<script>
export default {
    data() {
        return {
            isCollapse: false
        };
    }
}
</script>