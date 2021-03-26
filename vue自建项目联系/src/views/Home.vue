<template>
   <div>
     <el-container  style="height: 600px; border: 1px solid #eee">
       <!--导航-->
       <el-aside width="220px" style="background-color: rgb(238, 241, 246)"  v-show="showSideNav">
         <router-view name="nav"/>
       </el-aside>

       <el-container>
         <!--头部-->
         <el-header style="height:80px; font-size: 12px;border: 0px solid;">
           <router-view name="Head"/>
         </el-header>

         <!--内容-->
         <el-main>
           <router-view name="Main" v-if="isRouterAlive"/>
         </el-main>
         <el-footer style="background-color: rgb(238, 241, 246)">
           <router-view name="Foot"/>
         </el-footer>
       </el-container>
       <!--尾部-->
     </el-container>
   </div>
</template>

<script>
   import { mapState } from 'vuex';
   const mapStates = mapState(['showSideNav']);
    export default {
      computed:{
        ...mapStates
      },
      provide (){
        return {
          reload:this.reload
        }
      },
      data(){
        return {
          isRouterAlive:true
        }
      },
      methods:{
        reload (){
          this.isRouterAlive = false;
          this.$nextTick(function(){
            this.isRouterAlive = true
          })
        }
      },
      mounted() {
        console.log(this)
      }
    }
</script>

<style scoped>

</style>
