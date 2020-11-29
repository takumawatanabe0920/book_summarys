import * as React from "react"

import { IAction, initialState, reducer, State } from "./reducer"

const { createContext, useContext, useReducer } = React

// グローバルステイトの初期値を引数として取り、state用のcontextを生成
const stateContext = createContext(initialState)
// IAction型の引数を取る空の関数を初期値とし、dispatch用のcontextを生成
const dispatchContext = createContext((() => true) as React.Dispatch<IAction>)

export const Provider: React.FunctionComponent = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <dispatchContext.Provider value={dispatch}>
      {" "}
      {/* dispatch用contextにdispatchを設置 */}
      <stateContext.Provider value={state}>
        {" "}
        {/* state用contextにstateを設置 */}
        {props.children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  )
}

// dispatch関数を利用できるようにする
export const useDispatch = () => {
  return useContext(dispatchContext)
}

// グローバルステイトを利用できるようにする
export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(stateContext)
  return state[property]
}
