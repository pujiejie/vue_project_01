<template>
  <div id="app">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item of breadCrumb" :key="item.path" :to="item.path">{{ item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadCrumb: []
    }
  },
  watch: {
    $route(newValue) {
      this.breadCrumb = this.filterBreadCrumb(newValue.matched);
    }
  },
  methods: {
    filterBreadCrumb(arr) {
      const filterArr = arr.filter(item => {
        if (item.meta.title) return item;
      })
      if (filterArr[0].meta.title != '首页') {
        filterArr.unshift({
          path: '/',
          meta: {
            title: "首页"
          }
        })
      }
      return filterArr;
    }
  }
}
</script>

<style>
#app,
body,
html {
  height: 100%;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
