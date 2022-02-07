import { FriendResponse } from '../types/friend'

export const request: (
  url: string,
  data?: any,
  method?: string
) => Promise<any> = (url, data, method = 'get') => {
  return new Promise((resolve, reject) => {
    // 1. 创建核心对象
    var xhr: XMLHttpRequest = new XMLHttpRequest()
    const jwt = localStorage.getItem('xkfriendtoken')

    // 2. 监听异步请求状态
    xhr.onreadystatechange = function () {
      if ((xhr.status === 201 || xhr.status === 200) && xhr.readyState === 4) {
        // 当请求成功时执行的代码
        var friend: FriendResponse = JSON.parse(xhr.responseText)
        resolve(friend)
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        reject(JSON.parse(xhr.responseText))
      }
    }
    if (method === 'get' || method === 'GET') {
      // 设置请求方式及地址
      xhr.open('get', url)
      if (jwt) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
      }
      // 设置发送数据
      xhr.send(null)
    } else {
      // 设置请求方式及地址
      xhr.open('post', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
      if (jwt) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
      }
      // 设置发送数据
      xhr.send(data)
    }
  })
}
