import './style/index.less'
import { getLabels, getBody, getLabelDescr } from './utils.js'

class Friend {
  // 初始化
  constructor(obj) {
    const { url, sort_container, labelDescr, el, fail_img, loading_img } = obj
    // URL
    this.url = url
    // 根据标签排序
    this.sort_container = sort_container
    // 标签描述
    this.labelDescr = labelDescr

    this.el = el
    // 存储容器
    this.text = []
    // 友链头像加载失败时的图片
    this.fail_img =
      fail_img ||
      'https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile1/imgbed/2020/03/21/20200321213747.gif'
    this.loading_img =
      loading_img || 'https://7.dusays.com/2021/03/04/070e14372aa11.gif'
    this.init()
  }
  // 初始化
  init() {
    // 输出信息
    console.log(
      '\n %c butterfly-friend %c https://www.yuque.com/kdoc/bf/friend \n',
      'color: #fff; background: #4285f4; padding:5px 0;',
      'background: #66CCFF; padding:5px 0;'
    )
    // 获取当前页数友联
    this.getPageFriend()
  }
  // 根据页数获取友联
  async getPageFriend() {
    this.showLoading()
    await this.getFriends(this)
    this.createFriend()
  }
  // 展示loading
  showLoading() {
    document.querySelector(
      `${this.el}`
    ).innerHTML = `<div class="loader"><img src='${this.loading_img}'></div>`
  }
  // 创建需要置顶的标签容器
  createContainer() {
    for (var i in this.sort_container) {
      document
        .querySelector(`${this.el}`)
        .insertAdjacentHTML(
          'beforeend',
          `<h2 id=${this.sort_container[i]}>${
            this.sort_container[i]
          }</h2><div class="flink-desc">${getLabelDescr(
            this,
            this.sort_container[i]
          )}</div><div class="flink-list-card"></div><div class="flink-list"></div>`
        )
    }
  }
  // 创建朋友
  createFriend() {
    let content = ''
    var text = this.text
    document.querySelector('.loader').style.display = 'none'
    this.createContainer()
    for (let i in text) {
      if (text[i].labels) {
        const body = text[i].body
        const element = document.querySelector(`#${text[i].labels}`)
        const elementList = document.querySelectorAll('#' + text[i].labels)
        content = body.template
        // card类型
        if (body.type == 'card') {
          // 如果已经创建过标签
          if (elementList.length) {
            element.nextElementSibling.nextElementSibling.insertAdjacentHTML(
              'beforeend',
              content
            )
          } else {
            // 没有创建过标签
            document
              .querySelector(this.el)
              .insertAdjacentHTML(
                'beforeend',
                `<h2 id=${text[i].labels}>${
                  text[i].labels
                }</h2><div class="flink-desc">${getLabelDescr(
                  this,
                  text[i].labels
                )}</div>` +
                  `<div class="flink-list-card">` +
                  content +
                  `</div>` +
                  `<div class="flink-list"></div>`
              )
          }
        }
        // item类型
        else {
          // 已经创建过当前标签的dom
          if (elementList.length) {
            // 是否包含card类型的卡片
            if (
              element.nextElementSibling.nextElementSibling.nextElementSibling
            ) {
              // 包含card类型的友链
              element.nextElementSibling.nextElementSibling.nextElementSibling.insertAdjacentHTML(
                'beforeend',
                content
              )
            } else {
              // 不包含card类型的卡片
              element.nextElementSibling.nextElementSibling.insertAdjacentHTML(
                'beforeend',
                content
              )
            }
          }
          // 没有创建过当前标签的dom
          else {
            document
              .querySelector(this.el)
              .insertAdjacentHTML(
                'beforeend',
                `<h2 id=${text[i].labels}>${
                  text[i].labels
                }</h2><div class="flink-desc">${getLabelDescr(
                  this,
                  text[i].labels
                )}</div><div class="flink-list">` +
                  content +
                  `</div>`
              )
          }
        }
      }
    }
  }

  // 获取朋友
  getFriends(_this) {
    return fetch(_this.url)
      .then((response) => response.json())
      .then((data) => {
        _this.text = []
        if (data) {
          for (let i in data.gitee) {
            if (data.gitee[i].state == 'open') {
              var temp = {}
              temp.body = getBody(data.gitee[i]['body'], _this.fail_img)
              temp.labels = getLabels(data.gitee[i]['label'])
              _this.text.push(temp)
            }
          }
          for (let i in data.github) {
            if (data.github[i].state == 'open') {
              var temp = {}
              temp.body = getBody(data.github[i]['body'], _this.fail_img)
              temp.labels = getLabels(data.github[i]['label'])
              _this.text.push(temp)
            }
          }
        } else {
          return
        }
      })
  }
}

;(function () {
  window.Friend = Friend
})()
