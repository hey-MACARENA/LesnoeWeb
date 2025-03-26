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
    getSections(getClear = false) {
        return instance.get('api/sections', {
            params: {
                getClear: getClear,
            }
        })
        .then(response => {
            return response.data;
        })
    },
    postEmployee(employee) {
        let jsonEmployee = {
            name: employee.name,
            position_id: employee.position,
            section_id: employee.section,
            team_id: employee.team,
            work_experience: employee.work_experience,
            residence: employee.residence,
        }

        return instance.post('api/employees', jsonEmployee);
    }
};