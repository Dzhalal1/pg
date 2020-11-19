<template>
    <ion-page>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-icon name="person-outline"></ion-icon>
                    <ion-input placeholder="Username"></ion-input>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-icon name="person-outline"></ion-icon>
                    <ion-input placeholder="Password"></ion-input>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-button expand="full" fill="clear">LOGIN</ion-button>
                </ion-col>
            </ion-row>

        </ion-grid>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        IonInput,
        IonButton,
        IonLabel,
        IonItem,
        IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        // IonContent
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import {lockClosed, personOutline} from 'ionicons/icons';

    export default {
        name: 'Login',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonCol,
            IonRow,
            IonGrid,
            // IonLabel,
            // IonItem,
            IonIcon,
            // IonHeader,
            // IonToolbar,
            // IonTitle,
            // IonContent,
            IonPage
        },
        setup() {
            return {
                lockClosed,
                personOutline
            }
        }
    }
</script>

<style scoped>
    ion-input {
        background-color: #E5E7E9 !important;
        border-radius: 30px;
        height: 80%;
        width: 300px;
        padding-left: 1em !important;
        color: #7B7D7D;
        font-family: "TRY Clother Black", sans-serif;
    }



    ion-button {
        border-radius: 100px;
        background-color: lightseagreen;
        color: white;
        font-family: "TRY Clother Black", sans-serif;
        font-size: 14pt;
        display: flex;



    }

    ion-item {
        background-color: red !important;
    }
</style>