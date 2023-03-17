import { createContext, useReducer } from 'react'

export const UserContext = createContext()

const initialState = {
  user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return { ...state, user: action.user }
  case 'CLEAR_USER':
    return { user: null }
  default:
    return state
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => initialState
  )

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
