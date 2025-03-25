import { usePaymentStore } from '~/store/payment'

export const GlobalConfig = {
  paymentSystems: {
    '8600': 'uzcard',
    '5614': 'uzcard',
    '9860': 'humo',
    '5440': 'mastercard',
    '4200': 'visa',
  },
  appsLinks: {
    appStore: 'https://apps.apple.com/uz/app/toshkent-parfum/id6458222909',
    googlePlay:
      'https://play.google.com/store/apps/details?id=uz.tashkentparfum.tashkentparfumapp&pli=1',
  },
}
export const OrderTabList = [
  {
    link: {
      path: '/my-orders',
    },
    name: 'active_orders',
    icon: 'delivery',
  },
  {
    link: {
      path: '/my-orders/history',
    },
    name: 'history_of_orders',
    icon: 'history',
  },
]
export const orderFormStatus = [
  {
    id: 1,
    title: 'delivery_address',
    icon: 'location',
  },
  {
    id: 2,
    title: 'contact_detail',
    icon: 'user',
  },
  {
    id: 3,
    title: 'payment',
    icon: 'money-wallet',
  },
]
export const orderStatus = [
  {
    id: 1,
    title: 'order_approved',
    icon: 'checklist',
  },
  {
    id: 2,
    title: 'on_way',
    icon: 'box',
  },
  {
    id: 3,
    title: 'delivered',
    icon: 'confetti',
  },
]
