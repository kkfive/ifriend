/**
 * @description: 工具库
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-01-11 14:53:45
 * @LastEditTime: 2021-01-11 14:53:46
 * @LastEditors: 小康
 */

const getInfo = (body, regs) => {
  const reg = new RegExp(String.raw`${regs}:[^\n]*\n`)
  const repReg = new RegExp(String.raw`(${regs}:[\s]*|[\r\n]*)`, 'g')
  let info = '你写的好像不对哦！'
  body = body.match(reg)
  if (body && body.length > 0) {
    info = body[0].replace(repReg, '')
  }
  return info
}
const getCustom = (body) => {
  // animation:link_custom 0s infinite alternate;background:0
  // 主颜色（边框及鼠标悬停的背景颜色）、边框大小、边框样式（solid）、动画效果（link_custom、borderFlash）、背景颜色、鼠标悬停头像旋转角度
  const cssStyle = [
    '--primary-color',
    'border-width',
    'border-style',
    'animation',
    'background',
    '--primary-rotate'
  ]
  let style = ''
  for (var i in cssStyle) {
    var temp = getInfo(body, cssStyle[i])
    if (temp !== '你写的好像不对哦！') {
      style += `${cssStyle[i]}:${temp};`
    }
  }
  return style
}
const getImgCustom = (body) => {
  const cssStyle = ['img_animation']
  let style = ''
  for (var i in cssStyle) {
    var temp = getInfo(body, cssStyle[i])
    if (temp !== '你写的好像不对哦！') {
      style += `${temp};`
    }
  }
  return style
}
const getLabels = (labels) => {
  if (labels.length) {
    return labels[0].name
  }
}
const getBody = (body) => {
  let url = getInfo(body, 'link')
  let name = getInfo(body, 'name')
  let avatar = getInfo(body, 'avatar')
  let description = getInfo(body, 'descr')
  let userStyle = getInfo(body, 'card_style')
  const style = {
    // 第一种样式
    item: `<div class="flink-list-item" style="${getCustom(
      body
    )}"><a href="${url}" title="${name}" target="_blank"><img class="rauto" style="animation:${getImgCustom(
      body
    )}" data-lazy-src="${avatar}" onerror="this.onerror=null,this.src=&quot;https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile1/imgbed/2020/03/21/20200321213747.gif&quot;" alt="${name}" src="${avatar}"><span class="flink-item-name">${name}</span><span class="flink-item-desc" title="${description}">${description}</span></a></div>`,
    // 第二种样式
    card: `<a href="${url}" target="_blank"
    ><div class="wrapper cover">
      <img
        src="https://image.thum.io/get/width/1024/crop/768/${url}"
        class="cover fadeIn"
      />
    </div>
    <div class="info">
    <img data-lazy-src="${avatar}" onerror="this.onerror=null;this.src='https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile1/imgbed/2020/03/21/20200321213747.gif'" alt="${name}">
      <span>${name}</span>
    </div>
    </a>`
  }

  return {
    type: userStyle,
    template: style[userStyle] ? style[userStyle] : style.item
  }
}
const getLabelDescr = (_this, label) => {
  let desc = ''
  if (_this.labelDescr[label]) {
    desc = _this.labelDescr[label]
  }
  return desc
}
export { getInfo, getCustom, getImgCustom, getLabels, getBody, getLabelDescr }
