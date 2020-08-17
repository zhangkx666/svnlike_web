import Vue from 'vue'
import { Input, Button, Dropdown, DropdownMenu, DropdownItem, Row, Col, Image, Loading } from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Image)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
