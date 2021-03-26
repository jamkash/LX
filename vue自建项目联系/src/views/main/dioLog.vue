<template>
   <div class="box">
     <div class="dialog">
       <div>
         <el-button @click="ishow = true">显示对话框</el-button>
         <el-dialog
           title="购货内容"
           width="30%"
           :visible.sync="ishow"
           :before-close="handClose"
           :close-on-click-modal="isclose"
           style="text-align:initial"
         >
           <div>这里就是内容</div>
           <span slot="footer">
       <el-button @click="ishow = false">取消</el-button>
       <el-button type="primary" @click="submitDioLog">确定</el-button>
     </span>
         </el-dialog>
       </div>
     </div>
     <!--tooltip-->
     <div class="tooltip">
        <el-tooltip content="文字提示" placement="top">
          <el-button type="primary">文字提示</el-button>
        </el-tooltip>
       <el-tooltip  placement="top">
         <div slot="content">slot形式</div>
         <el-button>slot形式提示</el-button>
       </el-tooltip>
     </div>
     <!--backtop-->
     <div class="dropdown">
        <el-dropdown>
          <span>
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
     </div>
     <div class="pageHeader">
       <el-page-header  content="详情页面" @back="goBack">
       </el-page-header>
     </div>
     <div class="progress">
       <el-progress type="circle" :percentage="0"></el-progress>
       <el-progress type="circle" :percentage="25"></el-progress>
       <el-progress type="circle" :percentage="100" status="success"></el-progress>
       <el-progress type="circle" :percentage="70" status="warning"></el-progress>
       <el-progress type="circle" :percentage="50" status="exception"></el-progress>
       <el-progress type="dashboard" :percentage="20"></el-progress>
     </div>
   </div>

</template>

<script>
    export default {
        data(){
          return {
            ishow:false,
            isclose:false
          }
        },
      methods:{
          handClose(done){
              done(true)
          },
          submitDioLog(){
            this.$confirm('确定提交内容？','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               closeOnClickModal:false  //关闭遮罩触发事件
            }).then(res=>{
               this.ishow = false
            }).catch(err=>{

            })
          },
          goBack(){
            console.log('触发返回事件')
          }
      }
    }
</script>

<style scoped>
  .box{
    height: 700px;
  }
  .tooltip,.dialog,.dropdown,.pageHeader,.progress{
   text-align: initial;
    margin-top: 20px;
  }
</style>
