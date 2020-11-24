<template>
    <ion-page>
        <ion-img :src="require('./../assets/img/profile/wave.svg')"></ion-img>
        <ion-content>
            <ion-grid fixed="default">


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
            // IonCol,
            // IonRow,
            IonGrid,
            IonImg,
            // IonRippleEffect,
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


</style>