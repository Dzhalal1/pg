<template>
    <ion-page>
        <ion-grid v-if="page === null">
            <ion-row>
                <ion-col class="style__sub">
                    <ion-row>
                        <ion-col size="8">
                            <p>График формирования ведомостей</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-button @click="page = 1">
                                <ion-icon :icon="chevronForwardCircleOutline"/>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <p>Список предметов</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-button @click="page = 2">
                                <ion-icon :icon="chevronForwardCircleOutline"/>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <p>Долги</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-button @click="page = 3">
                                <ion-icon :icon="chevronForwardCircleOutline"/>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>
        </ion-grid>
        <Statements @close-component="page = null" v-if="page === 1"></Statements>
        <ListSubjects @close-component="page = null" v-if="page === 2"></ListSubjects>
        <Orders @close-component="page = null" v-if="page === 3"></Orders>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        IonGrid,
        IonCol,
        IonRow,
        IonIcon,
        IonButton,
    } from '@ionic/vue';
    import {chevronForwardCircleOutline} from 'ionicons/icons';
    import Statements from "@/components/Statements.vue";
    import ListSubjects from "../components/ListSubjects";
    import Orders from "../components/Orders";


    export default {
        name: 'Subjects',
        components: {
            Statements,
            Orders,
            ListSubjects,
            IonButton,
            IonCol,
            IonIcon,
            IonRow,
            IonGrid,
            IonPage
        },
        data() {
            return {
                page: null,
                chevronForwardCircleOutline
            }
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .style__sub {
        font-family: "Jost SemiBold", sans-serif;
        margin: 5px;

    }

    .style__sub ion-row {
        padding: 15px;
        margin-top: 15px;
        background-color: white;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

</style>