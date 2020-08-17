import Vue from 'vue'
import { Avatar, Dropdown, Menu, Button, Switch, Input, Alert, Skeleton, message } from 'ant-design-vue'

Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Alert)
Vue.use(Skeleton)

Vue.prototype.$message = message
