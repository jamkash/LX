<template>
    <div>
       <div class="num">
         <div>
           <h1>计数器：</h1>
           <template>
             <el-input-number :max="20" :min="1" v-model="num"  @change="changeNum">
             </el-input-number>
           </template>
         </div>
       </div>
      <!--选择器-->
      <div class="Select">
        <div>
          <h1>选择器：</h1>
          <el-select v-model="value"  @change="selectValue" placeholder="请选择内容" clearable>
            <el-option v-for="(item,index) in options"
            :key="item.value"
            :value="item.label"
            :label="item.label"
            >

            </el-option>
          </el-select>
        </div>
      </div>
      <!--多级联动-->
      <div class="Cascader">
        <div>
           <h1>多级联动：</h1><!--:show-all-levels="false" 只显示最后一个 filterable：可以搜索-->
           <el-cascader
           v-model="value2"
           :options="options2"
           :props="{ expandTrigger: 'hover' }"
           @change="handleChange"
           filterable
           >

           </el-cascader>
        </div>
      </div>
      <!--switch开关-->
      <div class="Switch">
          <div>
            <h1>Switch开关：</h1>
             <el-switch
               v-model="istrue"
               active-color="#13ce66"
             >

             </el-switch>
            <el-switch
              v-model="istrue"
              active-color="#13ce66"
              disabled
            >

            </el-switch>
          </div>
      </div>
      <!--slider-->
      <div class="Slider">
           <div>
             <h1>slider:</h1>
             <el-slider v-model="sliderNum"></el-slider>
           </div>
      </div>
      <!--时间选择器-->
      <div class="Time">
         <div>
           <h1>时间选择器：</h1>
             <template>
                <el-time-picker v-model="timePicker">

                </el-time-picker>
             </template>
         </div>
      </div>
      <!--日期选择器-->
      <div class="date">
          <div>
            <template>
               <el-date-picker v-model="datePicker" type="date" placeholder="请选择日期">

               </el-date-picker>
            </template>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
       data(){
         return {
           num:1,
           value:'',
           value2:'',
           sliderNum:10,
           datePicker:'',
           istrue:false,
           timePicker:new Date(2021,3,16,21,40),
           options: [{
             value: '选项1',
             label: '黄金糕'
           }, {
             value: '选项2',
             label: '双皮奶'
           }, {
             value: '选项3',
             label: '蚵仔煎'
           }, {
             value: '选项4',
             label: '龙须面'
           }, {
             value: '选项5',
             label: '北京烤鸭'
           }],
           options2: [{
             value: 'zhinan',
             label: '指南',
             children: [{
               value: 'shejiyuanze',
               label: '设计原则',
               children: [{
                 value: 'yizhi',
                 label: '一致'
               }, {
                 value: 'fankui',
                 label: '反馈'
               }, {
                 value: 'xiaolv',
                 label: '效率'
               }, {
                 value: 'kekong',
                 label: '可控'
               }]
             }, {
               value: 'daohang',
               label: '导航',
               children: [{
                 value: 'cexiangdaohang',
                 label: '侧向导航'
               }, {
                 value: 'dingbudaohang',
                 label: '顶部导航'
               }]
             }]
           }, {
             value: 'zujian',
             label: '组件',
             children: [{
               value: 'basic',
               label: 'Basic',
               children: [{
                 value: 'layout',
                 label: 'Layout 布局'
               }, {
                 value: 'color',
                 label: 'Color 色彩'
               }, {
                 value: 'typography',
                 label: 'Typography 字体'
               }, {
                 value: 'icon',
                 label: 'Icon 图标'
               }, {
                 value: 'button',
                 label: 'Button 按钮'
               }]
             }, {
               value: 'form',
               label: 'Form',
               children: [{
                 value: 'radio',
                 label: 'Radio 单选框'
               }, {
                 value: 'checkbox',
                 label: 'Checkbox 多选框'
               }, {
                 value: 'input',
                 label: 'Input 输入框'
               }, {
                 value: 'input-number',
                 label: 'InputNumber 计数器'
               }, {
                 value: 'select',
                 label: 'Select 选择器'
               }, {
                 value: 'cascader',
                 label: 'Cascader 级联选择器'
               }, {
                 value: 'switch',
                 label: 'Switch 开关'
               }, {
                 value: 'slider',
                 label: 'Slider 滑块'
               }, {
                 value: 'time-picker',
                 label: 'TimePicker 时间选择器'
               }, {
                 value: 'date-picker',
                 label: 'DatePicker 日期选择器'
               }, {
                 value: 'datetime-picker',
                 label: 'DateTimePicker 日期时间选择器'
               }, {
                 value: 'upload',
                 label: 'Upload 上传'
               }, {
                 value: 'rate',
                 label: 'Rate 评分'
               }, {
                 value: 'form',
                 label: 'Form 表单'
               }]
             }, {
               value: 'data',
               label: 'Data',
               children: [{
                 value: 'table',
                 label: 'Table 表格'
               }, {
                 value: 'tag',
                 label: 'Tag 标签'
               }, {
                 value: 'progress',
                 label: 'Progress 进度条'
               }, {
                 value: 'tree',
                 label: 'Tree 树形控件'
               }, {
                 value: 'pagination',
                 label: 'Pagination 分页'
               }, {
                 value: 'badge',
                 label: 'Badge 标记'
               }]
             }, {
               value: 'notice',
               label: 'Notice',
               children: [{
                 value: 'alert',
                 label: 'Alert 警告'
               }, {
                 value: 'loading',
                 label: 'Loading 加载'
               }, {
                 value: 'message',
                 label: 'Message 消息提示'
               }, {
                 value: 'message-box',
                 label: 'MessageBox 弹框'
               }, {
                 value: 'notification',
                 label: 'Notification 通知'
               }]
             }, {
               value: 'navigation',
               label: 'Navigation',
               children: [{
                 value: 'menu',
                 label: 'NavMenu 导航菜单'
               }, {
                 value: 'tabs',
                 label: 'Tabs 标签页'
               }, {
                 value: 'breadcrumb',
                 label: 'Breadcrumb 面包屑'
               }, {
                 value: 'dropdown',
                 label: 'Dropdown 下拉菜单'
               }, {
                 value: 'steps',
                 label: 'Steps 步骤条'
               }]
             }, {
               value: 'others',
               label: 'Others',
               children: [{
                 value: 'dialog',
                 label: 'Dialog 对话框'
               }, {
                 value: 'tooltip',
                 label: 'Tooltip 文字提示'
               }, {
                 value: 'popover',
                 label: 'Popover 弹出框'
               }, {
                 value: 'card',
                 label: 'Card 卡片'
               }, {
                 value: 'carousel',
                 label: 'Carousel 走马灯'
               }, {
                 value: 'collapse',
                 label: 'Collapse 折叠面板'
               }]
             }]
           }, {
             value: 'ziyuan',
             label: '资源',
             children: [{
               value: 'axure',
               label: 'Axure Components'
             }, {
               value: 'sketch',
               label: 'Sketch Templates'
             }, {
               value: 'jiaohu',
               label: '组件交互文档'
             }]
           }]
         }
       },
      methods:{
         changeNum(val,l){

           console.log()
         },
        selectValue(val){
           console.log(val)
        },
        handleChange(val){
           console.log(val)
        }
      }
    }
</script>

<style scoped>
    *{
      margin: 0;
      padding: 0;
    }
    .num,.Select,.Cascader,.Switch,Time,.Slider,.date{
      margin-top: 30px;
    }
  .num>div,.Select>div,.Cascader>div,.Switch>div,.Time>div,.date>div{
    display: flex;
    align-items: flex-start;
  }
</style>
