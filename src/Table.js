import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TextField from "material-ui/TextField";

const row = (
  element,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return (
    <TableRow key={`row-${i}`} selectable={false}>
      {header.map((headerElement, k) => (
        <TableRowColumn key={`column-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={headerElement.propName}
              onChange={(e) => handleChange(e, headerElement.propName, i)}
              value={element[headerElement.propName]}
            />
          ) : (
            element[headerElement.propName]
          )}
        </TableRowColumn>
      ))}
      <TableRowColumn>
        {currentlyEditing ? (
          <CheckIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}
      </TableRowColumn>
      <TableRowColumn>
        <TrashIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
};

export default function MaterialTable({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {header.map((element, i) => (
            <TableHeaderColumn key={`header-${i}`}>
              {element.displayName}
            </TableHeaderColumn>
          ))}
          <TableHeaderColumn />
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((element, i) =>
          row(
            element,
            i,
            header,
            handleRemove,
            startEditing,
            editIdx,
            handleChange,
            stopEditing
          )
        )}
      </TableBody>
    </Table>
  );
}
