import { FriendResponse } from '../types/friend'

export const request = (url: string) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            return reject('something went wrong!')
          }
        })
        .then((res) => resolve(res))
        .catch((e) => {
          reject()
        })
    } catch (e) {
      reject()
    }
  })
}

export const request1: (
  url: string,
  data?: any,
  method?: string
) => Promise<any> = (url, data, method = 'get') => {
  return new Promise((resolve, reject) => {
    // 1. 创建核心对象
    var xhr: XMLHttpRequest = new XMLHttpRequest()

    // 2. 监听异步请求状态
    xhr.onreadystatechange = function () {
      if ((xhr.status === 201 || xhr.status === 200) && xhr.readyState === 4) {
        // 当请求成功时执行的代码
        var friend: FriendResponse = JSON.parse(xhr.responseText)
        resolve(friend)
      } else if (xhr.readyState === 4 && xhr.status !== (201 || 200)) {
        reject(null)
      }
    }
    // 设置请求方式及地址
    xhr.open('get', url)

    // 设置发送数据
    xhr.send(null)
  })
}
