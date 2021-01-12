if (typeof Friend == 'undefined') {
  location.href = '/friends'
}
console.log(
  '\n %c butterfly-friend' +
    version +
    ' %c https://www.yuque.com/kdoc/bf/friend \n',
  'color: #fff; background: #4285f4; padding:5px 0;',
  'background: #66CCFF; padding:5px 0;'
)
var obj = {
  el: '#friend1',
  owner: 'antmoe',
  repo: 'friend',
  direction_sort: 'asc',
  sort_container: ['卡片专属', '乐特专属', '同校PY', '大佬们'],
  labelDescr: {
    大佬们: "<span style='color:red;'>这是一群大佬哦！</span>",
    菜鸡们: "<span style='color:red;'>这是一群菜鸡哦！</span>",
    同校PY: "<span style='color:red;'>同校好友</span>",
    卡片专属: "<span style='color:red;'>大佬专属</span>"
  }
}
try {
  btf.isJqueryLoad(function () {
    $('.flink').prepend("<div id='friend1'></div>")
    new Friend(obj)
  })
} catch (error) {
  window.onload = function () {
    btf.isJqueryLoad(function () {
      $('.flink').prepend("<div id='friend1'></div>")
      new Friend(obj)
    })
  }
}
