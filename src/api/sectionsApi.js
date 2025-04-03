import { instance } from './api';

export const sectionsAPI = {
    getSections(sort) {
        return instance.get('api/sections', {
            params: {
                sort: sort
            }
        })
        .then(response => {
            return response.data;
        });
    },
    getTerritories() {
        return instance.get('api/territories')
            .then(response => {
                return response.data;
            })
    },
    getFireHazardLevels() {
        return instance.get('api/firehazardlevels')
            .then(response => {
                return response.data;
            })
    },
    postSections(section) {
        return instance.post('api/employees', section);
    },
    putSection(sectionId, section) {
        return instance.put(`api/employees/${sectionId}`, section);
    },
    deleteSection(sectionId) {
        return instance.delete(`api/sections/${sectionId}`);
    }
};