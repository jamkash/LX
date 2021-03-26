<template>
    <div>
      <el-table :data="currentData" border height="500" max-height="2000" ref="Table"
                @select="handSelect"
                @select-all="handAll"
                @selection-change="handSelf"
      >
        <el-table-column type="selection" width="55" fixed
                :selectable="selectable"
        ></el-table-column>
        <el-table-column type="index" label="排序" width="80px" align="center"></el-table-column>
        <el-table-column prop="date" label="日期"  width="300" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="名字" width="300" sortable align="center"></el-table-column>
        <el-table-column label="图片" prop="url" sortable width="200" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.url" :preview-src-list="[scope.row.url]" ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300" sortable align="center"></el-table-column>
        <el-table-column label="是否禁用" prop="identification" sortable align="center" width="200"></el-table-column>
        <el-table-column label="操作"  fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handStop(scope.$index,scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4,Data.length]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Data.length">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        data(){
          return {
            currentPage:1,
            currentSize:3,
            currentData:[],
            Data:[
              {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:'false',
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:1,
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
              },
              {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:1,
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              {
                date: '2016-05-05',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:1,
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:'false',
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:1,
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                identification:1,
                url:'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
              },
              ]
          }
        },
      methods:{
          handSelect(e){
            //不是全选的时候触发
            console.log('手动')
            console.log(e)
          },
          handAll(e){
            //全选时候触发
            console.log('全选')
            console.log(e)
          },
          handSelf(e){
            //只要由选择或者取消都触发
            console.log('改变')
            console.log(e);
          },
          handleSizeChange(e) {//用户选择每页条数
            this.currentSize = e;
            this.handleCurrentChange(this.currentPage);
          },
          handleCurrentChange(val) {//用户选择那一页
            this.currentData = [];
            this.currentPage = val;
            this.currentData = this.Data.filter((item,index)=>{
              return index < this.currentPage*this.currentSize && index >= (this.currentPage-1)*this.currentSize
            });
          },
          handStop(index,row){//禁止按钮
            //row.identification = true;

            this.istrue = 2;
            //this.reload()
            console.log(index,row);
        },
          selectable(row,index){//禁止用户选择多选框
            if(row.identification == 1){
              return 'false'
            }
          console.log('禁用')
          console.log(index,row)
        }
      },
      mounted() {
        this.handleCurrentChange(this.currentPage)
      }
    }
</script>

<style scoped>
  .block{
    float: right;
  }
</style>
