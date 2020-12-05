<template>
    <ion-page>
        <ion-grid fixed="default" class="cards">
            <ion-img :src="require('./../assets/img/firstpage/logomain.svg')"></ion-img>
            <ion-row class="footer__academy">
                <ion-col>
                    <h5>ФГБОУ ВО Костромская ГСХА</h5>
                </ion-col>
            </ion-row>
        </ion-grid>
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
        name: 'First',
        components: {
            // ExploreContainer,
            // IonInput,
            // IonButton,
            IonCol,
            IonRow,
            IonGrid,
            IonImg,
            // IonRippleEffect,
            // IonLabel,
            // IonItem,
            // IonIcon,
            // IonHeader,
            // IonToolbar,
            // IonTitle,
            // IonContent,
            IonPage
        },
    }
</script>

<style scoped>
    ion-grid {
        background: linear-gradient(#20b2aa, #2c3e50);
        height: 100%;
        width: 100%;
    }

    ion-img {
        height: 50%;
        width: 50%;
        margin: auto;
        padding-top: 250px;
    }
    .footer__academy {
        display: table-cell;
        position: absolute;
        bottom: 0;
        left: auto;
        width: 100%;
    }
    h5 {
        color: white;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 12pt;
        text-align: center;
    }

</style>