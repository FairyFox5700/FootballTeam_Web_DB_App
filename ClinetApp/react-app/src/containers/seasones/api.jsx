﻿﻿﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    seasones(url = baseUrl + 'seasons/') {
        return {
            fetchAllByClubId:clubId => axios.get(url+ "club/"+clubId),
            fetchById: seasonId => axios.get(url +seasonId),
        }
    }
}