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
                <ion-tab-button tab="tab3" href="/tabs/tab3">
                    <ion-icon :icon="statsChart"/>
                    <ion-label>Рейтинг</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="profile" href="/tabs/profile">
                    <ion-icon :icon="person"/>
                    <ion-label>Личные данные</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
    import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage} from '@ionic/vue';
    // import { ellipse, square, triangle } from 'ionicons/icons';
    import {home, statsChart, person, book} from 'ionicons/icons';


    export default {
        name: 'Tabs',
        components: {IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage},
        setup() {
            return {
                home,
                statsChart,
                person,
                book
            }
        }
    }
</script>
<style scoped>
    ion-label {
        font-family: "Jost SemiBold", sans-serif;
    }
</style>