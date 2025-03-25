import exp from 'constants'

export const tabList = [
  {
    id: 2,
    name: 'my_cards',
    icon: 'card',
    link: { name: 'profile-cards', path: '/profile/cards' },
  },
  {
    id: 3,
    name: 'settings',
    icon: 'settings',
    link: { name: 'profile-settings', path: '/profile/settings' },
  },
]

export const tabListSecond = [
  {
    id: 4,
    name: 'instruction',
    icon: 'document-text',
    link: { name: 'profile-instruction', path: '/profile/instruction' },
  },
  {
    id: 5,
    name: 'terms_of_use',
    icon: 'check-tick',
    link: { name: 'profile-terms-of-use', path: '/profile/terms-of-use' },
  },
  {
    id: 6,
    name: 'balance_bonus',
    icon: 'stars-minimalistic',
    link: { name: 'profile-balance', path: '/profile/balance' },
  },
  {
    id: 7,
    name: 'help',
    icon: 'phone',
    link: { name: 'profile-help', path: '/profile/help' },
  },
  {
    id: 8,
    name: 'delete_account',
    icon: 'delete-account',
    link: { name: 'delete_account', path: '/profile/help' },
    noLink: true,
  },
]
