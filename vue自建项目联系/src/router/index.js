import Vue from 'vue';
import VueRouter  from 'vue-router'
import Login from '../views/Login'
import ErrPage from '../views/404page'
import Home  from '../views/Home'
import nav from '../views/nav/index'
import Head from '../views/head/index'
import Main from '../views/main/index'
import Foot from '../views/footer/foot'
import car from '../views/main/Cars'
import news from '../views/main/News'
import shop from '../views/main/shop'
import house from '../views/main/house'
import messageBox from '../views/main/MessageBox'
import dioLog from "../views/main/dioLog";
import user from '../views/nav/user'
import config from '../views/nav/config'
import player from '../views/nav/player'
Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:'/Login',
      component:Login
    },
    {
      path:'/404page',
      component: ErrPage
    },
    {
      path:'/home',
      component:Home,
      children:[
        {path:'allMain',components:{
            nav,
            Head,
            Main,
            Foot
          }
        },
        {
          path:'user',components:{
            nav:user,
            Head,
            Foot,
            Main:house
          }
        },
        {
          path:'config',components:{
            nav:config,
            Head,
            Foot,
            Main:news
          }
        },
        {
          path:'player',components:{
            nav:player,
            Head,
            Foot,
            Main:shop
          }
        }
      ]
      },
    {//获取所有main所有的组件
      path:'/allMain',
      children:[
        {path:'father',components:{nav,car,shop,house,messageBox,dioLog}},
        {path:'son',components: {shop,car,news,house}},
        {path:'grandson',components: {ErrPage,Login}}
      ]
    },
    {//获取用户管理所有的组件
      path:'/user',
      children:[
        {path:'father',components:{news,car,shop,house,messageBox,dioLog}},
        {path:'son',components: {shop,car,news,house}},
        {path:'grandson',components: {ErrPage,Login}}
      ]
    },
    {//获取配置管理所有的组件
      path:'/config',
      children:[
        {path:'father',components:{news,car,shop,house,messageBox,dioLog}},
        {path:'son',components: {shop,car,news,house}},
        {path:'grandson',components: {ErrPage,Login}}
      ]
    },
    {//获取角色所有的组件
      path:'/player',
      children:[
        {path:'father',components:{news,car,shop,house,messageBox,dioLog}},
        {path:'son',components: {shop,car,news,house}},
        {path:'grandson',components: {ErrPage,Login}}
      ]
    },
    {
      path:'*',
      redirect:'/Login'
    }
  ]
})
