﻿﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    roles(url = baseUrl + 'roles/') {
        return {
            fetchAllByName:(roleName) => axios.get(url+roleName),
            fetchAll:()=>axios.get(url)
        }
    }
}