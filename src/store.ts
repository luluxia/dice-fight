import { create } from 'zustand'

interface Store {
  /** 当前页面 */
  page: string
  pageKey: number
  /** 更改页面 */
  changePage: (page: string) => void
  /** 选择的角色列表 */
  charList: [number, number, number]
  /** 加载角色列表 */
  loadCharList: () => void
  /** 设置角色列表 */
  setCharList: (id: number) => void
  /** 移除角色列表 */
  removeCharList: (id: number) => void
}

export const useStore = create<Store>(set => ({
  page: 'index',
  // page: 'game',
  pageKey: 0,
  changePage: (page: string) => set(state => {
    return { page, pageKey: state.pageKey + 1 }
  }),
  charList: [-1, -1, -1],
  loadCharList: () => set(() => {
    const charList = JSON.parse(localStorage.getItem('charList') || '[-1,-1,-1]')
    return { charList }
  }),
  setCharList: (id: number) => set(state => {
    const index = state.charList.indexOf(-1)
    state.charList[index] = id
    localStorage.setItem('charList', JSON.stringify(state.charList))
    return { charList: state.charList }
  }),
  removeCharList: (id: number) => set(state => {
    const index = state.charList.indexOf(id)
    state.charList[index] = -1
    localStorage.setItem('charList', JSON.stringify(state.charList))
    return { charList: state.charList }
  }),
}))

interface GameStore {
  /** 游戏状态 */
  status: string
  /** 更改游戏状态 */
  changeStatus: (status: string) => void
  /** 标题 */
  title: string
  /** 更改标题 */
  changeTitle: (title: string) => void
  /** 当前操作用户id */
  currentPlayer: string
  /** 变换当前操作用户id */
  changeCurrentPlayer: (currentPlayer: string) => void
  /** RPC */
  rpc: Set<string>
  /** 设置RPC */
  setRPC: (rpc: string) => void
}

let gameTitleTimer = 0

export const useGameStore = create<GameStore>(set => ({
  status: 'round-order',
  // status: 'round',
  changeStatus: (status: string) => set({ status }),
  title: '',
  changeTitle: (title: string) => {
    clearTimeout(gameTitleTimer)
    set({ title })
    gameTitleTimer = setTimeout(() => {
      set({ title: '' })
    }, 1000)
  },
  currentPlayer: '',
  changeCurrentPlayer: (currentPlayer: string) => set({ currentPlayer }),
  rpc: new Set(),
  setRPC: (rpc: string) => set(state => {
    state.rpc.add(rpc)
    return { rpc: state.rpc }
  })
}))

/** 先后手 */
interface RoundOrderStore {
  /** 是否允许投掷 */
  throwEnable: boolean
  setThrowEnable: (throwEnable: boolean) => void
  /** 对手 */
  opponent: {
    key: number
    point: number
    position: [number, number]
    rotate: number
  }
  updateOpponent: (opponent: any) => void
  /** 玩家 */
  player: {
    key: number
    point: number
    position: [number, number]
    rotate: number
  }
  updatePlayer: (player: any) => void
  reset: () => void
}

export const useRoundOrderStore = create<RoundOrderStore>(set => ({
  throwEnable: true,
  setThrowEnable: (throwEnable: boolean) => set({ throwEnable }),
  opponent: {
    key: 0,
    point: 0,
    position: [0, 0],
    rotate: 0
  },
  updateOpponent: (opponent: any) => set({ opponent }),
  player: {
    key: 0,
    point: 0,
    position: [0, 0],
    rotate: 0
  },
  updatePlayer: (player: any) => set({ player }),
  reset: () => set(() => ({
    opponent: {
      key: 0,
      point: 0,
      position: [0, 0],
      rotate: 0
    },
    player: {
      key: 0,
      point: 0,
      position: [0, 0],
      rotate: 0
    },
    throwEnable: true
  }))
}))

interface PlayerStore {
  /** ID */
  id: string
  /** 昵称 */
  nick: string
  /** 头像 */
  avatar: string
  /** 角色列表 */
  charList: number[]
  /** 是否准备 */
  ready: boolean
  /** 被禁用的角色ID */
  banId: number
  /** 选择的角色ID */
  pickId: number[]
  /** 当前血量 */
  hp: number
  /** 血量上限 */
  hpMax: number
  /** 护盾 */
  shield: number
  /** 发言 */
  message: {
    key: number
    type: string
    id: number
  }
  /** 设置 */
  set: (k: any, v: any) => void
  /** 重置 */
  reset: () => void
  setMessage: (message: any) => void
}

let playerMessageTimer = 0

export const usePlayerStore = create<PlayerStore>(set => ({
  id: '',
  nick: '',
  avatar: '',
  charList: [],
  ready: false,
  banId: -1,
  pickId: [],
  hp: 50,
  hpMax: 50,
  shield: 0,
  message: {
    key: 0,
    type: '',
    id: -1
  },
  set: (k: any, v: any) => set({ [k]: v }),
  reset: () => set(() => ({
    ready: false,
    hp: 50,
    hpMax: 50,
    shield: 0,
  })),
  setMessage: (message) => {
    clearTimeout(playerMessageTimer)
    const key = Math.random()
    set({ message: { key, ...message } })
    playerMessageTimer = setTimeout(() => {
      set({ message: { key: 0, type: '', id: -1 } })
    }, 2000)
  }
}))

let opponentMessageTimer = 0

export const useOpponentStore = create<PlayerStore>(set => ({
  id: '',
  nick: '',
  avatar: '',
  charList: [],
  ready: false,
  banId: -1,
  pickId: [],
  hp: 50,
  hpMax: 50,
  shield: 0,
  message: {
    key: 0,
    type: '',
    id: -1
  },
  set: (k: any, v: any) => set({ [k]: v }),
  reset: () => set(() => ({
    ready: false,
    hp: 50,
    hpMax: 50,
    shield: 0,
  })),
  setMessage: (message) => {
    clearTimeout(opponentMessageTimer)
    const key = Math.random()
    set({ message: { key, ...message } })
    opponentMessageTimer = setTimeout(() => {
      set({ message: { key: 0, type: '', id: -1 } })
    }, 2000)
  }
}))

interface RoundStore {
  dices: {
    id: number,
    index: number,
    key: number,
    type: string,
    point: number,
    position: [number, number],
    rotate: number,
    selected: boolean,
    used: boolean,
  }[]
  setDices: (dice: any) => void
  selectDice: (index: number) => void
  useDice: () => void
  selectedDicesPosition: [number, number][]
  setSelectedDicesPosition: (offset: [number, number][]) => void
  activeDelay: boolean
  setActiveDelay: (activeDelay: boolean) => void
  action: any
  setAction: (action: any) => void
  round: number
  setRound: (round: number) => void
  reset: () => void
}

export const useRoundStore = create<RoundStore>(set => ({
  dices: [],
  setDices: (dices) => set({ dices }),
  selectDice: (index: number) => set(state => ({
    dices: state.dices.map(dice => {
      if (dice.index === index) {
        dice.selected = !dice.selected
      }
      return dice
    })
  })),
  useDice: () => set(state => ({
    dices: state.dices.map(dice => {
      if (dice.selected) {
        dice.selected = false
        dice.used = true
      }
      return dice
    })
  })),
  selectedDicesPosition: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  setSelectedDicesPosition: (selectedDicesPosition: [number, number][]) => set({ selectedDicesPosition }),
  activeDelay: false,
  setActiveDelay: (activeDelay: boolean) => set({ activeDelay }),
  action: null,
  setAction: (action: any) => set({ action }),
  round: 3,
  setRound: (round: number) => set({ round }),
  reset: () => set(() => ({
    diceSort: [],
    dices: [],
    activeDelay: false,
    action: null,
    round: 3,
  })),
}))