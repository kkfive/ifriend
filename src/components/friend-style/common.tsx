import { defineComponent, PropType, ref, computed } from 'vue'
import { friendItem } from '@/types/friend'
import styles from './style/common.module.scss'
export default defineComponent({
  props: {
    friend: {
      // 代码
      type: Object as PropType<friendItem>,
      required: false
    }
  },
  setup(props) {
    const { friend } = props
    if (!friend) return

    const jump = () => {
      window.open(friend.body.link)
    }
    return () => {
      return (
        <div
          class={styles['common-friend']}
          onClick={jump}
          title={friend.body.name}
        >
          <div class={styles.avatar}>
            <img v-lazy={friend.body.avatar} />
          </div>
          <div class={styles['information']}>
            <div class={styles['information-title']}>{friend.body.name}</div>
            <div class={styles['information-desc']}>{friend.body.descr}</div>
          </div>
        </div>
      )
    }
  }
})
