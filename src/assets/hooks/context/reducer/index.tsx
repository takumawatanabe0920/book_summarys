export const initialState = {
  // グローバルステイトの初期値
  currentUser: {
    age: 99,
    name: "DefaultName",
    occupation: "DefaultOccupation",
    spouse: false
  }
}

export type State = typeof initialState // グローバルステイトの型定義

export interface IAction {
  // グローバルステイトの更新を行わせる指示の型定義
  type: "setUser"
  payload: {
    name: string
    age: number
    occupation: string
    spouse: boolean
  }
}

export const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case "setUser":
      return {
        // グローバルステイトの更新を行わせる指示のtypeが'setUser'の時の処理
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}
