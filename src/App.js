import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MaterialTable from "./Table";
import { connect } from "react-redux";
import {
  fetchData,
  dataUpdate,
  setEditIndex,
} from "./actions/tableDataActions";
function App({ dispatch, loading, data, error, editIdx }) {
  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleRemove = (i) => {
    dispatch(dataUpdate(data.filter((row, j) => j !== i)));
  };

  const startEditing = (i) => {
    dispatch(setEditIndex(i));
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    dispatch(
      dataUpdate(
        data.map((row, j) => (j === i ? { ...row, [name]: value } : row))
      )
    );
  };

  const stopEditing = () => {
    dispatch(setEditIndex(-1));
  };

  return (
    <MuiThemeProvider>
      <div className="App">
        <MaterialTable
          data={data}
          header={[
            {
              displayName: "First name",
              propName: "first_name",
            },
            {
              displayName: "Last name",
              propName: "last_name",
            },
            {
              displayName: "Avatar",
              propName: "avatar",
            },
            {
              displayName: "Email",
              propName: "email",
            },
          ]}
          handleRemove={handleRemove}
          startEditing={startEditing}
          editIdx={editIdx}
          handleChange={handleChange}
          stopEditing={stopEditing}
        />
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  data: state.tableData,
  loading: state.loading,
  error: state.error,
  editIdx: state.editIdx,
});

export default connect(mapStateToProps)(App);
