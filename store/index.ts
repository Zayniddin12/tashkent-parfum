import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        openMenu: false,
    }),
    actions: {
        toggleMenu(link: boolean) {
            this.openMenu = link
        },
    },
})
