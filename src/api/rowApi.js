import { instance } from './api';

export const rowAPI = {
    getData(url) {
        return instance.get(`api${url}`)
            .then(response => {
                return response.data;
            });
    },
    getExtras(url) {
        return instance.get(`api${url}`)
            .then(response => {
                return response.data;
            })
    },
    postRow(crudUrl, row) {
        return instance.post(`api${crudUrl}`, row);
    },
    putRow(url, rowId, row) {
        return instance.put(`api${url}/${rowId}`, row);
    },
    deletROw(url, rowId) {
        return instance.delete(`api${url}/${rowId}`);
    }
};