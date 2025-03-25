import { instance } from './api';

export const employeesAPI = {
    getEmployees(teamId, sort) {
        return instance.get('api/employees', {
            params: {
                teamId: teamId,
                sort: sort
            }
        })
        .then(response => {
            return response.data;
        });
    },
    getTeams() {
        return instance.get('api/teams')
            .then(response => {
                return response.data;
            })
    },
    getPositions() {
        return instance.get('api/positions')
            .then(response => {
                return response.data;
            })
    },
    getSections() {
        return instance.get('api/sections')
            .then(response => {
                return response.data;
            })
    },
};