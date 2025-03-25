import type { ICheck } from '~/types/order'
import { useOrderStore } from '~/store/order'
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()
export const useCheckCreator = () => {
  const checkList = ref<ICheck>()
  const calcError = ref(false)
  const calcLoading = ref(true)
  const orderStore = useOrderStore()
  const { t: $t, locale } = useI18n()
  const calcPrice = async (params: object) => {
    calcLoading.value = true
    calcError.value = false
    orderStore.setCalcLoader(calcLoading.value)
    orderStore.setLocationError(calcError.value)
    try {
      const { data, error } = await useFetcher<ICheck>(
        `orders/order-price-calculator/`,
        {
          method: 'POST',
          body: {
            ...params,
          },
        }
      )
      if (data) {
        checkList.value = { ...data }
        orderStore.setCheckPrice(data)
        setTimeout(() => {
          calcLoading.value = false
          orderStore.setCalcLoader(calcLoading.value)
          orderStore.setLocationError(calcError.value)
        }, 100)
      }
      if (error) {
        toast.error(error.data?.detail || $t('an_error_occurred'))
        calcError.value = true
        setTimeout(() => {
          calcLoading.value = false
          orderStore.setCalcLoader(calcLoading.value)
          orderStore.setLocationError(calcError.value)
        }, 100)
      }
    } catch (err) {
      calcError.value = true
      setTimeout(() => {
        calcLoading.value = false
        orderStore.setCalcLoader(calcLoading.value)
        orderStore.setLocationError(calcError.value)
      }, 100)
    }
  }
  return {
    calcPrice,
    calcError,
    checkList,
    calcLoading,
  }
}
