import { instance } from './api';

export const employeesAPI = {
    getEmployees() {
        return instance.get('api/employees')
            .then(response => {
                return response.data;
            })
    },
    getTeams() {
        return instance.get('api/teams')
            .then(response => {
                return response.data;
            })
    },
};