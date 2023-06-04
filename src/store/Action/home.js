import { actionTypes } from "./actionTypes";
import * as apis from "../../Apis";

export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();
    console.log(response?.data.data.items);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_HOME,
        payload: response?.data.data.items,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOME,
        payload: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      payload: error,
    });
  }
};
