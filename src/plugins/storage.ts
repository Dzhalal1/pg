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
            const token = (await http.post('auth/token/login/', form)).data.auth_token
            Storage.setItem('token', token)
            http.defaults.headers.common['Authorization'] = 'Token ' + token
            return token
        },
        signOut() {
            localStorage.clear()
            delete http.defaults.headers.common['Authorization']
        },
        getUserInfo: async () => {
            const user = await http.get('api/users/me/')
            Storage.setItem('user', user.data)
        },
        getLastSemester: async () => {
            const semester = await http.get('api/base/semesters/last/')
            Storage.setItem('semester', semester.data)
        },
        getVneucRating: async (student_id: number) => {
            const reitng = await http.get(`api/student/${student_id}/extracurricular_rating/${Storage.getItem('semester').id}/`)
            return reitng.data
        },
        getIntegralRating: async (student_id: number) => {
            const reitng = await http.get(`api/student/${student_id}/integral_rating/${Storage.getItem('semester').id}/`)
            return reitng.data
        },
        putUserInfo: async (userData: any) => {
            const user = (await http.put(`api/users/${userData.id}/`, userData.form)).data
            const userStorage = Storage.getItem('user')
            for (const key in user) {
                userStorage[key] = user[key]
            }
            Storage.setItem('user', userStorage)
            return user
        },
        changePassword: async (data: any) => {
            await http.post('auth/users/set_password/', data)
        },
        downloadStatements: async (statementId: any) => {
            const statement = await http.post('api/teachers/pdf/closesubjects/download/' + statementId + '/')
            return statement.data.data
        },
        setOrderScore: async (form: any) => {
            const url = 'api/teachers/save_orders/'
            // const orders = await http.post(url, form)
            await http.post(url, form)
            // return orders.data.data.data ? orders.data.data.data : orders.data.data
        },
        getOrders: async (user_id: number) => {
            let url = `api/student/${user_id}/orders/`
            let params = {}
            if (!Storage.is_student()) {
                url = `api/teacher/${user_id}/orders/`
                params = {learn_form_id: Storage.getItem('learning_form')}
            }
            const orders = await http.get(url, {params})
            return orders.data
        },
        signOrders: async (order_id: any) => {
            const url = '/api/teachers/pdf/orders/sign/' + order_id + '/'
            const file = await http.post(url)
            return file.data.data

        },
        signStatement: async (subject_id: any, group_id: any) => {
            const file = await http.post(`/api/decanat/close_subjects/sign/${subject_id}/`, {group_id})
            return file.data

        },
        getStatements: async () => {
            let url = ''
            if (Storage.is_student()) {
                url = `api/group/${Storage.getItem('group').id}/close_subjects/`
            } else {
                url = `api/teacher/${Storage.getItem('user').id}/close_subjects/${Storage.getItem('semester').id}/${Storage.getItem('learning_form')}/`
            }
            const statements = await http.get(url,)
            return statements.data
        },
        getGroupInfo: async () => {
            const groups = Storage.getItem('user').groups
            const semester = Storage.getItem('semester')
            let group = groups.find((grp: any) => grp.semester === semester.id)
            if (group === undefined) {
                group = groups[groups.length - 1]
            }
            Storage.setItem('group', group)
            Storage.setItem('learning_form', group.learning_form)
        },
        getAcademicYear: async () => {
            const year = await http.get('api/base/academic_years/')
            return year.data
        },
        getSubjects: async () => {
            let url = ''
            if (Storage.is_student()) {
                url = 'api/student/' + Storage.getItem('user').student + '/subjects/' + Storage.getItem('semester').id + '/'
            } else url = 'api/teacher/' + Storage.getItem('user').id + '/subjects/' + Storage.getItem('semester').id + '/' + Storage.getItem('learning_form') + '/'
            const subjects = await http.get(url, {params: {semester_id: Storage.getItem('semester').id}})
            return subjects.data
        },
        getSubjectInfo: async (subjectId: number, week: number = 0) => {
            const journal = await http.get('api/subject/' + subjectId + '/journal/')
            return journal.data
        },
        getSubjectsScores: async (subjectId: number) => {
            const url = Storage.is_student() ? 'api/teachers/scores/' + subjectId + '/' + Storage.getItem('user').students + '/' : 'api/teachers/scores/' + subjectId + '/'
            const scores = await http.get(url)
            return scores.data.data.data
        },
        async saveScore(score: any) {
            console.log(score)
            await http.patch('api/score/' + score.id + '/', score)
        },
        async studenSubjectSuccess(form: any, url: string, method: "post" | "delete") {
            const success = await http.request({url, method, data: form})
            return success.data
        },
        async getScoresAccept(closesubject_id: number) {
            const scores_accept = await http.get('api/teachers/scores_from_closesubjects/', {
                params: {
                    closesubject_id: closesubject_id,
                    learn_form: Storage.getItem('learning_form')
                }
            })
            return scores_accept.data.data
        }
    },
    is_student() {
        const user = Storage.getItem('user')
        if (user !== null)
            return user.role.findIndex((row: any) => {
                return row.id === 3
            }) !== -1
    }
}

export default Storage
