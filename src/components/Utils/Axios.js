//This how axios creates an instance.  If in development mode, 
//use the specified address, otherwise, use deployed address.  
//The time out is set to 5 sec, think of it as a phone hanging
// up if no answer.
import axios from "axios";
const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "DELPOY CLOUD ADDRESS",
  timeout: 50000,
});
export default Axios;