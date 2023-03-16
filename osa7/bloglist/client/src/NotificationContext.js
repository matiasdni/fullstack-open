import { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

const initialState = { message: null, type: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.message, type: action.notificationType };
    case 'CLEAR_NOTIFICATION':
      return { message: null, type: null };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
