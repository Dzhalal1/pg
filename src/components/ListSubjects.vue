<template>
    <ion-page>
        <ion-header>
            <ion-button @click="closeComponent">
                <ion-icon :icon="chevronBackCircleOutline"/>
            </ion-button>
        </ion-header>
        <ion-content>
            <ion-grid class="subjects">
                <ion-row v-for="subject in subjects" :key="subject.id">
                    <ion-col>
                        <p>{{subject.name}}</p>
                    </ion-col>
                    <ion-col class="ion-text-end">
                        <p>{{subject.subjectsteacher.find(item => item.head).last_name}}
                            {{subject.subjectsteacher.find(item => item.head).first_name}}
                            {{subject.subjectsteacher.find(item => item.head).father_name}} </p>
                        <ion-button @click="openScoresTable(subject)">
                            Журнал
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <scores-table :open_dialog="open" @close-dialog="closeScorestable" :subject_id="selectedSubject.id"  :subject_name="selectedSubject.name" v-if="open"></scores-table>
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
        IonContent,
        IonIcon,
        IonButton,
    } from '@ionic/vue';
    import {chevronBackCircleOutline} from 'ionicons/icons';
    import Storage from "../plugins/storage";
    import ScoresTable from "../views/ScoresTable";

    export default {
        name: "ListSubjects",
        components: {
            IonPage,
            IonHeader,
            IonContent,
            IonGrid,
            IonCol,
            IonRow,
            IonIcon,
            IonButton,
            ScoresTable
        },
        data() {
            return {
                chevronBackCircleOutline,
                subjects: [],
                open: false,
                selectedSubject: [],

            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            loadSubjects() {
                Storage.methods.getSubjects().then((response) => {
                    this.subjects = response
                })
            },
            closeScorestable(data) {
                this.open = false
            },
            openScoresTable(subject) {
                this.selectedSubject  = subject
                this.open = true
            }
        },
        mounted() {
            this.loadSubjects()
        }
    }
</script>

<style scoped>
    * {
        font-family: "Jost SemiBold", sans-serif;
        margin: 0;
        padding: 0;
    }

    .subjects {

        margin: 5px;
        font-size: 10pt;

    }

    .subjects ion-row {
        padding: 15px;
        margin-top: 15px;
        background-color: white;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

</style>