import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  Toolbar,
  useMediaQuery,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Search } from '@material-ui/icons';
import { useAppContext } from '../context';

const SearchAndAdd = () => {
  const matches = useMediaQuery('(min-width:800px)');
  const useStyle = makeStyles((theme) => ({
    searchInput: {
      display: matches ? 'inline-flex' : 'none',
      width: '75%',
    },
    btnRoot: {
      position: 'absolute',
      right: '10px',
      margin: theme.spacing(0.5),
    },
  }));
  const classes = useStyle();
  const { dispatch, filterText } = useAppContext();

  return (
    <Toolbar>
      <TextField
        variant='outlined'
        label='Search Employees By Name'
        value={filterText}
        onChange={(e) =>
          dispatch({ type: 'UPDATE_FILTER_TEXT', payload: e.target.value })
        }
        classes={{ root: classes.searchInput }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        disableElevation
        // variant='outlined'
        size='large'
        color='primary'
        onClick={() => dispatch({ type: 'TOGGLE_POPUP' })}
        classes={{ root: classes.btnRoot }}
      >
        Add New
      </Button>
    </Toolbar>
  );
};

export default SearchAndAdd;
