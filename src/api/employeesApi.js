import { instance } from './api';

export const employeesAPI = {
    getEmployees() {
        return instance.get('api/employees')
            .then(response => {
                console.log('Response from eAPI:', response.data);
                return response.data;
            })
    },
};