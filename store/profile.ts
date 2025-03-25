import type {
  TChangeNumberStepOne,
  TEditProfile,
  TFaqList,
} from '~/types/profile'
import { useAuthStore } from '~/store/auth'
import type { TUser } from '~/types/auth'
import type {
  TChangePassword,
  TChangePhone,
  TChangePhoneVerify,
} from '~/types/changePassword'
import type { TProducts } from '~/types/products'

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: {} as TEditProfile,
    changePassword: {} as TChangePassword,
    faqList: {} as TFaqList,
    faqListLoading: true,
  }),
  actions: {
    updateProfile(payload: TEditProfile) {
      const authStore = useAuthStore()
      return new Promise((resolve, reject) => {
        useFetcher<TUser>('account/edit/', {
          method: 'PUT',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              this.profile = res.data
              authStore.user = { ...authStore.user, ...res.data }
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    updatePassword(payload: TChangePassword) {
      return new Promise((resolve, reject) => {
        useFetcher<TUser>('account/password-change/', {
          method: 'PUT',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateNumber(payload: TChangePhone) {
      return new Promise((resolve, reject) => {
        useFetcher<TChangeNumberStepOne>('account/change-phone/', {
          method: 'POST',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateNumberVerify(payload: TChangePhoneVerify) {
      return new Promise((resolve, reject) => {
        useFetcher<TChangeNumberStepOne>('account/change-phone/verify/', {
          method: 'POST',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getFaqList() {
      return new Promise((resolve, reject) => {
        useFetcher<TFaqList>('common/faq/')
          .then((res) => {
            this.faqList = res
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.faqListLoading = false))
      })
    },
  },
})
