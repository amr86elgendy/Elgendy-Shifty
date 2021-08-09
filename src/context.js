import { createContext, useContext, useEffect, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_DISPLAYED_DATE':
      return { ...state, displayedDate: action.payload };
    case 'SET_EMPLOYER_TO_EDIT':
      const emp = state.employers.find((one) => one.id === action.payload);
      return { ...state, employerEdited: emp };
    case 'REMOVE_EMPLOYER_FROM_EDIT':
      return { ...state, employerEdited: null };
    case 'SET_EMPLOYERS_AFTER_EDIT':
      const employersAfterEdit = state.employers.map((emp) =>
        emp === state.employerEdited ? action.payload : emp
      );
      return {
        ...state,
        employers: [...employersAfterEdit],
        employerEdited: null,
      };
    case 'TOGGLE_POPUP':
      return { ...state, openPopup: !state.openPopup };
    case 'SET_EMPLOYERS':
      return {
        ...state,
        employers: action.payload,
        filteredEmployers: action.payload,
      };
    case 'ADD_NEW_EMPLOYER':
      return {
        ...state,
        employers: [...state.employers, action.payload],
        filteredEmployers: [...state.employers, action.payload],
      };
    case 'REMOVE_EMPLOYER':
      const employersAfterRemoving = state.employers.filter(
        (emp) => emp.id !== action.payload
      );
      return {
        ...state,
        employers: [...employersAfterRemoving],
        filteredEmployers: [...employersAfterRemoving],
      };
    case 'UPDATE_FILTER_TEXT':
      return { ...state, filterText: action.payload };
    case 'FILTER_EMPLOYERS':
      const { employers, filterText } = state;
      let arr = [...employers];
      arr = arr.filter((emp) =>
        emp.fullName.toLowerCase().startsWith(filterText.toLowerCase())
      );
      return { ...state, filteredEmployers: arr };
    default:
      return state;
  }
};

// initial state
const initialState = {
  sidebarOpen: false,
  openPopup: false,
  displayedDate: new Date().toDateString(),
  employerEdited: null,
  employers: [],
  filteredEmployers: [],
  filterText: '',
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

  useEffect(() => {
    dispatch({ type: 'FILTER_EMPLOYERS' });
  }, [state.filterText]);

  return (
    <AppContext.Provider value={{ ...state, dispatch, thisMonth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
