<template>
     <div>
        <template>
           <el-button type="primary" @click="message">message打开</el-button>
           <el-button type="primary" @click="message1">message手动关闭</el-button>
           <el-button type="primary" @click="open">alert打开</el-button>
           <el-button type="primary" @click="open1">confirm打开</el-button>
           <el-button type="text" @click="open2">prompt打开</el-button>
        </template>
     </div>
</template>

<script>
    export default {
       methods:{
         message(){
           this.$message({
             type:'success',  //info,warning,error
             message:"message成功打开"
           })
         },
         message1(){
           this.$message({
             showClose:true,
             type:'error',  //info,warning,error
             message:"message手动关闭"
           })
         },
         open(){
           this.$alert('这是一段内容','标题',{
             confirmButtonText:'确定',
             callback:(a)=>{
               this.$message({
                 message:`他是${a}`
               })
             }
           })
         },
         open1(){
            this.$confirm('这是confirm打印的内容','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning',
               beforeClose(action,instance,done){
                  if(action == 'confirm'){
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = '执行中...'
                    setTimeout(()=>{
                      instance.confirmButtonLoading = false
                      done()
                    },300)
                  }else{
                      done()
                  }
               }
            }).then(res=>{
               this.$message({
                 type:'success',
                 message:'确定成功'
               })
            }).catch(err=>{
                 this.$message({
                   type:'success',
                   message:'取消成功'
                 })
            })
         },
         open2(){
            this.$prompt('请输入邮箱','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              inputErrorMessage:'格式不正确'
            }).then((val)=>{
               this.$message({
                 type:'success',
                 message:`你的邮箱是${val.value}`
               })
            }).catch(err=>{
                 this.$message({
                   type:'info',
                   message:'你取消了操作'
                 })
            })
         }
       }
    }
</script>

<style scoped>

</style>
