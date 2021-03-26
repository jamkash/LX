<template>
    <div>
      <div class="upload">
        <el-button size="small" type="primary" @click="Upload">上传</el-button>
        <el-button size="small" type="danger" @click="deleteFile">删除</el-button>
         <el-upload
           action="https://jsonplaceholder.typicode.com/posts/"
           list-type="picture"
           :auto-upload="isAutoUpload"
           ref="upload"
           :on-progress="handprogress"
           :on-error="uploadFileErr"
           :on-success="uploadSuccess"
           :on-exceed="limitCount"
           :limit="2"
         >
           <el-button size="small" type="primary">预览</el-button>
         </el-upload>
      </div>
      <div>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="handlePictureCardPreview">
          <img v-if="imageUrl" :src="imageUrl">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
</template>

<script>
    export default {
       data(){
         return {
           isAutoUpload:false,
           imageUrl:''
         }
       },
      methods:{
         Upload(){
          this.$refs.upload.submit();
         },
         deleteFile(){
          this.$refs.upload.clearFiles()
        }
        ,
        handprogress(e,file,fileList){
          console.log('正在上传')
          console.log(e,file,fileList)
        },
        uploadFileErr(err,file,fileList){
          console.log('上传失败')
           console.log(err)
        },
        uploadSuccess(response,file,fileList){
          console.log('上传成功')
           console.log(response)
        },
        limitCount(flies,fileList){
           this.$message({
             type:'warning',
             message:'已超出上传个数'
           })
          console.log('已超出上传个数')
          console.log(flies,fileList)
        },
        handlePictureCardPreview(res,file){
           //this.imageUrl = 'C:\\web\\test\\demo\\images\\face\\1540813927060.jpg'
           console.log(res,file)
        }
      }
    }
</script>

<style scoped>

</style>
