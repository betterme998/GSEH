// 模块封装,如果axios不再维护,就只要换这个文件的代码返回一个promise就行了
import axios from 'axios'

// 最终方式    因为axios返回的就是promise所以可以写成下面这样
export function request(config) {

    // 创建axios实例
    const instance = axios.create({
      baseURL:'http://152.136.185.210:7878/api/hy66',
      timeout:5000
    })
    // 
    // 2.axios的拦截器
    instance.interceptors.request.use(config =>{// 2.1拦截请求
      return config
    }, err =>{
    })    

     //2.2拦截响应
    instance.interceptors.response.use(res => {//两个参数
      return res.data
    }, err => {
      // 失败
    })

    // 3发送真正网络请求
   return instance(config)
}
