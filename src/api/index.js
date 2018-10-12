/*包括n个调用发送ajax请求的函数*/
import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqPosition = (geohash) => ajax(`/api/position/${geohash}`);

//## 2、获取食品分类列表
export const reqFoodCategorys = () => ajax('/api/index_category');

//## 3、根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude}) => ajax('/api/shops',{latitude,longitude});


// 请求短信验证码
export const reqMsgCode = phone => ajax('/api/sendcode',{phone})

//请求短信登录
export const reqMsgLogin = ({phone,code}) => ajax('/api/login_sms',{phone,code},'POST')


//请求密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'POST')

//请求userinfo  实现免登录
export const reqUser = () => ajax('/api/userinfo')

//退出登录
export const reqLogout = () => ajax('/api/logout')





