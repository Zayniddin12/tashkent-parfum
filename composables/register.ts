import type {
  TAuthRegisterEntryPayload,
  TAuthRegisterError,
  TAuthRegisterResponse,
  TAuthRegisterVerifyPayload,
} from '~/types/auth'
import { deMask, formatPhoneNumber } from '~/helpers'
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from "~/store/order";
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const $toast = useToast()



export const useRegister = () => {
  const authStore = useAuthStore()
  const orderStore = useOrderStore()
  const { t: $t } = useI18n()
  const form = reactive({
    full_name: '',
    phone: '',
  })
  const loading = ref(false)
  const step = ref(1)
  const session = ref('')
  const signature = ref('')
  const errors = reactive({
    phone: false,
    otp: false,
    password: false,
  })

  const entrypoint = async (payload: TAuthRegisterEntryPayload) => {
    loading.value = true
    form.phone = deMask(payload.phone)
    form.full_name = payload.full_name
    errors.phone = false
    errors.otp = false
    try {
      const { error, data } = await useFetcher<
        { session: string },
        TAuthRegisterError
      >('account/registration/entrypoint/', {
        method: 'POST',
        body: {
          phone: form.phone,
        },
      })
      if (error) {
        const text = error?.data?.detail
        $toast.error(text)
        // $toast.value.error(text)
        errors.phone = true
      } else {
        session.value = data.session
        step.value = 2
        errors.phone = false
        $toast.success(
          $t('reset_password_code_sent_to', {
            phone: '\n+' + formatPhoneNumber('+998' + form.phone),
          })
        )
      }
    } catch (err) {}
    loading.value = false
  }

  const resend = async () => {
    return await entrypoint({ phone: form.phone, full_name: form.full_name })
  }

  const verify = async (code: string) => {
    loading.value = true
    errors.otp = false
    try {
      const { error, data } = await useFetcher<
        { signature: string },
        { detail: string }
      >('account/registration/verify/', {
        method: 'POST',
        body: <TAuthRegisterVerifyPayload>{
          code,
          phone: form.phone,
          session: session.value,
        },
      })
      if (error) {
        $toast.error(error.data?.detail || $t('an_error_occurred'))
        errors.otp = true
      } else {
        signature.value = data.signature
        step.value = 3
        errors.otp = false
      }
    } catch (err) {}
    loading.value = false
  }

  const completeRegister = async (password: string) => {
    loading.value = true
    errors.password = false
    const id = useCookie('visitorId')
    const obj = ref({
      'Fingerprint': id.value
    })
    try {
      const { error, data } = await useFetcher<
        TAuthRegisterResponse,
        { detail: string }
      >('account/registration/register/', {
        method: 'POST',
        body: {
          password,
          full_name: form.full_name,
          signature: signature.value,
        },
      })
      if (error) {
        $toast.error(error.data?.detail || $t('an_error_occurred'))
        errors.password = true
      } else {
        $toast.success($t('registered_successfully'))
        authStore.setTokens(data.token)
        await authStore.getUser()
        await orderStore.fetchCartProducts(obj.value)
        step.value = 4
        errors.password = false
      }
    } catch (err) {}
    loading.value = false
  }

  return {
    step,
    loading,
    entrypoint,
    form,
    errors,
    verify,
    completeRegister,
    resend,
  }
}
