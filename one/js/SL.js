var num = 1;
(function(global,factory){
	global.SL = factory()
})(this,function(){
	var SL =  function(obj){
		var arr = [];
		var navArr = [];
		var imgArr = [];
		var SLEDU = {
			left:'',
			top:'',
			url:'',                 //接口路径
			ImgUrl:'',
			dataCount:8,            //片单布局总数
			direction:'left',       //判断导航模板
			totalPage:1,
			curryPage:1,
			Count:0,                //当前页的片单数量
			dataLen:7,              //接口的数据
			navBtn:'nav1',
			isNav:false,
			isdataLen:true
		}
		
		
		SLEDU.$Id = function(id){
			return document.getElementById(id);
		}
		
		//清除元素
		SLEDU.clearElement = function(a,b,c){
		    var len = Array.from(arguments);
			for(var i = 0 ;i < len.length ; i++){
				SLEDU.$Id(len[i]).innerHTML = '';
			}
		}
		//获取类型
		SLEDU.getType = function(obj){
			return Object.prototype.toString.call(obj).slice(8,-1)
		}
		
		//getCookie
		SLEDU.getCookie = function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg)){
				return unescape(arr[2]);
			}else{
				return null;
			}
		}
		
		//setCookie
		SLEDU.setCookie = function(name, value) {
			document.cookie = name + "=" + escape(value);
		}
		//图片放置对应的位置
		SLEDU.show_Picture = function(id){
			var _this = this;
			var left = _this.left = arr[(num-1)].left;
			var top = _this.top = arr[(num-1)].top;
			var ImgUrl = _this.ImgUrl = arr[(num-1)].ImgUrl;
			_this.$Id(id).innerHTML = '<img src="'+ImgUrl+'" id="show">'
			_this.$Id('show').style = 'position: absolute;left:'+left+'px;top:'+top+'px ;z-index: 999;'
		}
		
		/*请求接口
		 *参数的传入方式
		 *ajax({
				url:'',
				type:'get'/'post',
				Async:true/false,
				success:function(data){},
				error:function(data){}
					});
		*/
		SLEDU.ajax = function(obj){
			var xmlhttp;
			if(SLEDU.getType(obj) !== 'Object'){
				throw TypeError('Parameter type is not object');
			}
			obj.url == '' || obj.url == undefined || obj.url == null ? obj.url = '' : obj.url;
			obj.type == '' || obj.type == undefined || obj.type == null ? obj.type = '' : obj.type;
			obj.Async == '' || obj.Async == undefined || obj.Async == null ? obj.Async == false : obj.Async;
			if (window.XMLHttpRequest) {
			    xmlhttp = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
			    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			try {
			    xmlhttp.open(obj.type, obj.url, obj.Async);
			    if (obj.type.toUpperCase() == "POST")
			        xmlhttp.setRequestHeader("Content-Type",
			            "application/x-www-form-urlencoded");
			    xmlhttp.onreadystatechange = function () {
			        if (xmlhttp.readyState == 4) {
			            if (xmlhttp.status == 200) {
						   return 	obj.success(xmlhttp.responseText);
			            }else{
						   return   obj.error(xmlhttp.responseText);
						}
			        }
			    }
			    xmlhttp.send();
			} catch (e) {
			    console.log("网络异常,稍后尝试");
			}
		}
		
		//上一页
		SLEDU.prePage = function(page,content,navId,navImg,other,navnum){
			var _this = this;
			_this.curryPage--;
			if(_this.curryPage <= 1){
				_this.curryPage = 1;
			}
			_this.init(page,content,navId,navImg,other,navnum);
		}
		
		//下一页
		SLEDU.nextPage = function(page,content,navId,navImg,other,navnum){
			var _this = this;
			_this.curryPage++;
			if(_this.curryPage >= _this.totalPage){
				_this.curryPage = _this.totalPage;
			}
			_this.init(page,content,navId,navImg,other,navnum);
		}
		
		//左键
		SLEDU.Shift_left = function(row,col,navnum,page,content,navId,navImg,other){
			var _this = this;
			var leftArr = [];
			if(_this.getType(row) != 'Number' || _this.getType(col) != 'Number'){
				throw TypeError('Parameter is not a number!')
			}
			if(row*col !== _this.dataCount){
				throw RangeError('Template layout does not exist!')
			}
			navId == '' || navId == undefined || navId == null ? navId = '': navId;
			content == '' || content == undefined || content == null ? content = '' : content;
			navImg == '' || navImg == undefined || navImg == null ? navImg = '' : navImg;
			if(navId == '' || content == '' || navImg == ''){
				throw TypeError('Parameter type is not a string')
			}
			
			//判断片单的最左边的所有位置
			if(_this.Count == _this.dataCount){//铺满的时候
				for(var i = 0 ; i < row ; i++){leftArr.push(col*i+1);}
			}else{//未铺满的时候
				var len = 0;
				len = _this.Count%col
				if(_this.Count%col == 0){
					len = col;
				}
				row = _this.Count%col == 0 ? _this.Count/col : Math.floor(_this.Count/col)+1
				for(var i = 1 ; i <= len ; i++){leftArr.push((row-1)*col+1)}
			}
			//非导航部分判断是不是最左边的位置
			var istrue = leftArr.some(function(item,index){return Number(item) == num;});
			
		    if(_this.direction == 'left'){//左导航
				if(_this.Count >= 1 && _this.Count <= _this.dataCount && _this.isNav == false){//处理所有情况的片单
					if(num > 1 && num <= _this.Count || num == (_this.Count+2) || num == (_this.Count+1)){//处理片单部分和上下页的部分
						num == (_this.Count+2) ? num = (_this.Count+1) : num -= 1;
						if(istrue){//当前焦点框位置在最左边时候
							_this.navBtn = 'nav'+_this.navBtn.substr(3);
							num = Number(_this.navBtn.substr(3));
							_this.isNav = true;
						}
					}else if(num == 1){//焦点框在第一个的时候
						    _this.navBtn = 'nav'+_this.navBtn.substr(3);
						    num = Number(_this.navBtn.substr(3));
						    _this.isNav = true;
					}
				}
			}else{//上导航
				if(_this.Count >= 1 && _this.Count <= _this.dataCount && _this.isNav == false){//非导航部分
					if(num > 1 && num <= _this.Count || num == (_this.Count+2)){
						num == (_this.Count+2) ? num = (_this.Count+1) : num -= 1;
					}
				}else if(_this.isNav == true){//处理导航部分
				        switch(num-1){
				        	case 1:
				        	_this.dataLen = 7;
				        	break;
				        	case 2:
				        	_this.dataLen = 12;
				        	break;
				        	case 3:
				        	_this.dataLen = 22;
				        	break;
							case 4:
							_this.dataLen = 4;
							break;
							case 5:
							_this.dataLen = 7;
							break;
							case 6:
							_this.dataLen = 16;
							break;
							case 7:
							_this.dataLen = 1;
							break;
							case 8:
							_this.dataLen = 8;
							break;
				        }
				        _this.curryPage = _this.totalPage = 1
				        _this.init(page,content,navId,navImg,other,navnum)
						num = Number(_this.navBtn.substr(3));
					    num-=1;
						num <= 1 ? num = 1 : num;
						_this.navBtn = 'nav'+num;
				}
			}
			
		
			//图片显示
			if(_this.isNav){//导航
				_this.clearElement(navImg,other);
				_this.$Id(navId).innerHTML = '<img src="'+navArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+navArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+navArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'
			}else{//非导航
				_this.clearElement(navId);
				_this.$Id(navImg).innerHTML = '<img src="'+imgArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+imgArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+imgArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'//导航的显示，不带黄色焦点框
				_this.show_Picture(other);//非导航的焦点框的显示
			}
			
			return num;
		}
		
		//右键
		SLEDU.Shift_right = function(row,col,navnum,page,content,navId,navImg,other){
			var _this = this;
			if(_this.getType(row) != 'Number' || _this.getType(col) != 'Number'){
				throw TypeError('Parameter is not a number!')
			}
			if(row*col !== _this.dataCount){
				throw RangeError('Template layout does not exist!')
			}
			navnum == '' || navnum == undefined || navnum == null ? navnum = '': navnum;
			navId == '' || navId == undefined || navId == null ? navId = '': navId;
			content == '' || content == undefined || content == null ? content = '' : content;
			navImg == '' || navImg == undefined || navImg == null ? navImg = '' : navImg;
			if(navId == '' || content == '' || navImg == ''){
				throw TypeError('Parameter type is not a string')
			}
			
			if(_this.direction == 'left'){//左导航
			     if(_this.Count >= 1 && _this.Count <= _this.dataCount && _this.isNav == false){//非导航部分
					 if(num >= 1 && num < _this.Count || num == (_this.Count+1)){
						 num == _this.Count+1 ? num = _this.Count+2 : num+=1;
					 }
					 
				 }else if(_this.isNav == true){//导航部分
					     _this.navBtn = 'nav'+num;
						 num = 1;
						 _this.isNav = false;
				 }
			}else{//上导航
				 if(_this.Count >= 1 && _this.Count <= _this.dataCount && _this.isNav == false){//非导航部分
				 	if(num >= 1 && num < _this.Count || num == (_this.Count+1)){
				 		num == _this.Count+1 ? num = _this.Count+2 : num+=1;
				 	}
				 }else if(_this.isNav == true){//导航部分
				        switch(num+1){
				        	case 2:
				        	_this.dataLen = 12;
				        	break;
				        	case 3:
				        	_this.dataLen = 22;
				        	break;
							case 4:
							_this.dataLen = 4;
							break;
							case 5:
							_this.dataLen = 7;
							break;
							case 6:
							_this.dataLen = 16;
							break;
							case 7:
							_this.dataLen = 1;
							break;
							case 8:
							_this.dataLen = 8;
							break;
				        }
				        _this.curryPage = _this.totalPage = 1
				        _this.init(page,content,navId,navImg,other,navnum)
				        num = Number(_this.navBtn.substr(3))
				 		num+=1;
				 		num > navnum ? num = navnum : num;
						_this.navBtn = 'nav'+num;
				 }
			}
			
			console.log(num)
			//图片显示
			if(_this.isNav){//导航
				_this.clearElement(navImg,other);
				_this.$Id(navId).innerHTML = '<img src="'+navArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+navArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+navArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'
			}else{//非导航
				_this.clearElement(navId);
				_this.$Id(navImg).innerHTML = '<img src="'+imgArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+imgArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+imgArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'//导航的显示，不带黄色焦点框
				_this.show_Picture(other);
			}
			
			return num;
		}
		
		//下键
		SLEDU.Shift_down = function(row,col,navnum,page,content,navId,navImg,other){
			var _this = this;
			var LastArr = [];
			if(_this.getType(row) != 'Number' || _this.getType(col) != 'Number'){
				throw TypeError('Parameter is not a number!')
			}
			if(row*col !== _this.dataCount){
				throw RangeError('Template layout does not exist!')
			}
			navnum == '' || navnum == undefined || navnum == null ? navnum = '': navnum;
			navId == '' || navId == undefined || navId == null ? navId = '': navId;
			content == '' || content == undefined || content == null ? content = '' : content;
			navImg == '' || navImg == undefined || navImg == null ? navImg = '' : navImg;
			if(navId == '' || content == '' || navImg == ''){
				throw TypeError('Parameter type is not a string')
			}
			
			//判断是否是最后一排
			if(_this.Count == _this.dataCount){//铺满
				for(var i = 1 ; i <= col ; i++){LastArr.push((row-1)*col+i)}
			}else{//未铺满
				var len = 0;
				len = _this.Count%col
				if(_this.Count%col == 0){
					len = col;
				}
				row = _this.Count%col == 0 ? _this.Count/col : Math.floor(_this.Count/col)+1
				for(var i = 1 ; i <= len ; i++){LastArr.push((row-1)*col+i)}
			}
			//判断当前片单位置是否在最后一排中
			var lastCol = LastArr.some(function(item,index){return Number(item) === num});
			if(_this.Count == _this.dataCount && _this.isNav == false){//当前片单铺满
				if(!lastCol){//不是最后一排的时候
				    if(num >= _this.dataCount+1){//处理分页的情况
						num == _this.dataCount+1 ? num = _this.dataCount+1 : num = _this.dataCount+2
						return num;
					}
					num+=col;
				}else if(lastCol){//是最后一排的时候
					switch(col){
						case 2://当前列排布的是2个的时候
						num == _this.dataCount - 1 ? num = _this.dataCount+1 : num =_this.dataCount+2
						break;
						case 3://当前列排布的是3个的时候
						num == _this.dataCount - 1 || num == _this.dataCount - 2 ?
						num = _this.dataCount+1 : 
						num = _this.dataCount+2
						break;
						case 4://当前列排布的是4个的时候
						num == _this.dataCount - 2 || num == _this.dataCount - 3 ? 
						num = _this.dataCount+1 : 
						num = _this.dataCount+2
						break;
						case 6://当前列排布的是6个的时候
						num == _this.dataCount - 6 || num == _this.dataCount - 5 ||  num == _this.dataCount - 4?
						num = _this.dataCount+1 : 
						num = _this.dataCount+2
						break;
						case 7://当前列排布的是7个的时候
						num == _this.dataCount - 7 || num == _this.dataCount - 6 || num == _this.dataCount - 5 ?
						num = _this.dataCount+1 : 
						num = _this.dataCount+2
						break;
						case 8://当前列排布的是8个的时候
						num == _this.dataCount - 8 || num == _this.dataCount - 7 || num == _this.dataCount - 6 || num == _this.dataCount - 5 ?
						num = _this.dataCount+1 : 
						num = _this.dataCount+2
						break;
					}
				}
			}else if(_this.Count >= 1 && _this.Count < _this.dataCount && _this.isNav == false){//当前片单没有铺满
				if(!lastCol){//不是最后一排的时候
				   if(num >= _this.Count+1){//处理分页的情况
					num == _this.Count+1 ? num = _this.Count+1 : num = _this.Count+2
				  	return num;
				    }
					num+=col;
					num >= _this.Count ? num = _this.Count : num;
				}else if(lastCol){//是最后一排的时候
				    num = _this.Count+1;
				}
			}
			
			if(_this.direction == 'left'){//左导航
			     if(_this.isNav == true){//导航部分
				 switch(num+1){
				 	case 2:
				 	_this.dataLen = 12;
				 	break;
				 	case 3:
				 	_this.dataLen = 22;
				 	break;
					case 4:
					_this.dataLen = 4;
					break;
					case 5:
					_this.dataLen = 7;
					break;
					case 6:
					_this.dataLen = 16;
					break;
					case 7:
					_this.dataLen = 1;
					break;
					case 8:
					_this.dataLen = 8;
					break;
				 }
					_this.curryPage = _this.totalPage = 1
					_this.init(page,content,navId,navImg,other,navnum)
					num = Number(_this.navBtn.substr(3));
					num+=1;
					num >= navnum ? num = navnum : num;
					_this.navBtn = 'nav'+num;
				}
			}else{//上导航
				 if(_this.isNav == true){//导航部分
				    _this.init(page,content,navId,navImg,other,navnum)
					num=1;
					_this.isNav = false;
				}
			}
		   
		   //图片显示
		   if(_this.isNav){//导航
		   	     _this.clearElement(navImg,other);
		   	     _this.$Id(navId).innerHTML = '<img src="'+navArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+navArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+navArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'
		   }else{//非导航
		       	_this.clearElement(navId);
		   	    _this.$Id(navImg).innerHTML = '<img src="'+imgArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+imgArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+imgArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'//导航的显示，不带黄色焦点框
		   	    _this.show_Picture(other);
		   }
		   
		   return num;
		}
		
		//上建
		SLEDU.Shift_top = function(row,col,navnum,page,content,navId,navImg,other){
			var _this = this;
			var topArr = [];
			if(_this.getType(row) != 'Number' || _this.getType(col) != 'Number'){
				throw TypeError('Parameter is not a number!')
			}
			if(row*col !== _this.dataCount){
				throw RangeError('Template layout does not exist!')
			}
			navId == '' || navId == undefined || navId == null ? navId = '': navId;
			content == '' || content == undefined || content == null ? content = '' : content;
			navImg == '' || navImg == undefined || navImg == null ? navImg = '' : navImg;
			if(navId == '' || content == '' || navImg == ''){
				throw TypeError('Parameter type is not a string')
			}
		
			//判断第一排
			if(_this.Count > col){//铺满
				for(var i = 0 ; i < col ; i++){topArr.push(col+(i-(col-1)));}
			}else{//未铺满
				var len = 0;
				len = _this.Count%col;
				if(_this.Count%col == 0){
					len = col;
				}
				row = _this.Count%col == 0 ? _this.Count/col : Math.floor(_this.Count/col)+1;
				for(var i = 1 ; i <= len ; i++){topArr.push(i);}
			}
			//判断是不是第一排 值true/false
			var firstCol = topArr.some(function(item,index){return Number(item) == num});
			if(_this.Count == _this.dataCount && _this.isNav == false){//当前铺满了片单
				if(num == _this.dataCount+1 || num == _this.dataCount+2 || !firstCol){
					switch(col){
						case 2://当前的列排布是2个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 1 : num = _this.dataCount
						}else{
							num-= col
						}
						break;
						case 3://当前的列排布是3个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 2 : num = _this.dataCount
						}else{
							num-= col
						}
						break;
						case 4://当前列排布的是4个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 3 : num = _this.dataCount - 1
						}else{
							num-= col
						}
						break;
						case 6://当前列排布的是6个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 5 : num = _this.dataCount - 2
						}else{
							num-= col
						}
						break;
						case 7://当前列排布的是7个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 5 : num = _this.dataCount - 2
						}else{
							num-= col
						}
						break;
						case 8://当前列排布的是8个的时候
						if(num == _this.dataCount+1 || num ==  _this.dataCount+2){
							num == _this.dataCount+1 ? num = _this.dataCount - 7 : num = _this.dataCount - 3
						}else{
							num-= col
						}
						break;
					}
				}
			}else if(_this.Count >= 1 && _this.Count < _this.dataCount && _this.isNav == false){//当前片单没有铺满
					if(num == _this.Count+1 || num == _this.Count+2 || !firstCol){
						num == _this.Count+1 || num == _this.Count+2 ?
						num = _this.Count : 
						num-= col
						
					}
			}
			
			if(_this.direction == 'left'){//左导航
			   if(_this.isNav == true){//导航部分
			           switch(num-1){
						case 1:
						_this.dataLen = 7;
						break;
			           	case 2:
			           	_this.dataLen = 12;
			           	break;
			           	case 3:
			           	_this.dataLen = 22;
			           	break;
						case 4:
						_this.dataLen = 4;
						break;
						case 5:
						_this.dataLen = 7;
						break;
						case 6:
						_this.dataLen = 16;
						break;
						case 7:
						_this.dataLen = 1;
						break;
						case 8:
						_this.dataLen = 8;
						break;
			           }
			            _this.curryPage = _this.totalPage = 1
			            _this.init(page,content,navId,navImg,other,navnum);
						num = Number(_this.navBtn.substr(3))
					    num-=1;
						num <=1 ? num = 1 : num;
						_this.navBtn = 'nav'+num;
				}
			}else{//上导航
			    if(firstCol && _this.isNav == false){//第一排的时候
						num = Number(_this.navBtn.substr(3));
						_this.navBtn = 'nav'+num;
						_this.isNav = true;
				}
				
			}
		
			//图片显示
			if(_this.isNav){//导航
				_this.clearElement(navImg,other);
				_this.$Id(navId).innerHTML = '<img src="'+navArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+navArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+navArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'
			}else{//非导航
				_this.clearElement(navId);
				_this.$Id(navImg).innerHTML = '<img src="'+imgArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+imgArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+imgArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'//导航的显示，不带黄色焦点框
				_this.show_Picture(other);
			}
			
			return num;
		}
		
		//确定键
		SLEDU.Enter = function(page,content,navId,navImg,other,navnum){
			var _this = this;
			switch(num){
				case _this.Count+1://上一页
				_this.prePage(page,content,navId,navImg,other,navnum);
				break;
				case _this.Count+2://下一页
				_this.nextPage(page,content,navId,navImg,other,navnum);
				break;
				case num://其他片单位置
				if(_this.isNav == false){
					_this.setCookie(pageid+'num',num);
					_this.setCookie(pageid+'curryPage',_this.curryPage);
					_this.setCookie(pageid+'dataLen',_this.dataLen);
					_this.setCookie(pageid+'navBtn',_this.navBtn);
					window.location.href = 'https://www.baidu.com/?tn=62095104_12_dg'
				}
				break;
			}
		}
		
		//数据的呈现
		SLEDU.init = function(page,content,navId,navImg,other,navnum){
			var _this = this;
			navArr = obj.slice(0,navnum);
			imgArr = obj.slice(navnum,2*navnum);
			
			if(_this.isdataLen){//第一次初始数据
				_this.direction = navArr[0].direction;
				_this.dataCount = navArr[0].dataCount;
				_this.dataLen = navArr[0].dataLen;
				_this.curryPage = navArr[0].curryPage;
				if(_this.getCookie(pageid+'navBtn') != null){
					_this.navBtn = _this.getCookie(pageid+'navBtn');
				}
			}
			_this.navBtn = navArr[Number(_this.navBtn.substr(3))-1].navBtn;
			_this.totalPage = parseInt(_this.dataLen%_this.dataCount) == 0 ?
			parseInt(_this.dataLen/_this.dataCount) : 
			parseInt(_this.dataLen/_this.dataCount)+1 
			_this.totalPage == 0 ? _this.totalPage = 1 : _this.totalPage;
			if(_this.curryPage < _this.totalPage){
				_this.Count = _this.dataCount;
				if(_this.isdataLen){//第一次进来
					_this.isdataLen = false;
				}else{//非第一次
					if(num == 1){
						num = 1
					}else{
						num == _this.Count+2 ? num = _this.Count+2 : num = _this.Count+1;
					}
				}
			}else{
				_this.Count = parseInt(_this.dataLen%_this.dataCount)
				_this.Count == 0 ? _this.Count = _this.dataCount :_this.Count
				if(_this.isdataLen){//第一次进来
					 _this.isdataLen = false;
				}else{//非第一次
					num == 1 ? num = 1 : num = _this.Count+2
				}
				
			}
			for (var i = 0 ;i < _this.Count ; i++) {
				//_this.$Id(content).innerHTML += '<img src="images/painting/k'+(i+1+(_this.curryPage-1)*_this.dataCount)+'.png" >';
			}
            
			
			_this.$Id(page).innerHTML = _this.curryPage+' / '+_this.totalPage ;
			arr = obj.slice(2*navnum)
			arr.splice(_this.Count,_this.dataCount-_this.Count);
            
			console.log(arr,imgArr,navArr)
			//图片显示
			if(_this.isNav){//导航
				_this.show_Picture(navId);
			}else{//非导航
				_this.$Id(navImg).innerHTML = '<img src="'+imgArr[Number(_this.navBtn.substr(3))-1].ImgUrl+'" style="position: absolute;left:'+imgArr[Number(_this.navBtn.substr(3))-1].left+'px;top:'+imgArr[Number(_this.navBtn.substr(3))-1].top+'px ;z-index: 999;">'//导航的显示，不带黄色焦点框
				_this.show_Picture(other);//非导航的焦点框的显示
			}
			
		}
		
		return SLEDU;
	}
	return SL;
})