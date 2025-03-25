<template>
  <div
    class="container min-[900px]:hidden flex justify-between sticky bottom-0 z-30 bg-white border-t border-t-gray-900 hidden-print"
  >
    <nuxt-link to="/">
      <div
        class="flex-center flex-col gap-1 py-2.5 px-[4px] group cursor-pointer"
      >
        <svg
          class="icon-home2"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            class="path1"
            d="M20.8603 8.37009L13.9303 2.83009C12.8603 1.97009 11.1303 1.97009 10.0703 2.82009L3.14027 8.37009C2.36027 8.99009 1.86027 10.3001 2.03027 11.2801L3.36027 19.2401C3.60027 20.6601 4.96027 21.8101 6.40027 21.8101H17.6003C19.0303 21.8101 20.4003 20.6501 20.6403 19.2401L21.9703 11.2801C22.1303 10.3001 21.6303 8.99009 20.8603 8.37009ZM12.0003 15.5001C10.6203 15.5001 9.50027 14.3801 9.50027 13.0001C9.50027 11.6201 10.6203 10.5001 12.0003 10.5001C13.3803 10.5001 14.5003 11.6201 14.5003 13.0001C14.5003 14.3801 13.3803 15.5001 12.0003 15.5001Z"
            fill="#F62559"
          />
          <path
            d="M12 15.5C10.62 15.5 9.5 14.38 9.5 13C9.5 11.62 10.62 10.5 12 10.5C13.38 10.5 14.5 11.62 14.5 13C14.5 14.38 13.38 15.5 12 15.5Z"
            fill="white"
          />
        </svg>
        <p
          class="text-gray-200 text-[10px] mt-px font-medium text-center group-hover:text-black transition-300"
        >
          {{ $t('main') }}
        </p>
      </div>
    </nuxt-link>

    <nuxt-link to="/products/categories">
      <div class="flex-center flex-col gap-1 py-2.5 px-1 group cursor-pointer">
        <span
          class="icon-catalog icon text-2xl text-gray-200 group-hover:text-black transition-300"
        />
        <p
          class="text-gray-200 text-[10px] mt-px font-medium group-hover:text-black text-center transition-300"
        >
          {{ $t('catalog') }}
        </p>
      </div>
    </nuxt-link>

    <nuxt-link to="/my-orders">
      <div
        class="flex-center relative flex-col gap-1 py-2.5 px-1 group cursor-pointer"
      >
        <span
          class="icon-bag text-2xl icon text-gray-200 group-hover:text-black transition-300"
        />
        <span
          v-if="orderStore.ordersTotal"
          class="absolute top-1 right-1 h-[17px] bg-red rounded-full text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"
        >
          {{ orderStore.ordersTotal }}
        </span>
        <p
          class="text-gray-200 text-[10px] mt-px font-medium group-hover:text-black text-center transition-300"
        >
          {{ $t('my_orders') }}
        </p>
      </div>
    </nuxt-link>
    <nuxt-link to="/basket">
      <div
        class="flex-center relative flex-col py-2.5 gap-1 px-1 group cursor-pointer"
      >
        <span
          class="icon-basket-2 icon text-2xl text-gray-200 group-hover:text-black transition-300"
        />
        <span
          v-if="cartTotal > 0"
          class="absolute top-1 right-1 h-[17px] bg-red rounded-full text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"
        >
          {{ cartTotal }}
        </span>
        <p
          class="icon text-gray-200 text-[10px] mt-px font-medium group-hover:text-black text-center transition-300"
        >
          {{ $t('basket') }}
        </p>
      </div>
    </nuxt-link>

    <nuxt-link to="/profile">
      <div class="flex-center flex-col py-2.5 gap-1 px-1 group cursor-pointer">
        <span
          class="icon-user-circle icon text-2xl text-gray-200 group-hover:text-black transition-300"
        />
        <p
          class="text-gray-200 text-[10px] mt-px font-medium group-hover:text-black text-center transition-300"
        >
          {{ $t('profile') }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '~/store/index'
import { useOrderStore } from '~/store/order'
const store = useStore()
const orderStore = useOrderStore()
orderStore.getCartTotal()
let cartTotal = computed(() => orderStore.getCartTotal())
function toggleMenu() {
  store.toggleMenu(true)
}
</script>
<style>
.router-link-active p {
  @apply !text-red;
}

.router-link-active div .icon {
  @apply !text-red;
}
.router-link-active .icon-home2 .path1 {
  fill: #f62559 !important;
}
.icon-home2 {
  color: red;
}

.group-hover:hover .icon-home2 {
  color: black;
}

.icon-home2 .path1 {
  fill: #9e9ea5;
}
</style>
