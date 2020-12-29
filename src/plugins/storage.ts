import http from "@/plugins/axios";

const Storage = {
    setItem: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getItem: (key: string) => {
        const data = localStorage.getItem(key)
        if (data !== null)
            return JSON.parse(data)
        return data
    },
    methods: {
        getToken: async (form: any) => {
            const token = (await http.post('auth/token/login/', form)).data.data.id
            Storage.setItem('token', token)
            http.defaults.headers.common['Authorization'] = 'Token ' + token
            return token
        },
        getUserInfo: async () => {
            const user = await http.get('api/user/info/')
            Storage.setItem('user', user.data.data.data)
        },
        getLastSemester: async () => {
            const semester = await http.get('api/base/get_last_semesters/')
            Storage.setItem('semester', semester.data.data.data)
        },
        getVneucRating: async () => {
            const reitng = await http.get('api/students/vneuch_reitng/', {params: {semester_id: Storage.getItem('semester').id}})
            return reitng.data.data.attributes.vneuchreit
        },
        getIntegralRating: async () => {
            const reitng = await http.get('api/students/integral_reitng/', {params: {semester_id: Storage.getItem('semester').id}})
            return reitng.data.data.attributes
        },
        putUserInfo: async (userData: any) => {
            const user = (await http.put('api/user/update_userinfo/' + userData.id + '/', userData.form)).data.data.attributes
            const userStorage = Storage.getItem('user')
            for (const key in user) {
                userStorage[key] = user[key]
            }
            Storage.setItem('user', userStorage)
            return user
        },
        changePassword: async (data: any) => {
            await http.post('api/user/password/', data)
        },
        downloadStatements: async (statementId: any) => {
            const statement = await http.post('api/teachers/pdf/closesubjects/download/' + statementId + '/')
            return statement.data.data
        },
        getOrders: async () => {
            const orders = await http.get('api/students/get_not_accept_subjects/')
            return orders.data.data.data
        },
        getStatements: async () => {
            let url = ''
            let params = {}
            if (Storage.is_student()) {
                url = 'api/students/close_subjects/'
                params = {group_id: Storage.getItem('group').id}
            }
            else {
                url = 'api/teachers/close_subjects/'
                params = {semester_id: Storage.getItem('semester').id, learn_form: 1}
            }
            const statement = await http.get(url , {params})
            return statement.data.data.data ? statement.data.data.data : statement.data.data
        },
        getGroupInfo: async () => {
            const group = await http.get('api/students/get_groups_info/', {params: {semester_id: Storage.getItem('semester').id}})
            Storage.setItem('group', group.data.data)
        },
        getAcademicYear: async () => {
            const year = await http.get('api/base/get_academic_year/')
            return year.data.data
        },
        getSubjects: async () => {
            let url = ''
            if(Storage.is_student()) {
                url = 'api/students/' + Storage.getItem('group').id + '/' + Storage.getItem('user').students + '/subjects/'
            }
            else url = 'api/teachers/subjects/' + '1' + '/' + Storage.getItem('user').id + '/' + Storage.getItem('semester').id + '/' //todo: сделать выбор формы обучения
            const subjects = await http.get(url, {params: {semester_id: Storage.getItem('semester').id}})
            return subjects.data.data.data
        },
        getSubjectInfo: async (subjectId: number, week: number = 0) => {
            let selectWeek = 0
            if (week === 0) {
                selectWeek = Storage.getItem('semester').current_week
            } else selectWeek = week
            const subjectinfo = await http.get('api/teachers/subjects_info/' + subjectId + '/', {
                params: {
                    week: selectWeek,
                    group_id: Storage.getItem('group').id,
                    subject_id: subjectId
                }
            })
            return subjectinfo.data.data.data
        },
        getSubjectsScores: async (subjectId: number) => {
            const scores = await http.get('api/teachers/scores/' + subjectId + '/' + Storage.getItem('user').students + '/')
            return scores.data.data.data
        },
    },
    is_student() {
        const user = Storage.getItem('user')
        if (user !== null)
            return user.user_group.findIndex((row: any) => {
                return row.id === 3
            }) !== -1
    }
}

export default Storage
