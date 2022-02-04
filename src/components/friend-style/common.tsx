import { defineComponent, PropType, ref, computed } from 'vue'
import { FriendItem } from '@/types/friend'

import styles from './style/common.module.scss'
export default defineComponent({
  props: {
    friend: {
      // 代码
      type: Object as PropType<FriendItem>,
      required: false
    }
  },
  setup(props) {
    const { friend } = props
    if (!friend) return

    const jump = () => {
      window.open(friend.link)
    }
    const variable = computed(() => {
      if (!friend.theme.variable) return {}
      friend.theme.variable = friend.theme.variable.replace(/[\r\n]/g, '')
      const varibaleSplit1 = friend.theme.variable.split(';')
      const res = {}

      varibaleSplit1.forEach((item) => {
        if (!item) return
        if (item) {
          const temp = item.split(':')
          res['--' + temp[0]] = temp[1]
        }
      })

      return res
    })

    console.log(variable.value)

    return () => {
      return (
        <div
          class={styles['common-friend']}
          onClick={jump}
          title={friend.name}
          style={{
            ...variable.value,
            border: friend.theme.borderStyle || '',
            animation: friend.theme.boderAnimation || ''
          }}
        >
          <div class={friend.avatar ? styles.avatar : ''}>
            <img
              v-lazy={friend.avatar}
              style={{
                animation: friend.theme.avatarAnimation || ''
              }}
            />
          </div>
          <div class={styles['information']}>
            <div
              class={styles['information-title']}
              style={{
                color: friend.theme.titleColor
              }}
            >
              {friend.name}
            </div>
            <div
              class={styles['information-desc']}
              style={{
                color: friend.theme.descriptionColor
              }}
            >
              {friend.description}
            </div>
          </div>
        </div>
      )
    }
  }
})
