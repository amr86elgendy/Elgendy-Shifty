import { IconButton, TableCell, TableRow } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { useAppContext } from "../context";

const EmployerItem = ({ department, email, fullName, id, mobile, idx }) => {
  const { activeEmp, dispatch } = useAppContext();
console.log(activeEmp);
  const handleEdit = (id) => {
    dispatch({ type: "TOGGLE_POPUP" });
    dispatch({ type: "SET_EMPLOYER_TO_EDIT", payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_EMPLOYER", payload: id });
  };

  return (
    <TableRow
      key={id}
      selected={activeEmp === idx}
      onClick={() =>
        dispatch({ type: "SET_ACTIVE_EMP", payload: idx })
      }
      hover
    >
      <TableCell>
        {fullName} <br /> {department}
      </TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">{mobile}</TableCell>
      <TableCell align="center">{department}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => handleEdit(id)}>
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton onClick={() => handleRemove(id)}>
          <CloseIcon fontSize="small" color="secondary" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EmployerItem;
