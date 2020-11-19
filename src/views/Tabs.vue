<template>
    <ion-page >
        <ion-tabs class="test">
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="/tabs/tab1">
                    <ion-icon :icon="person"/>
                    <ion-label></ion-label>
                </ion-tab-button>
                <ion-tab-button tab="tab2" href="/tabs/tab2">
                    <ion-icon :icon="home"/>
                    <ion-label></ion-label>
                </ion-tab-button>
                <ion-tab-button tab="tab3" href="/tabs/tab3">
                    <ion-icon :icon="statsChart"/>
                    <ion-label></ion-label>
                </ion-tab-button>
                <ion-tab-button tab="tab4" href="/tabs/subjects">
                    <ion-icon :icon="book"/>
                    <ion-label></ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
    import {IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage} from '@ionic/vue';
    // import { ellipse, square, triangle } from 'ionicons/icons';
    import {home, statsChart, person,book} from 'ionicons/icons';


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