<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <div class="font-content">默认颜色</div>
        <el-menu
          :default-active="$store.state.activeNum3"
          :router = 'isture'
          @open="handleOpen"
          @close="handleClose"
          @select="selectData"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>导航变一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2" style="padding: 0px;">
            <i class="el-icon-s-order"></i>
            <span slot="title">数据列表</span>
          </el-menu-item>
          <el-menu-item index="3" disabled style="padding: 0px">
            <i class="el-icon-picture-outline-round"></i>
            <span slot="title">导航禁止</span>
          </el-menu-item>
          <el-menu-item index="4" style="padding: 0px">
            <i class="el-icon-video-camera"></i>
            <span slot="title">按钮图标</span>
          </el-menu-item>
          <el-menu-item index="5" style="padding: 0px">
            <i class="el-icon-bell"></i>
            <span slot="title">消息弹框</span>
          </el-menu-item>
          <el-menu-item index="6" style="padding: 0px">
            <i class="el-icon-loading"></i>
            <span slot="title">对话弹框</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    data(){
      return {
        isture:false
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      selectData(key){
        console.log(this.$router.getRoutes());
        console.log('获取的值'+this.$store.state.tabsNum);
        this.$store.dispatch('_this',this.$router.getRoutes());
        this.$store.dispatch('componentChange',key)
        localStorage.setItem('activeNum3',key)
        this.reload()
        //this.$forceUpdate();//强制刷
      }
    },
    watch:{
      '$route':'selectData'
    },
    mounted() {
      console.log(this.$store.state.activeNum3)
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .font-content{
    height: 80px;
    line-height: 80px;
  }
</style>
