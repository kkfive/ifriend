function createFriend() {
  $('.flink').prepend("<div id='friend1'></div>")
  new Friend({
    el: '#friend1',
    owner: 'antmoe',
    repo: 'friend',
    direction_sort: 'asc',
    sort_container: ['乐特专属', '同校PY', '大佬们'],
    labelDescr: {
      大佬们: "<span style='color:red;'>这是一群大佬哦！</span>",
      菜鸡们: "<span style='color:red;'>这是一群菜鸡哦！</span>",
      同校PY: "<span style='color:red;'>同校好友</span>"
    }
  })
}
// 尝试当前页面是否被加载过
try {
  btf.isJqueryLoad(createFriend())
} catch (error) {
  window.onload = function () {
    btf.isJqueryLoad(createFriend())
  }
}
