import * as actions from '../actions/tableDataActions'
const initialState =  {
    tableData: [],
    editIdx: -1,
    loading: true,
    error: false
  }

export default function tableDataReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_DATA:
          return { ...state, loading: true }
        case actions.GET_DATA_SUCCESS:
          return { ...state, tableData: action.payload, loading: false, error: false }
        case actions.DATA_UPDATE:
          return { ...state, tableData: action.payload }
        case actions.GET_DATA_FAILURE:
          return { ...state, loading: false, error: true }
        case actions.DATA_EDIT_INDEX:
          return { ...state, editIdx: action.payload }
        default:
          return state
      }
}
