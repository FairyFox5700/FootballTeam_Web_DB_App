﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    matches(url = baseUrl + 'matches/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: matchId => axios.get(url + matchId),
            fetchNextMatches: matchId => axios.get(url + "next"),
        }
    }
}