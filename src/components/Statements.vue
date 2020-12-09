<template>
    <ion-page>
        <ion-header>
            <ion-button @click="closeComponent">
                <ion-icon :icon="chevronBackCircleOutline"/>
            </ion-button>
        </ion-header>
        <ion-content>
            <ion-grid class="statements">
                <ion-row v-for="(statement,index) in statements" :key="index">
                    <ion-col size="6">
                        <p>
                            {{statement.subject}}
                        </p>
                    </ion-col>
                    <ion-col size="4">
                            {{formatDate(statement.date_close)}}
                    </ion-col>
                    <ion-col size="2">
                        <ion-button @click="downloadStatements(statement.close_subject_id)">
                            <ion-icon :icon="cloudDownload"/>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
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
        IonContent,
    } from '@ionic/vue';
    import {chevronBackCircleOutline, cloudDownload} from 'ionicons/icons';
    import Storage from "../plugins/storage";

    export default {
        name: "Statements",
        components: {
            IonPage,
            IonContent,
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
                cloudDownload,
                statements: [
                    {
                        close_subject_id: 17740,
                        date_close: "2021-01-13",
                        date_decan: "Не подписано",
                        date_formed: "Не сформировано",
                        date_teacher: "Не подписано",
                        groups: [{id: 4209, group: 716, group_closed_week: 0}],
                        number: "",
                        open: true,
                        statements_list: [],
                        subject: "Автоматизация сх процессов - Зачет",
                        teacher: "Васильков Алексей Анатольевич",
                        teacher_close: false,
                    },
                    {
                        close_subject_id: 17740,
                        date_close: "2021-01-13",
                        date_decan: "Не подписано",
                        date_formed: "Не сформировано",
                        date_teacher: "Не подписано",
                        groups: [{id: 4209, group: 716, group_closed_week: 0}],
                        number: "",
                        open: true,
                        statements_list: [],
                        subject: "Автоматизация сх процессов - Зачет",
                        teacher: "Васильков Алексей Анатольевич",
                        teacher_close: false,
                    },
                    {
                        close_subject_id: 17740,
                        date_close: "2021-01-13",
                        date_decan: "Не подписано",
                        date_formed: "Не сформировано",
                        date_teacher: "Не подписано",
                        groups: [{id: 4209, group: 716, group_closed_week: 0}],
                        number: "",
                        open: true,
                        statements_list: [],
                        subject: "Автоматизация сх процессов - Зачет",
                        teacher: "Васильков Алексей Анатольевич",
                        teacher_close: false,
                    },
                ]

            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            formatDate(str) {
                return String(str).split('-').reverse().join('.')
            },
            downloadStatements(pdf) {
                Storage.methods.downloadStatements(pdf)
            }
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
</style>