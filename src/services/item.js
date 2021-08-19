import axios from '../http-common';

class ItemDataService {
    http = null

    constructor(authToken) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + authToken
        this.http = axios
    }


    getAll(page = 0) {
        return this.http.get(`/items?page=${page}`);
    }

    get(id) {
        return this.http.get(`/item?id=${id}`);
    }

    find(query, by = "name", page = 0) {
        return this.http.get(`items?${by}=${query}&page=${page}`);
    }

    createItem(data) {
        return this.http.post("/items", data);
    }

    updateItem(data) {
        return this.http.put("/items", data);
    }

    deleteItem(id, userId) {
        console.log(userId)
        return this.http.delete(`/items?id=${id}`, { data: { user_id: userId } });
    }

    getItemslot(id) {
        return this.http.get(`/itemslots`);
    }
    createComment(data) {
        return this.http.post("/comment", data);
    }

    updateComment(data) {
        return this.http.put("/comment", data);
    }

    deleteComment(id, userId) {
        return this.http.delete(`/comment?id=${id}`, { data: { user_id: userId } });
    }

}

export default ItemDataService