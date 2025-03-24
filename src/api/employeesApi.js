import { instance } from './api';

export const employeesAPI = {
    getEmployees(teamId, sort) {
        return instance.get('api/employees', {
            params: {
                teamId: teamId, // Параметр team будет передан как teamId
                sort: sort    // Параметр sort будет передан как есть
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
};