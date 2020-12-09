<template>
    <ion-page>
        <ion-header>
            <ion-button @click="closeComponent">
                <ion-icon :icon="chevronBackCircleOutline"/>
            </ion-button>
        </ion-header>
        <ion-grid>
            <ion-row>
                <ion-col>

                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>


<script>
    import {
        IonPage,
        IonHeader,
        IonGrid,
        IonCol,
        IonRow,
        IonIcon,
        IonButton,
    } from '@ionic/vue';
    import {chevronBackCircleOutline} from 'ionicons/icons';

    export default {
        name: "ListSubjects",
        components: {
            IonPage,
            IonHeader,
            IonGrid,
            IonCol,
            IonRow,
            IonIcon,
            IonButton,
        },
        data() {
            return {
                chevronBackCircleOutline,

            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            }
        }
    }
</script>

<style scoped>

</style>