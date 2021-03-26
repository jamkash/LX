export const _this = (content,_this)=>{
  content.state._this = [];
  content.state._this = _this;
};
export const componentChange = (content,val)=>{
  content.state.parentArr = [];
  content.state.sonArr = [];
  content.state.grandSon = [];
  content.state.IndexArr = [];
  content.state.HomeIndex = [];
  content.state.str = '';
  content.state.navstr = '';
  content.state.tabStr = 0;

  content.state.str = val.toString();
  content.state.tabStr = content.state.tabsNum;
  switch (Number(content.state.tabStr)) {
    case 0:
      content.state.navstr =  'allMain';
      break;
    case 1:
      content.state.navstr =  'user';
      break;
    case 2:
      content.state.navstr =  'config';
      break;
    case 3:
      content.state.navstr =  'player';
      break;
  }
  //获取导航内容的所在位置
  content.state._this.filter((item,index)=>{
    item.path.indexOf(content.state.navstr) >=0 ? content.state.IndexArr.push(index) : '';
    item.path.indexOf('home/'+content.state.navstr)>=0 ? content.state.HomeIndex = index : '';
    return
  });
  content.state.IndexArr.shift(); //去掉多余的第一个
  console.log(content.state.IndexArr,content.state.HomeIndex);

  //添加每级导航的对应内容
  for(let i in content.state._this[content.state.IndexArr[0]].components){
    content.state.parentArr.push(content.state._this[content.state.IndexArr[0]].components[i])
  }
  for(let i in content.state._this[content.state.IndexArr[1]].components){
    content.state.sonArr.push(content.state._this[content.state.IndexArr[1]].components[i])
  }
  for(let i in content.state._this[content.state.IndexArr[2]].components){
    content.state.grandSon.push(content.state._this[content.state.IndexArr[2]].components[i])
  }
  //把对应的导航内容映射个main组件显示出来
  if(content.state.str.split('-').length == 1){
    content.state.str = content.state.str.split('-').pop();
    content.state._this[content.state.HomeIndex].components.Main = content.state.parentArr[Number(content.state.str)-1];
  }else if(content.state.str.split('-').length == 2){
    content.state.str = content.state.str.split('-').pop();
    content.state._this[content.state.HomeIndex].components.Main = content.state.sonArr[Number(content.state.str)-1];
  }else {
    content.state.str = content.state.str.split('-').pop();
    content.state._this[content.state.HomeIndex].components.Main = content.state.grandSon[Number(content.state.str)-1];
  }
  console.log(content.state.str,content.state.parentArr,content.state.sonArr,content.state.grandSon)
}
