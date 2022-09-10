import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
import { BASE_URL } from "../config";

const URL = BASE_URL + "/getAllFiles";

export const getAllFiles = () => {
  return axios.get(`${URL}`);
};

export const downloadFile = (nom) => {
  return axios.get(`http://192.168.8.103:3000/files/${nom}`);
};

export const deleteFile = (id) => {
  return axios.delete(`${BASE_URL}/deleteFile/${id}`);
};
