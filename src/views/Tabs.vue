<template>
    <ion-page>
        <ion-tabs class="test">
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home" href="/tabs/home">
                    <ion-icon :icon="home"/>
                    <ion-label>Главная</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="subjects" href="/tabs/subjects">
                    <ion-icon :icon="book"/>
                    <ion-label>Предметы</ion-label>
                </ion-tab-button>
                <ion-tab-button v-show="is_student" tab="rating" href="/tabs/rating">
                    <ion-icon :icon="statsChart"/>
                    <ion-label>Рейтинг</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="profile" href="/tabs/profile">
                    <ion-icon :icon="person"/>
                    <ion-label>Профиль</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
    import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage} from '@ionic/vue';
    // import { ellipse, square, triangle } from 'ionicons/icons';
    import {home, statsChart, person, book} from 'ionicons/icons';
    // import Storage from "@/plugins/storage";

    export default {
        name: 'Tabs',
        components: {IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage},
        ionViewWillEnter() {
            console.log('will')
        },
        setup() {
            return {
                home,
                statsChart,
                is_student: false,
                person,
                book
            }
        },
        methods: {
            init() {
                const user = JSON.parse(localStorage.getItem('user'))
                if (user)
                    this.is_student = user.user_group.findIndex(item => item.id === 3) !== -1
            }
        },

        mounted() {
            this.init()
        }
    }
</script>
<style scoped>
    ion-label {
        font-family: "Jost SemiBold", sans-serif;
    }
</style>