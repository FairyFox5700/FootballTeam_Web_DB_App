﻿﻿﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {
    footballResults(url = baseUrl + 'footballersResults/') {
        return {
            fetchAllWithPlayers: () => axios.get( url+"player"),
            fetchAllByMatchId: matchId => axios.get(url +"match/"+ matchId),
        }
    }
}