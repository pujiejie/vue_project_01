import router from './index'
import store from "@/store"

// 导航守卫 保安 前置守卫
router.beforeEach(async (to, from, next) => {
    // 验证
    // 第一步 验证VueX中有没有Token
    // 没有Token 去本次存储检查有没有Token
    // 本地存储没有Token 别翻墙了 去登录把

    // 去读取Token
    let token = undefined;
    if (store.state.token) {
        token = store.state.token;
    } else {
        token = localStorage.getItem('i');
        store.commit('saveToken', token);
    }

    if (!token) {
        if (to.path == '/login') {
            next();
        } else {
            next('/login');
        }
    } else {
        // 优化 如果VueX中有个人信息了 就不去验证了 直接过
        if (!store.state.userProfile.username) {
            // 如果有Token 去验证Token是不是真货
            try {
                const response = await store.dispatch('getUserProfile');
                // Token是真的 直接放你走
                if (to.path == '/login') {
                    next('/')
                } else {
                    next();
                }
            } catch (err) {
                localStorage.removeItem('i');
                store.commit('saveToken', '');
                if (to.path == '/login') {
                    next()
                } else {
                    next('/login');
                }
            }
        } else {
            if (to.path == '/login') {
                next('/');
            } else {
                next();
            }
        }
    }
})

export default router