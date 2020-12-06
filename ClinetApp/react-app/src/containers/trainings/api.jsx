﻿﻿﻿﻿﻿﻿﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    trainings(url = baseUrl + 'trainings/') {
        return {
            fetchAllByCoachId:coachId => axios.get(url+"coach/"+coachId),
            fetchById: trainingId => axios.get(url +trainingId),
        }
    }
}