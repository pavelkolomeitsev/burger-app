import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-cb27b.firebaseio.com/",
});

export default instance;
