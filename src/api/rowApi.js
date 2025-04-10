import { instance } from './api';

export const rowAPI = {
    getData(url, sortName, currentFilters) {
        console.log({
            params: {
                sort: sortName,
                ...currentFilters,
            }
        });
        return instance.get(`api${url}`, {
            params: {
                sort: sortName,
                ...currentFilters,
            }
        })
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