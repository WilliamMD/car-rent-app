import * as api from "../api";

//Action creators
export const getCars = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCars();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const addCar = () => async (dispatch) => {
  try {
    const { data } = await api.addCar();

    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};
