<template>
  <div class="container">
    <n-card closable @close="handleClose" title="添加友链">
      <div v-if="isLogin">
        <div class="preview">
          <card-friend-item
            v-if="formData.theme.cardStyle === 'card'"
            :friend="formData"
          />
          <common-friend-item
            v-if="
              formData.theme.cardStyle === 'item' || !formData.theme.cardStyle
            "
            :friend="formData"
          />
        </div>
        <n-tabs default-value="tab1" justify-content="space-evenly" type="line">
          <n-tab-pane name="tab1" tab="基础数据（必填）">
            <n-form
              :model="formData"
              ref="formRef"
              label-placement="top"
              :label-width="160"
              :disabled="hasFriendInfo"
              :style="{
                maxWidth: '640px',
                margin: '0 auto'
              }"
              :rules="formRules"
            >
              <n-form-item label="友链标题" path="name">
                <n-input v-model:value="formData.name" placeholder="输入姓名" />
              </n-form-item>
              <n-form-item label="友链描述" path="description">
                <n-input
                  v-model:value="formData.description"
                  placeholder="输入友链描述"
                />
              </n-form-item>

              <n-form-item label="友链链接" path="link">
                <n-input
                  v-model:value="formData.link"
                  placeholder="输入友链链接"
                />
              </n-form-item>

              <n-form-item label="友链头像" path="avatar">
                <n-input
                  v-model:value="formData.avatar"
                  placeholder="输入友链头像"
                />
              </n-form-item>

              <n-form-item label="友链标签" path="tag">
                <n-select
                  v-model:value="formData.tag"
                  filterable
                  placeholder="选择友链标签"
                  :options="tagSelect"
                  :loading="tagloading"
                  clearable
                  remote
                />
              </n-form-item>

              <n-form-item label="From" path="from">
                <n-input
                  v-model:value="formData.from"
                  placeholder="友链来自"
                  disabled
                />
              </n-form-item>
              <n-form-item label="To" path="to">
                <n-input
                  v-model:value="formData.to"
                  placeholder="友链去往"
                  disabled
                />
              </n-form-item>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="theme" tab="个性设置（非必填）">
            <n-form
              :model="formData"
              ref="formThemeRef"
              label-placement="top"
              :label-width="160"
              :disabled="hasFriendInfo"
              :style="{
                maxWidth: '640px',
                margin: '0 auto'
              }"
            >
              <n-form-item label="边框类型" path="theme.borderStyle">
                <n-input
                  v-model:value="formData.theme.borderStyle"
                  placeholder="Diy边框类型"
                />
              </n-form-item>
              <n-form-item label="标题颜色" path="theme.titleColor">
                <n-color-picker v-model:value="formData.theme.titleColor" />
              </n-form-item>

              <n-form-item label="描述颜色" path="theme.descriptionColor">
                <n-color-picker
                  v-model:value="formData.theme.descriptionColor"
                />
              </n-form-item>

              <n-form-item label="边框动画" path="theme.boderAnimation">
                <div style="width: 100%">
                  <n-input
                    v-model:value="formData.theme.boderAnimation"
                    placeholder="Diy边框动画"
                  />
                  <div class="tips">
                    内置动画头像：link-custom(呼吸灯) link-custom1(霓虹灯)
                    borderFlash(闪烁)
                  </div>
                </div>
              </n-form-item>

              <n-form-item label="头像动画" path="theme.avatarAnimation">
                <div style="width: 100%">
                  <n-input
                    v-model:value="formData.theme.avatarAnimation"
                    placeholder="Diy头像动画"
                  />
                  <div class="tips">
                    内置动画头像：auto-rotate-left(左旋转)
                    auto-rotate-right(右旋转)
                  </div>
                </div>
              </n-form-item>

              <n-form-item label="选择卡片类型" path="theme.cardStyle">
                <n-input
                  v-model:value="formData.theme.cardStyle"
                  placeholder="选择卡片类型"
                />
              </n-form-item>

              <n-form-item label="屏幕截图" path="theme.screenshot">
                <n-input
                  v-model:value="formData.theme.screenshot"
                  placeholder="自定义屏幕截图地址"
                />
              </n-form-item>
              <n-form-item label="其他变量" path="theme.variable">
                <div style="width: 100%">
                  <n-input
                    v-model:value="formData.theme.variable"
                    placeholder="定义其他css变量"
                    type="textarea"
                  />
                  <div class="tips">
                    <div>
                      格式：【变量名:变量值;】
                      切记不要忘记结尾分号以及键与值之间的冒号。符合使用英文符号！！！
                    </div>
                    <div>primary-color:red; 主颜色设置为红色</div>
                    <div>pimary-avatar-hover:180deg; 鼠标悬停头像旋转角度</div>
                    <div>primary-hover-color:red; 鼠标悬停背景颜色</div>
                  </div>
                </div>
              </n-form-item>
            </n-form>
          </n-tab-pane>
        </n-tabs>
        <div style="text-align: center">
          <n-button
            style="max-width: 640px"
            type="primary"
            @click="submitFriend"
            v-if="!hasFriendInfo"
            >提交</n-button
          >
          <div v-if="hasFriendInfo">
            <p>
              您已提交友链，当前状态
              <span :style="{ color: statusText.color }">{{
                statusText.text
              }}</span>
              ，本页暂不支持修改信息，如需修改请前往
              <a
                href="https://kkadmin.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                >后台管理</a
              >
            </p>
            <p>初始账号为您首次第三方登录账号的用户名，密码为：123456</p>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center">
        <n-button
          style="max-width: 640px; background: black; color: white"
          @click="goToGithubAuth"
          >GitHub一键授权</n-button
        >
        <n-button
          style="max-width: 640px; background: #c71d23; color: white"
          @click="goToGiteeAuth"
          >Gitee一键授权</n-button
        >
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import {
  NCard,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NInput,
  NColorPicker,
  NSelect,
  NButton
} from 'naive-ui'
import commonFriendItem from '@/components/friend-style/common'
import cardFriendItem from '@/components/friend-style/card'
import { computed, inject, onMounted, ref } from 'vue'
import { initOptions } from '@/types/parameter'
import { request } from '@/http'
import { useMessage } from 'naive-ui'
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = decodeURIComponent(window.location.search).substring(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
const emit = defineEmits(['close'])
const options = inject('option') as initOptions
const handleClose = () => {
  emit('close', () => {})
}
const message = useMessage()
const formRef = ref<any>(null)
const formThemeRef = ref<any>(null)
const tagloading = ref<boolean>(false)
const friendStatus = ref<null | string>(null)
const formData = ref({
  /**
   * 友链标题
   */
  name: '',
  /**
   * 友链描述
   */
  description: '',
  /**
   * 友链头像
   */
  avatar: '',
  /**
   * 友链标题
   */
  link: '',
  /**
   * 友链标签
   */
  tag: '',
  /**
   * 友链主题
   */
  theme: {
    borderStyle: '1px solid #000',
    titleColor: 'rgb(76, 73, 72)',
    descriptionColor: 'rgb(76, 73, 72)',
    boderAnimation: 'borderFlash 0s infinite alternate',
    avatarAnimation: 'auto-rotate-left 1s linear infinite',
    cardStyle: 'item',
    variable: '',
    // variable:
    //   'primary-color:red;\npimary-avatar-hover:180deg;\nprimary-hover-color:red;',
    screenshot: ''
  },
  from: '',
  to: ''
})
const formRules = ref({
  /**
   * 友链标题
   */
  name: [
    {
      trigger: ['blur'],
      required: true,
      message: '请输入友链标题'
    }
  ],
  /**
   * 友链描述
   */
  description: [
    {
      trigger: ['blur'],
      required: true,
      message: '请输入友链描述'
    }
  ],
  /**
   * 友链头像
   */
  avatar: [
    {
      trigger: ['blur'],
      required: true,
      message: '请输入友链头像'
    }
  ],
  /**
   * 友链标题
   */
  link: [
    {
      trigger: ['blur'],
      required: true,
      message: '请输入友链链接'
    }
  ],
  /**
   * 友链标签
   */
  tag: [
    {
      trigger: ['blur'],
      required: true,
      message: '请选择友链标签'
    }
  ],

  from: [
    {
      trigger: ['blur'],
      required: true,
      message: '您还未获取您的Id'
    }
  ],
  to: [
    {
      trigger: ['blur'],
      required: true,
      message: '该用户初始化没有设置Id'
    }
  ]
})
const isLogin = ref<boolean>(false)
const tagSelect = ref<any[]>([])
// 是否提交过友链
const hasFriendInfo = ref<boolean>(false)
const statusText = computed(() => {
  let text = ''
  let color = ''
  switch (friendStatus.value) {
    case '0':
      text = '审核通过'
      color = '#18a058'
      break
    case '1':
      text = '等待审核'
      color = '#f0a020'
      break
    case '2':
      text = '已屏蔽（自己想想为啥）'
      color = '#d03050'
      break
  }
  return { text, color }
})

const goToGithubAuth = () => {
  const current = window.location.href
  window.location.href =
    'https://github.com/login/oauth/authorize?client_id=Iv1.1a4e5a689816a636&type=github&redirect_uri=' +
    encodeURIComponent(current)
}
const goToGiteeAuth = () => {
  const current = 'https://www.antmoe.com/friends-beta/?type=gitee'
  window.location.href =
    'https://gitee.com/oauth/authorize?client_id=a6149c6245d6a7144c576c96fc78b28723244b7be2e3ca325f76e7f89755e1c5&' +
    'redirect_uri=' +
    encodeURIComponent(current) +
    '&response_type=code'
}
onMounted(async () => {
  formData.value.to = options.user
  const code = GetQueryString('code')
  const type = GetQueryString('type')
  if (code && !isLogin.value) {
    let userToken
    if (type === 'gitee') {
      userToken = await request(
        options.api + '/api/user/oauth/gitee?code=' + code
      )
    } else {
      userToken = await request(
        options.api + '/api/user/oauth/github?code=' + code
      )
    }
    if (userToken.data.token) {
      localStorage.setItem('xkfriendtoken', userToken.data.token)
      formData.value.from = userToken.data.userId
      isLogin.value = true
    }
  }
  const localToken = localStorage.getItem('xkfriendtoken')
  const userId = localStorage.getItem('xkfrienduserid')
  if (localToken) {
    try {
      let fromId
      if (!userId) {
        fromId = await request(options.api + '/api/user/id')
      } else {
        fromId = { data: { id: userId } }
      }
      if (fromId.data.id) {
        formData.value.from = fromId.data.id
        // isLogin.value = true
        localStorage.setItem('xkfrienduserid', fromId.data.id)
      } else {
        message.error('获取用户id失败啦！')
      }
    } catch (e) {
      message.error('当前token已失效，添加友链需要重新获取哦！')
    }
  } else {
    localStorage.removeItem('xkfriendtoken')
  }

  if (formData.value.from && formData.value.to) {
    let friend
    try {
      friend = await request(
        options.api +
          `/api/friend?from=${formData.value.from}&to=${formData.value.to}`
      )
      isLogin.value = true
    } catch (e: any) {
      if (e.code === 401) {
        localStorage.removeItem('xkfriendtoken')
      }
    }
    if (friend.data) {
      const {
        avatar,
        description,
        from,
        link,
        name,
        status,
        tag,
        theme,
        to,
        _id
      } = friend.data
      // 存在数据
      formData.value.avatar = avatar
      formData.value.description = description
      formData.value.from = from
      formData.value.link = link
      formData.value.name = name
      formData.value.tag = tag
      formData.value.theme = theme
      formData.value.to = to
      friendStatus.value = status
      hasFriendInfo.value = true
    } else {
      tagloading.value = true
      let res
      try {
        res = await request(
          options.api + '/api/friend/tag?userId=' + options.user
        )
      } catch (e) {
        console.log(e, 'tag')
      }
      console.log(res, 'tag,res')

      res.data.forEach((item) => {
        tagSelect.value.push({
          label: item.name,
          value: item._id
        })
      })
      tagloading.value = false
    }
  }
})
const submitFriend = async () => {
  let formValidateStatus, formThemeValidateStatus
  try {
    formValidateStatus = await formRef.value?.validate()
    formThemeValidateStatus = await formThemeRef.value?.validate()
  } catch (e) {
    // message.error('请检查必填项')
  }

  if (formValidateStatus || formThemeValidateStatus) {
    message.error('请检查必填项')
  } else {
    let result
    try {
      result = await request(
        options.api + '/api/friend/add',
        JSON.stringify(formData.value),
        'post'
      )

      if (result.code === 0) {
        message.success('提交成功！')
      } else {
        message.error(result.message)
      }
    } catch (e) {
      message.error('提交失败！')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.42);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  pointer-events: all;
  transition: all 0.1s ease;
  z-index: 998;
  .preview {
    display: flex;
    justify-content: center;
  }
}
.tips {
  color: #999;
  font-size: 12px;
}
</style>
