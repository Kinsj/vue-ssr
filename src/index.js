import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/bg.jpg'

// 创建root节点并添加到body下
const root = document.createElement('div')
document.body.appendChild(root)


new Vue({
    render: (h) => h(App)
}).$mount(root) // 把vue实例挂载到root节点上