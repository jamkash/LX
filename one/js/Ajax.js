//ajax 原始调用
function funCallService(RequestType, Async, RequestUrl, SendData, UpdateMethod) {
    var xmlhttp;
    var retjsondata;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    try {
        xmlhttp.open(RequestType, RequestUrl, Async);
        if (RequestType.toUpperCase() == "POST")
            xmlhttp.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");
        if (SendData == '')
            SendData = null;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    retjsondata = xmlhttp.responseText;
                }
            }
        }
        xmlhttp.send(SendData);
    } catch (e) {
        console.log("网络异常,稍后尝试");
    }
    return retjsondata;
}

/*jquery的封装方式 
 *参数的传入方式
 *ajax({
				url:'',
				type:,
				Async:,
				success:function(data){},
				error:function(data){}
			});
*/
function ajax(obj){
	var xmlhttp;
	if(Object.prototype.toString.call(obj).slice(8,-1) !== 'Object'){
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
//cookie
function setCookie(name, value) {
	document.cookie = name + "=" + escape(value);
}
				
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
















