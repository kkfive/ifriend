import { initOptions } from './types/parameter'
import { createApp, provide } from 'vue'
import App from './view/App.vue'
declare global {
  interface Window {
    xkFriend: any
  }
}

const render = (options: initOptions) => {
  const app = createApp(App)
  app.provide('option', options)
  return app.mount(options.el || '#xk-friend')
}

async function init(options: initOptions = { url: '' }) {
  return render(options)
}
export default init

export { init }

if (import.meta.env.DEV) {
  init({
    el: '#app',
    url: 'https://unpkg.com/myfriend@1.6.22646503225/friend.json'
  })
}
