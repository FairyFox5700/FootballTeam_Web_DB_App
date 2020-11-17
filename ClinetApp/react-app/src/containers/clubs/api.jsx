import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {
    clubs(url = baseUrl + 'footballClub/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            fetchByPlayerId: playerId => axios.get(url + "player/"+playerId),
        }
    }
}