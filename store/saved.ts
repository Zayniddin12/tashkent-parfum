import type {TProducts, TProduct, TPayload } from '~/types/products'

export const useSavedStore = defineStore('savedStore', {
  state: () => ({
    saved: [] as TProduct[],
    total: 0,
    totalPages: 0,
    loading: true,
    loadingMore: false
  }),
  actions: {
    getProducts() {
      return this.saved
    },
    fetchSavedProducts(payload?: TPayload) {
      this.loadingMore = true
      return new Promise((resolve, reject) => {
        useFetcher<TProducts>('products/likes/', {
          method: 'GET',
          params: {
            size: 12,
            ...payload
          },
        })
          .then((res) => {
            this.total = res?.data?.total
            this.totalPages = res?.data?.total_pages
            if(payload?.page > 1) {
              this.saved = [...this.saved, ...res.data.results]
            } else {
              this.saved = res.data.results
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
              this.loadingMore = false
            }, 500)
          })
      })
    },
    removeSavedProduct(e: number) {
      if(this.saved?.length) {
        this.saved = this.saved?.filter((el: TProduct) => el?.id !== e)
        this.total--
      }
    }
  },
})
