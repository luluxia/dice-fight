import { create } from 'zustand'

interface Store {
  /** 当前页面 */
  page: string
  pageKey: number
  /** 更改页面 */
  changePage: (page: string) => void
  /** 选择的角色列表 */
  charList: [number, number, number, number, number, number]
  /** 设置角色列表 */
  setCharList: (id: number) => void
  /** 移除角色列表 */
  removeCharList: (id: number) => void
}

export const useStore = create<Store>(set => ({
  page: 'index',
  pageKey: 0,
  changePage: (page: string) => set(state => {
    return { page, pageKey: state.pageKey + 1 }
  }),
  charList: [-1, -1, -1, -1, -1, -1],
  setCharList: (id: number) => set(state => {
    const index = state.charList.indexOf(-1)
    state.charList[index] = id
    return { charList: state.charList }
  }),
  removeCharList: (id: number) => set(state => {
    const index = state.charList.indexOf(id)
    state.charList[index] = -1
    return { charList: state.charList }
  })
}))

interface GameStore {
  /** 游戏状态 */
  status: 'round-order' | 'ban-pick' | 'round'
  /** 标题 */
  title: string
  /** 更改标题 */
  changeTitle: (title: string) => void
  set: (k: any, v: any) => void
}

let gameTitleTimer = 0

export const useGameStore = create<GameStore>(set => ({
  status: 'round-order',
  title: '',
  changeTitle: (title: string) => {
    clearTimeout(gameTitleTimer)
    set({ title })
    gameTitleTimer = setTimeout(() => {
      set({ title: '' })
    }, 1000)
  },
  set: (k: any, v: any) => set({ [k]: v })
}))