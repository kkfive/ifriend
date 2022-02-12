import { defineComponent, PropType, ref, computed } from 'vue'
import { FriendItem } from '@/types/friend'
import styles from './style/card.module.scss'
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
    return () => {
      return (
        <div class={styles['card-friend']} onClick={jump}>
          <div class={`${styles.wrapper}`}>
            <img
              src={
                friend.theme.siteImage ||
                `https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/${friend.link}`
              }
            />
          </div>
          <div class={styles.info}>
            <img v-lazy={friend.avatar} />
            <span>{friend.name}</span>
          </div>
        </div>
      )
    }
  }
})
