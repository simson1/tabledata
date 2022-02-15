export const GET_DATA = "GET DATAS";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_FAILURE";
export const DATA_UPDATE = "DATA_UPDATE";
export const DATA_EDIT_INDEX = "DATA_EDIT_INDEX";

export const getData = () => ({ type: GET_DATA });
export const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  payload: data,
});
export const dataUpdate = (data) => {
  setDataToLocalStorage(data);
  return {
    type: DATA_UPDATE,
    payload: data,
  };
};
export const setEditIndex = (data) => ({
  type: DATA_EDIT_INDEX,
  payload: data,
});
export const getDataFailure = () => ({ type: GET_DATA_FAILURE });

function getDataFromLocalStorage() {
  return window.localStorage.getItem("list-data");
}

function setDataToLocalStorage(data) {
  window.localStorage.setItem("list-data", JSON.stringify(data));
}

export function fetchData() {
  return async (dispatch) => {
    const listData = getDataFromLocalStorage();
    if (!listData) {
      dispatch(getData());
      try {
        const response = await fetch(`https://reqres.in/api/users`);
        const data = await response.json();
        dispatch(getDataSuccess(data.data));
        setDataToLocalStorage(data.data);
      } catch (error) {
        dispatch(getDataFailure());
      }
    } else {
      dispatch(getDataSuccess(JSON.parse(listData)));
    }
  };
}
