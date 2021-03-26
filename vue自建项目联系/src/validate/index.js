// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('账号不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 1000);
}

export function validatePassword(rule,val,callback){
    if(!val){
       return  callback(new Error('密码不能为空'))
    }
    console.log(this)
    setTimeout(function(){
       const password = /[a-zA-Z0-9]{6,12}/;
       console.log(password.test(val))
       let passTest = password.test(val);
       if(!passTest){
         callback(new Error('请输入正确的密码'));
       }else{
         callback();
       }
  },1000)
}
