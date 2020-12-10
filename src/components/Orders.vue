<template>
    <ion-page>
        <ion-header>
            <ion-button @click="closeComponent">
                <ion-icon :icon="chevronBackCircleOutline"/>
            </ion-button>
        </ion-header>
        <ion-content>
            <ion-grid class="statements">
                <ion-row v-for="(order,index) in orders" :key="index">
                    <ion-col size="6">
                        <p>{{order.name}}
                        </p>
                    </ion-col>
                    <ion-col size="4">
                        {{order.semester}}
                    </ion-col>
                    <ion-col size="2" class="ion-text-end">
                        <ion-icon class="check" :icon="checkmarkOutline" v-if="order.acepted"/>
                    </ion-col>
                </ion-row>
                <ion-row v-if="orders.length === 0">
                    <ion-col><p>Список долгов пуст</p></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>


<script>
    import {
        IonPage,
        IonContent,
        IonHeader,
        IonGrid,
        IonCol,
        IonRow,
        IonIcon,
        IonButton,
    } from '@ionic/vue';
    import {chevronBackCircleOutline, checkmarkOutline} from 'ionicons/icons';
    import Storage from "../plugins/storage";

    export default {
        name: "Orders",
        components: {
            IonPage,
            IonHeader,
            IonGrid,
            IonContent,
            IonCol,
            IonRow,
            IonIcon,
            IonButton,
        },
        data() {
            return {
                chevronBackCircleOutline,
                checkmarkOutline,
                orders: []
            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            getOrders() {
                Storage.methods.getOrders().then((response) => {
                    this.orders = response
                })
            }
        },
        mounted() {
            this.getOrders()
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .statements {
        font-family: "Jost SemiBold", sans-serif;
        margin: 5px;
        font-size: 10pt;

    }

    .statements ion-row {
        padding: 15px;
        margin-top: 15px;
        background-color: white;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

    .check {
        color: lightseagreen !important;
        font-size: 15pt;
    }
</style>