import { createContext, useContext, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_DISPLAYED_DATE':
      return { ...state, displayedDate: action.payload };
    case 'ADD_EMPLOYER':
      return { ...state, employers: action.payload };
    case 'REMOVE-EMPLOYER':
      return { ...state, employers: action.payload };
    default:
      return state;
  }
};

// initial state
const initialState = {
  sidebarOpen: false,
  displayedDate: new Date().toDateString(),
  employers: [],
};

// create context
const AppContext = createContext({});

// context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thisMonth =
    new Date(state.displayedDate).getMonth() === new Date().getMonth();

  return (
    <AppContext.Provider value={{ ...state, dispatch, thisMonth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};