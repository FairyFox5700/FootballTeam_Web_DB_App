﻿﻿﻿﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    sponsores(url = baseUrl + 'seasons/') {
        return {
            fetchAllByClubId:clubId => axios.get(url+"club/"+clubId),
            fetchById: sponsorId => axios.get(url +sponsorId),
        }
    }
}