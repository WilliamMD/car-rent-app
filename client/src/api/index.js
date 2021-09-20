import axios from "axios";

export const fetchCars = () => axios.get(`http://localhost:3000/cars/`);
export const addCar = (newCar) =>
  axios.post(`http://localhost:3000/cars/add`, newCar);
