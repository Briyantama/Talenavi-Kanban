import axios from "axios";
import type { ResponseData } from "../types";

function GetData() {
    const response = axios.get<ResponseData>("https://mocki.io/v1/282222c9-43cf-4d92-9ba0-0e0d1447f403")
    return response
}

export default GetData;