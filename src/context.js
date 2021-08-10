import { createContext, useContext, useEffect, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, openSidebar: !state.openSidebar };
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
    case 'TOGGLE_FORM_POPUP':
      return { ...state, openForm: !state.openForm };
    case 'SET_EMPLOYERS':
      return { ...state, employers: action.payload };
    case 'ADD_NEW_EMPLOYER':
      return { ...state, employers: [...state.employers, action.payload] };
    case 'REMOVE_EMPLOYER':
      const employersAfterRemoving = state.employers.filter(
        (emp) => emp.id !== action.payload
      );
      return { ...state, employers: [...employersAfterRemoving] };
    case 'UPDATE_FILTER_TEXT':
      return { ...state, filterText: action.payload };
    case 'SET_ACTIVE_EMP':
      return {
        ...state,
        activeEmp:
          state.employers.length === 0
            ? 0
            : action.payload >= state.employers.length
            ? state.employers.length - 1
            : action.payload,
      };
    default:
      return state;
  }
};

// initial state
const initialState = {
  openSidebar: false,
  openForm: false,
  displayedDate: new Date().toDateString(),
  employerEdited: null,
  employers: [],
  filterText: '',
  activeEmp: 0,
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
