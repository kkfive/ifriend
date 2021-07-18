import { initOptions } from './constant/parameter'
import { createApp } from 'vue'
import App from './view/App.vue'
declare global {
  interface Window {
    xkFriend: any
  }
}

const render = (options: initOptions) => {
  return createApp(App).mount(options.el || '#xk-friend')
}

async function init(options: initOptions = {}) {
  return render(options)
}
export default init

export { init }

if (import.meta.env.DEV) {
  init({
    el: '#app'
  })
}
