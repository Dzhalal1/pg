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
            const user = await http.get('api/user/info')
            Storage.setItem('user', user.data.data.data)
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
        }

    }
}

export default Storage
