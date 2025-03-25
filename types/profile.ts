import { str } from '@storybook/docs-tools'

export interface TEditProfile {
  full_name: string
  address: string
  avatar_src: {
    [key: string]: string
  }
}

export interface TChangeNumberStepOne {
  data: {
    phone: string
    signature: string
  }
}

export interface TFaqList {
  id: number
  question: string
  answer: string
  created_at: string
  updated_at: string
}
