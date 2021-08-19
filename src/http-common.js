import axios from 'axios'



export default axios.create({
    baseURL: "https://dungeon-masters-toolbox.herokuapp.com/api/v1/midb/",
    headers: {
        "Content-type": "application/json",

    }
})
