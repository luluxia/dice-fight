import { RPC as rpc, RPCCallback } from 'playroomkit'
const registerList = new Set<string>()
export const RPC = {
  call: rpc.call,
  register: (name: string, callback: RPCCallback) => {
    if (registerList.has(name)) {
      return
    }
    console.log('register', name)
    rpc.register(name, callback)
    registerList.add(name)
  },
  Mode: rpc.Mode,
}