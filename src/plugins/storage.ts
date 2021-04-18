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
            console.log(user)
            Storage.setItem('user', user.data)
        },
        getLastSemester: async () => {
            const semester = await http.get('api/base/semesters/last/')
            Storage.setItem('semester', semester.data)
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
        setOrderScore: async (form: any) => {
            const url = 'api/teachers/save_orders/'
            // const orders = await http.post(url, form)
            await http.post(url, form)
            // return orders.data.data.data ? orders.data.data.data : orders.data.data
        },
        getOrders: async () => {
            let url = 'api/students/get_not_accept_subjects/'
            let params = {}
            if (!Storage.is_student()) {
                url = 'api/teachers/get_orders/'
                params = {learn_form: Storage.getItem('learning_form')}
            }
            const orders = await http.get(url, {params})
            return orders.data.data.data ? orders.data.data.data : orders.data.data
        },
        signOrders: async (order_id: any) => {
            const url = '/api/teachers/pdf/orders/sign/' + order_id + '/'
            const file = await http.post(url)
            return file.data.data

        },
        signStatement: async (id: any) => {
            const url = '/api/teachers/pdf/closesubjects/sign/' + id + '/'
            const file = await http.post(url)
            return file.data.data

        },
        getStatements: async () => {
            let url = ''
            let params = {}
            if (Storage.is_student()) {
                url = 'api/students/close_subjects/'
                params = {group_id: Storage.getItem('group').id}
            } else {
                url = 'api/teachers/close_subjects/'
                params = {semester_id: Storage.getItem('semester').id, learn_form: Storage.getItem('learning_form')}
            }
            const statement = await http.get(url, {params})
            return statement.data.data.data ? statement.data.data.data : statement.data.data
        },
        getGroupInfo: async () => {
            const groups = Storage.getItem('user').groups
            const semester = Storage.getItem('semester')
            const group = groups.find((grp: any) => grp.semester === semester.id)
            Storage.setItem('learning_form', group.learning_form)
            Storage.setItem('group', group)
        },
        getAcademicYear: async () => {
            const year = await http.get('api/base/get_academic_year/')
            return year.data.data
        },
        getSubjects: async () => {
            let url = ''
            if (Storage.is_student()) {
                url = 'api/students/' + Storage.getItem('group').id + '/' + Storage.getItem('user').students + '/subjects/'
            } else url = 'api/teachers/subjects/' + Storage.getItem('learning_form') + '/' + Storage.getItem('user').id + '/' + Storage.getItem('semester').id + '/' //todo: сделать выбор формы обучения
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
                    group_id: Storage.is_student() ? Storage.getItem('group').id : 0,
                    subject_id: subjectId
                }
            })
            return subjectinfo.data.data.data
        },
        getSubjectsScores: async (subjectId: number) => {
            const url = Storage.is_student() ? 'api/teachers/scores/' + subjectId + '/' + Storage.getItem('user').students + '/' : 'api/teachers/scores/' + subjectId + '/'
            const scores = await http.get(url)
            return scores.data.data.data
        },
        async saveScore(score: any) {
            const scores = await http.put('api/teachers/scores/update/' + score.id + '/', score)
            console.log(scores)
        },
        async studenSubjectSuccess(form: any) {
            const url = 'api/teachers/scores_from_closesubjects/'
            const success = await http.post(url, form)
            return success.data.data
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
