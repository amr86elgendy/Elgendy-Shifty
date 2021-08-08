import { createContext, useContext, useEffect, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_DISPLAYED_DATE':
      return { ...state, displayedDate: action.payload };
    case 'TOGGLE_POPUP':
      return { ...state, openPopup: !state.openPopup };
      case 'SET_EMPLOYERS':
        return { ...state, employers: action.payload }
    case 'ADD_NEW_EMPLOYER':
      return { ...state, employers: [...state.employers, action.payload] };
    case 'REMOVE-EMPLOYER':
      return { ...state, employers: action.payload };
    default:
      return state;
  }
};

// initial state
const initialState = {
  sidebarOpen: false,
  openPopup: false,
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

  useEffect(() => {
    if (localStorage.getItem('employers')) {
      dispatch({
        type: 'SET_EMPLOYERS',
        payload: JSON.parse(localStorage.getItem('employers')),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employers', JSON.stringify(state.employers));
  }, [state.employers]);

  return (
    <AppContext.Provider value={{ ...state, dispatch, thisMonth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
