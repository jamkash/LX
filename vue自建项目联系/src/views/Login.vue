<template>
  <div class="box" ref="box">
   <!--   头部-->
    <div class="head-box" ref="headBox">
      <div class="head" ref="Head">
        <div class="left-Postion"><img src="../assets/images/logo.png" alt=""></div>
        <div class="right-Postion">
          <span class="iconsetting"></span><span class="iconminus"></span><span class="iconclose"></span>
        </div>
      </div>
    </div>

    <!--   中间-->
    <div class="middle-dispaly" ref="middleDisplay">
      <el-form :model="userInfo" :rules="userRules" ref="userInfo">
        <div class="circle-img"></div>
        <el-form-item prop="username">
          <el-input class="el-user"  placeholder="请输入账号" ref="user" v-model="userInfo.username" clearable @focus="showUser" @blur="outUser">
            <span class="iconuser" slot="prefix" ref="showUser"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="el-password" placeholder="请输入密码" show-password v-model="userInfo.password" @focus="showPass" @blur="outPass">
            <span class="iconyinsibaohu" slot="prefix" ref="showPass"></span>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="effcts">
        <template>
          <!-- `checked` 为 true 或 false 3个功能-->
          <el-checkbox v-model="checked" class="checke1" size="">自动登录</el-checkbox>
          <el-checkbox v-model="checked1"class="checke2">记住密码</el-checkbox>
          <el-checkbox v-model="checked2"class="checke3">找回密码</el-checkbox>
        </template>
      </div>
      <div class="btn-box">
        <el-row>
          <el-button type="primary" class="btn" @click.native.prevent="submitForm" :loading="loading">登录</el-button>
        </el-row>
      </div>
    </div>

    <!--   尾部-->
    <div class="foot" ref="foot">
      <div class="register">注册账号</div>
      <div class="QR"><span class="iconerweima"></span></div>
    </div>
  </div>

</template>

<script>
  import * as validate from '../validate/index';
    export default {
        data(){
          return {
             checked:false,
             checked1:false,
             checked2:false,
             loading:false,
             userInfo:{
               username:'',
               password:''
             },
            userRules:{
              username:
                [
                  {required:true,message:'账号不能为空',trigger:'blur'},
                  {validator:validate.isInteger}
                ],
              password:
                [
                  {required:true,message:'密码不能为空',trigger:'blur'},
                  {validator:validate.validatePassword}
              ]
            }
          }
        },
      methods:{
          showUser(){
            this.$refs.showUser.style.color = '#a6e6f9';
          },
          outUser(){
            this.$refs.showUser.style.color = '';
          }
          ,
          showPass(){
            this.$refs.showPass.style.color = '#a6e6f9';
          },
          outPass(){
            this.$refs.showPass.style.color = '';
          },
          submitForm(){
            this.$refs.userInfo.validate((valid)=>{
               if(valid){
                  //发送请求，获取是否存在用户
                 this.loading = true;
                 console.log(this.$refs.userInfo.model.username,this.$refs.userInfo.model.password)
                 // this.$refs.headBox.style.height = '340px'
                 // this.$refs.middleDisplay.style.display = 'none'
                 // this.$refs.effcts.style.display = 'none'
                 // this.$refs.foot.style.display = 'none'
                 // this.$refs.Head.style.display = 'none'
                 this.$router.push({path:'/home/allMain'})
               }else {
                 this.$message({
                   message:'密码和账号错误！',
                   type:'error'
                 })
               }
            })
          }
      }
    }
</script>


<style lang="css" scoped>
   *{
     padding: 0;
     margin: 0
   }
   .box{
     width: 370px;
     border: 0px solid #eaeaea;
     box-shadow: 0 0 25px #cac6c6;
     margin: auto;
   }
   .el-user /deep/ input,.el-password /deep/ input{
     outline: none;
     border-top:none ;
     border-left: none;
     border-right: none;
   }
   .el-user,.el-password{
     margin-top: 20px;
   }
   .middle-dispaly{
     width: 200px;
     margin: auto;
     transform: translateY(-40px);
   }
  .head-box{
    width: 100%;
    height: 130px;
    background: url("../assets/images/bag.png") no-repeat;
  }
  .head,.right-Postion,.foot{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
   .right-Postion{
     width: 100px;
   }
   .right-Postion>span{
     line-height: 34px;
     text-align: center;
     width: 40px;
   }
   .right-Postion>span:hover{
     background: #f64141;
   }
   .left-Postion{
     width: 30px;
   }
   .left-Postion>img{
    width: 100%;
   }
   .circle-img{
     width: 80px;
     height: 80px;
     border: 1px solid;
     border-radius:50%;
     background: url("../assets/images/logo.png") no-repeat;
     margin: auto;
   }
   .effcts{
     display: flex;
     justify-content: center;
     align-items: center;
     line-height: 40px;
   }
  .btn{
    width: 100%;
    padding: 10px;
    margin-top: 20px;
  }
  .register{
    width: 80px;
    color: #bdb7b7;
    text-align: center;
    font-size: 14px;
  }
  .QR{
    width: 50px;
  }
  .QR>span{
    text-align: center;
    color: #bdb7b7;
  }
  .foot{
    transform: translateY(-20px);
  }
   .QR>span:hover,.register:hover{
     color: black;
   }
</style>
