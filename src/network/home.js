import { request } from "./request";
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

// 首页分类里的数据
// 需要传参，有三类，每一类还要告诉相应的页码，传过来 type类型 page页码
export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}