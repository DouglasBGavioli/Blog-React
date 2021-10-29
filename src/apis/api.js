import axios from "axios";

const api = axios.create({
    baseURL: "https://compasso-blog-api.herokuapp.com/",
    headers:{ Authorization: "qualquer-coisa-aqui" },
    
})
export default api;