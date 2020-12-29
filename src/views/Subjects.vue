<template>
    <ion-page>
        <ion-header v-if="page===null">
            <ion-row>
                <ion-col class="ion-text-center">
                    <p>{{semester.title}}</p>
                </ion-col>
            </ion-row>
        </ion-header>
        <ion-grid v-if="page === null">
            <ion-button type="submit" @click="open_semesters = true" expand="block" fill="clear"
            >
                Сменить семестр
            </ion-button>
            <ion-row>
                <ion-col class="style__sub">
                    <ion-row>
                        <ion-col size="8">
                            <p>График формирования ведомостей</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-icon @click="page = 1" :icon="chevronForwardOutline"/>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <p>Список предметов</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-icon @click="page = 2" :icon="chevronForwardOutline"/>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <p v-if="is_student">Долги</p>
                            <p v-else>Листы П/А</p>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-icon @click="page = 3" :icon="chevronForwardOutline"/>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>
        </ion-grid>
        <change-semesters :open_dialog="open_semesters" @close-dialog="closeChangeSemesters"
                          v-if="open_semesters"></change-semesters>
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
        IonHeader,

    } from '@ionic/vue';
    import {chevronForwardOutline, chevronBackOutline} from 'ionicons/icons';
    import Statements from "@/components/Statements.vue";
    import ListSubjects from "../components/ListSubjects";
    import Orders from "../components/Orders";
    import ChangeSemesters from "./ChangeSemesters";
    import Storage from "../plugins/storage";


    export default {
        name: 'Subjects',
        components: {
            Statements,
            IonHeader,
            Orders,
            ListSubjects,
            IonButton,
            IonCol,
            IonIcon,
            IonRow,
            IonGrid,
            IonPage,
            ChangeSemesters
        },
        data() {
            return {
                page: null,
                chevronForwardOutline,
                open_semesters: false,
                semester: {},
                chevronBackOutline,
                is_student: false
            }
        },
        mounted() {
            this.semester = Storage.getItem('semester')
            this.is_student = Storage.is_student()
        },
        methods: {
            closeChangeSemesters() {
                this.semester = Storage.getItem('semester')
                this.open_semesters = false
            },
            closeComponent() {
                this.$emit('close-component', null)
            },
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-family: "Jost SemiBold", sans-serif;
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

    ion-icon {
        font-size: 25pt;
        color: lightseagreen;
    }

    ion-icon {
        color: lightseagreen;
        font-size: 20pt;
    }

    .return {
        font-size: 25pt;
        color: lightseagreen;
    }

    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        font-size: 10pt;
    }

    ion-header {
        background-color: lightseagreen;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    ion-header ion-icon {
        color: white !important;
    }

</style>