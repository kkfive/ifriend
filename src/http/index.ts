import { friend } from '../types/friend'

export const getFriendList: (url: string) => Promise<friend> = (url) => {
  return new Promise((resolve, reject) => {
    // 1. 创建核心对象
    var xhr: XMLHttpRequest = new XMLHttpRequest()
    // 2. 监听异步请求状态
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        // 当请求成功时执行的代码
        var friend: friend = JSON.parse(xhr.responseText)
        resolve(friend)
      }
    }
    // 设置请求方式及地址
    xhr.open('get', url)
    // 设置发送数据
    xhr.send(null)
  })
}
