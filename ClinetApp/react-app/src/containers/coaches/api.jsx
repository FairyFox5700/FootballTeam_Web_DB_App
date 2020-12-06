﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    coaches(url = baseUrl + 'coaches/') {
        return {
            fetchById: coachId => axios.get(url + coachId),
        }
    }
}