﻿import axios from "axios";

const baseUrl = "http://localhost:12250/api/"

export default {

    footballers(url = baseUrl + 'footballers/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: footballerId => axios.get(url + footballerId),
            fetchByRoleName:roleName=>axios.get(url+"name/"+roleName),
            fetchAllWithRoles: () => axios.get(url+"roles"),
            fetchAllFilterBy: (name, surName,nationality) => axios.get(url+"filter/?name="+name+"&surname="+surName+"&nationality="+nationality),
            fetchAllOrderAndSearchBy: (search, orderBy) => axios.get(url+"order/search/?search="+search+"&ascending="+orderBy),
        }
    }
}