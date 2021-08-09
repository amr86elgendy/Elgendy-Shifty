import { Button, TableCell, TableRow } from "@material-ui/core";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import React from "react";

const TableHeader = () => {
  return (
    <TableRow>
      <TableCell>
        <Button endIcon={<SwapVertIcon color="action" />}>name</Button>
      </TableCell>
      <TableCell align="center">
        <Button
          startIcon={<RemoveIcon className="icon" color="error" />}
          endIcon={<AddIcon className="icon" color="primary" />}
        >
          Early Bird
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          startIcon={<RemoveIcon className="icon" color="error" />}
          endIcon={<AddIcon className="icon" color="primary" />}
        >
          Night Bird
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          startIcon={<RemoveIcon className="icon" color="error" />}
          endIcon={<AddIcon className="icon" color="primary" />}
        >
          W F H
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button>action</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableHeader;
