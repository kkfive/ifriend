import './style/index.less'
import { getLabels, getBody, getLabelDescr } from './utils.js'

class Friend {
  // 初始化
  constructor(obj) {
    const { owner, repo, direction_sort, sort_container, labelDescr } = obj
    // 用户名
    this.owner = owner
    // 仓库
    this.repo = repo
    // 排序规则 desc or asc
    this.direction_sort = direction_sort
    // 根据标签排序
    this.sort_container = sort_container
    // 标签描述
    this.labelDescr = labelDescr

    // 当前页面
    this.page = 1
    // 每次加载的用户
    this.per_page = 100
    // 需要指定的容器可以是id或者class
    this.el = '#friend1'
    // 存储容器
    this.text = []
    this.init()
  }
  // 初始化
  init() {
    // 输出信息
    console.log(
      "\n %c XiaoKang's FriendTools" +
        this.version +
        ' %c https://docs.tzki.cn/Friend \n',
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
    $(`${this.el}`).html(
      `<div class="loader"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="load one" cx="60" cy="60" r="40"></circle><circle class="load two" cx="60" cy="60" r="40"></circle><circle class="load three" cx="60" cy="60" r="40"></circle><g><circle class="point one" cx="45" cy="70" r="5"></circle><circle class="point two" cx="60" cy="70" r="5"></circle><circle class="point three" cx="75" cy="70" r="5"></circle></g></svg></div>`
    )
  }
  // 创建需要置顶的标签容器
  createContainer() {
    for (var i in this.sort_container) {
      $(`${this.el}`).append(
        `<h2 id=${this.sort_container[i]}>${this.sort_container[i]}</h2><div class="flink-desc"><h4>${this.sort_container[i]}</h4></div><div class="flink-list">` +
          `</div>`
      )
    }
  }
  // 创建朋友
  createFriend() {
    let content = ''
    var text = this.text
    $('.loader').hide()
    this.createContainer()
    for (let i in text) {
      if (text[i].labels) {
        content = text[i].body
        if ($('#' + text[i].labels).length) {
          $(`#${text[i].labels}`).next().next().append(content)
        } else {
          $(this.el).append(
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

  // 获取朋友
  getFriends(_this) {
    return $.ajax({
      url: `https://gitee.com/api/v5/repos/${this.owner}/${this.repo}/issues?state=open&sort=created&direction=${this.direction_sort}&page=${this.page}&per_page=${this.per_page}&access_token=7ca3f6d9cbb97f18f85ed56c8401780a`,
      type: 'get',
      success: function (date, textStatus, request) {
        _this.text = []
        if (date) {
          for (let i in date) {
            var temp = {}
            temp.body = getBody(date[i]['body'])
            temp.labels = getLabels(date[i]['labels'])
            _this.text.push(temp)
          }
        } else {
          return
        }
      }
    })
  }
}

;(function () {
  window.Friend = Friend
})()