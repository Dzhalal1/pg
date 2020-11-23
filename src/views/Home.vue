<template>
    <ion-page>
        <ion-content>
            <ion-grid fixed="default" class="cards">
                <a href="https://eios.kgsxa.ru/enrol/index.php?id=2211">
                    <ion-row class="by__student ion-align-items-center ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-col>
                            <ion-img :src="require('./../assets/img/homepage/bystudents.svg')"></ion-img>
                        </ion-col>
                        <ion-col>
                            <p>Для студентов</p>
                        </ion-col>
                    </ion-row>
                </a>
                <a href="https://eios.kgsxa.ru/">
                    <ion-row class="eios ion-align-items-center ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-col>
                            <ion-img :src="require('./../assets/img/homepage/EIOS.svg')"></ion-img>
                        </ion-col>
                        <ion-col>
                            <p>Платформа ЕИОС</p>
                        </ion-col>
                    </ion-row>
                </a>
                <a href="https://kgsxa.ru/images/files/raspisanie_2020-2021_1/www/index.htm">
                    <ion-row class="calendar ion-align-items-center ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-col>
                            <ion-img :src="require('./../assets/img/homepage/calendar.svg')"></ion-img>
                        </ion-col>
                        <ion-col>
                            <p>Расписание занятий</p>
                        </ion-col>
                    </ion-row>
                </a>
                <a href="https://kgsxa.ru/">
                    <ion-row class="kgsxa ion-align-items-center ion-activatable ripple-parent">
                        <ion-ripple-effect></ion-ripple-effect>
                        <ion-col>
                            <ion-img :src="require('./../assets/img/homepage/KGSXA.svg')"></ion-img>
                        </ion-col>
                        <ion-col>
                            <p>Сайт ФГБОУ ВО КГСХА</p>
                        </ion-col>
                    </ion-row>
                </a>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        // createAnimation,
        // IonInput,
        // IonButton,
        // IonLabel,
        // IonItem,
        // IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        IonImg,
        IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import {lockClosed, person} from 'ionicons/icons';

    export default {
        name: 'Home',
        components: {
            // ExploreContainer,
            // IonInput,
            // IonButton,
            IonCol,
            IonRow,
            IonGrid,
            IonImg,
            IonRippleEffect,
            // IonLabel,
            // IonItem,
            // IonIcon,
            // IonHeader,
            // IonToolbar,
            // IonTitle,
            IonContent,
            IonPage
        },
    }
</script>

<style scoped>
    .by__student {
        background-image: linear-gradient(180deg, #3366cc, #196FBF);
        border-radius: 20px;
        margin: 20px;
    }

    .eios {
        background-image: linear-gradient(180deg, #196FBF, #3399cc);
        border-radius: 20px;
        margin: 20px;
    }

    .calendar {
        background-image: linear-gradient(180deg, #3399cc, #339999);
        border-radius: 20px;
        margin: 20px;

    }

    .kgsxa {
        background-image: linear-gradient(180deg, #339999, #339999);
        border-radius: 20px;
        margin: 20px;

    }

    a {
        text-decoration: none;
        color: white;
    }

    p {
        font-family: "Jost SemiBold", sans-serif;
        font-size: 14pt;
        text-align: center;
    }

    .ripple-parent {
        position: relative;
        overflow: hidden;
    }


</style>