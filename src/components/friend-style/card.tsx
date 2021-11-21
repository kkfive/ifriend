import { defineComponent, PropType, ref, computed } from 'vue'
import { friendItem } from '@/types/friend'
import styles from './style/card.module.scss'
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
        <div class={styles['card-friend']} onClick={jump}>
          <div class={`${styles.wrapper}`}>
            <img src={friend.body.screenshot} />
          </div>
          <div class={styles.info}>
            <img v-lazy={friend.body.avatar} />
            <span>{friend.body.name}</span>
          </div>
        </div>
      )
    }
  }
})
