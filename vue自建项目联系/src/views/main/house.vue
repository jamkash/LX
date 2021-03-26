<template>
    <div>
       <div class="btn">
         <h1>按钮</h1>
         <el-row>
           <span>基本案例：</span>
           <el-button type="primary">点击</el-button>
           <el-button type="info">点击</el-button>
           <el-button type="success">点击</el-button>
           <el-button type="warning">点击</el-button>
         </el-row>
         <el-row>
           <span>形态案例：</span>
           <el-button plain type="primary">朴树</el-button>
           <el-button circle type="success">圆</el-button>
           <el-button round type="info">圆弧</el-button>
         </el-row>
         <el-row>
           <span>图标案例：</span>
           <el-button type="primary" icon="el-icon-edit"></el-button>
           <el-button :loading="true" type="primary">登录</el-button>
           <el-button type="success" icon="el-icon-check" circle></el-button>
           <el-button type="info" icon="el-icon-message" circle></el-button>
           <el-button type="warning" icon="el-icon-star-off" circle></el-button>
           <el-button type="danger" icon="el-icon-delete" circle></el-button>
         </el-row>
       </div>
      <!--文字链接-->
      <div class="Text">
           <h1>文字链接</h1>
           <div>
             <span>所有案例：</span>
             <el-link :underline="false">无下划线</el-link>
             <el-link icon="el-icon-edit">编辑</el-link>
             <el-link disabled>默认链接</el-link>
             <el-link type="primary" href="#">主要链接</el-link>
             <el-link type="success">成功链接</el-link>
           </div>
      </div>
      <!--单选框-->
      <div class="Radio">
           <h1>单选框</h1>
           <div>
             <span>简单单选：</span>
             <template>
               <!--用双向绑定才能选择，label就是绑定的值-->
                <el-radio v-model="radio" label="1">备选一</el-radio>
                <el-radio v-model="radio" label="2">备选二</el-radio>
                <el-radio v-model="radio" label="3" disabled>禁用</el-radio>
                <el-radio v-model="radio" label="4" disabled>选中且禁用</el-radio>
             </template>
           </div>
           <div>
               <span>一组单选：</span>
               <el-radio-group size="small" v-model="radiog">
                 <el-radio-button label="上海"></el-radio-button>
                 <el-radio-button disabled label="北京"></el-radio-button>
                 <el-radio-button label="杭州"></el-radio-button>
               </el-radio-group>
           </div>
           <div>
              <template>
                <div>
                  <span>边框单选：</span>
                  <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
                  <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
                </div>
              </template>
           </div>
      </div>
      <!--多选框-->
      <div class="Checked">
        <h1>多选框</h1>
         <div>
            <template>
              <span>多选案例：</span>
               <el-checkbox-group v-model="checkList">
                 <el-checkbox label="地铁"></el-checkbox>
                 <el-checkbox label="小区"></el-checkbox>
                 <el-checkbox label="高铁"></el-checkbox>
                 <el-checkbox label="禁用" disabled></el-checkbox>
                 <el-checkbox label="禁用且选中" disabled></el-checkbox>
               </el-checkbox-group>
            </template>
         </div>
        <div>
            <template>
              <span>全选案例：</span>
              <el-checkbox :indeterminate="isIndeterminate" label="全选" @change="checkAll" v-model="ischeckAll"></el-checkbox>
              <el-checkbox-group v-model="newarr" @change="checkItem">
                <el-checkbox v-for="(item,index) in arr" :key="index" :label="item"></el-checkbox>
              </el-checkbox-group>
            </template>
        </div>
        <div>
            <template>
              <span>个数限制：</span>
               <el-checkbox-group :max="2" :min="1" v-model="maxArr">
                  <el-checkbox v-for="(item,index) in arr" :key="index" :label="item"></el-checkbox>
               </el-checkbox-group>
            </template>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
         data(){
           return {
             radio:'4',
             radiog:'上海',
             radio1:'1',
             checkList:['小区','禁用且选中'],
             isIndeterminate:false,
             arr:['汉中','美国','英国'],
             newarr:[],
             ischeckAll:false,
             maxArr:['汉中']
           }
         },
      methods:{
           checkAll(){
             !this.ischeckAll;
             if(this.ischeckAll){
                this.newarr = this.arr;
             }else {
                this.newarr = []
             }
             this.isIndeterminate = false;
           },
           checkItem(){
             this.newarr.length < 3&& this.newarr.length!= 0 ? this.isIndeterminate = true : this.isIndeterminate = false
             if(this.newarr.length == 3){
                this.ischeckAll = true
             }else {
               this.ischeckAll = false
             }
           }
      }
    }
</script>

<style scoped>
    .Text,.Radio,.Checked{
      margin-top: 30px;
    }
    .btn>div,.Text>div,.Radio>div,.Checked>div
    {
      display: flex;
      align-items: flex-start;
      margin-top: 20px;
    }
    .Text>div a{
      padding-left: 20px;
    }
</style>
