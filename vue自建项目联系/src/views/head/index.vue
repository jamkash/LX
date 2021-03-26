<template>
    <div>
      <div class="header">
        <div>
          <span class="el-icon-s-fold leftIcon" @click="showScreenAll" v-show="isback"></span>
          <span class="el-icon-s-unfold leftIcon" @click="showScreenAll" v-show="!isback"></span>
        </div>
        <div>
          <span class="el-icon-s-home"></span>
          <el-dropdown   @command="goOut">
          <span class="el-icon-s-custom person">个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item icon="" command="a">设置</el-dropdown-item>
              <el-dropdown-item icon="" command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="tabs">
        <template>
          <el-tabs v-model="$store.state.tabsNum" @tab-click="handleClick" >
            <el-tab-pane label="用户管理" name="" ></el-tab-pane>
            <el-tab-pane label="配置管理" name=""></el-tab-pane>
            <el-tab-pane label="角色管理" name=""></el-tab-pane>
            <el-tab-pane label="定时任务补偿" name=""></el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div>
        <el-dialog
        title="设置的标题"
        width="40%"
        :visible.sync="dioLogShow"
        :close-on-click-modal="false"
        :before-close="closeDialog"
        >
          <div>这是内容</div>
          <span slot="footer">
            <el-button @click="dioLogShow = false">取消</el-button>
            <el-button type="primary" @click="dioLogShow = false">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          isback:true,
          dioLogShow:false
        };
      },
      methods: {
        handleClick(tab, event) {
          this.$store.commit('changeTabNum',tab.index);
          localStorage.setItem("key", tab.index);
          this.$store.state.activeNum = localStorage.getItem('activeNum');
          this.$store.state.activeNum1 = localStorage.getItem('activeNum1');
          this.$store.state.activeNum2 = localStorage.getItem('activeNum2');
          this.$store.state.activeNum3 = localStorage.getItem('activeNum3');
          switch (Number(tab.index)) {
              case 0:
                this.$router.push('/home/allMain');
                break;
              case 1:
                this.$router.push('/home/user');
                break;
              case 2:
                this.$router.push('/home/config');
                break;
              case 3:
                this.$router.push('/home/player');
                break;
          }
          console.log(tab,event)
        },
        showScreenAll(){ //左图标
          if(this.isback){
            this.$store.commit('showSideNav');
            this.isback = false
          }else {
            this.$store.commit('showSideNav');
            this.isback = true
          }
        },
        goOut(val){
          if(val == 'b'){
            this.$confirm('确定退出？','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning',
               closeOnClickModal:false
            }).then(res=>{
              this.$router.push('/Login')
            }).catch(err=>{})
           }else {
               this.dioLogShow = true
          }
        },
        closeDialog(done){
          done(true)
        }
      },
      mounted() {

          this.$store.state.tabsNum = localStorage.getItem('key');
        window.onload =  ()=>{//浏览器刷新，只有浏览器刷新有效
          localStorage.removeItem('activeNum')
          localStorage.removeItem('activeNum1')
          localStorage.removeItem('activeNum2')
          localStorage.removeItem('activeNum3')
         // this.$store.state.activeNum2 = '1'
        };
        console.log(this.active,this.$store.state.tabsNum)
      }
    }
</script>

<style scoped>
   .header{
     display: flex;
     justify-content: space-between;
   }
   .person,.leftIcon{
     cursor: pointer;
     font-size: 13px;
     display: flex;
     justify-items: center;
     align-items: center;
     line-height: 40px;
   }
   .leftIcon{
     font-size: 20px;
   }

</style>
