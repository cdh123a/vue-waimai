import Mock from 'mockjs';
import data from './data.json';

//mock 数据  Mock.mock（url，模拟后台返回的数据类型和结构

/*mock提供goods数据接口*/
Mock.mock('/goods', {code: 0, data: data.goods});
/*mock提供ratings数据接口*/
Mock.mock('/ratings',  { code : 0, data: data.ratings})
/*mock提供info数据接口*/
Mock.mock('/info', {code: 0, data: data.info})


/*不需要向外暴露什么  引入执行一次就行*/
console.log('mock开始服务了')

