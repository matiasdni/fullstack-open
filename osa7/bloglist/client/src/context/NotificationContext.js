import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const initialState = { message: null, type: null, style: null }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return (state = {
        message: action.message,
        type: action.type,
        style: action.style,
      })
    case 'CLEAR_NOTIFICATION':
      return (state = initialState)
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => initialState
  )

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}
