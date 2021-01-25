<template>
    <ion-page>
        <ion-header>
            <ion-row>
                <ion-col>
                    <ion-icon class="return" @click="closeComponent" :icon="chevronBackOutline"/>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="ion-text-center">
                    <p>{{semester.title}}</p>
                </ion-col>
            </ion-row>
        </ion-header>
        <ion-content>
            <ion-grid class="statements">
                <ion-row v-for="(statement,index) in statements" :key="index">
                    <ion-col size="6">
                        <p>
                            {{statement.subject}}
                        </p>
                    </ion-col>
                    <ion-col size="4" class="ion-text-center">
                        {{formatDate(statement.date_close)}}
                    </ion-col>
                    <ion-col size="2" class="ion-text-end">
                        {{statement.group}}
                        <ion-button fill="clear" :disabled="statement.link === ''"
                                    @click="downloadStatements(statement.link)">
                            <ion-icon
                                    :icon="downloadOutline"/>
                        </ion-button>
                    </ion-col>
                    <ion-col size="12" class="ion-text-end">
                        <ion-button v-if="!is_student" @click="signStatement(statement.id)" :disabled="!statement.open">
                            Подписать
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <scores-accept v-if="open_scores_table" :close_subject_id="selected_close_subject_id"
                       @close-dialog="closeScoresAccept"
                       :open_modal="open_scores_table"></scores-accept>
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
        IonContent, loadingController,
    } from '@ionic/vue';
    import {chevronBackOutline, downloadOutline} from 'ionicons/icons';
    import Storage from "../plugins/storage";
    import ScoresAccept from "./ScoresAccept";

    export default {
        name: "Statements",
        components: {
            ScoresAccept,
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
                chevronBackOutline,
                downloadOutline,
                selected_close_subject_id: 0,
                open_scores_table: false,
                statements: [],
                semester: {},
                is_student: false
            }
        },
        methods: {
            signStatement(id) {
                this.selected_close_subject_id = id
                this.open_scores_table = true
                // Storage.methods.signStatement(id).then(response => {
                //     this.downloadStatements(response)
                // })
            },
            closeScoresAccept(data) {
                if (data)
                    Storage.methods.signStatement(this.selected_close_subject_id).then(response => {
                        this.open_scores_table = false
                        this.downloadStatements(response)
                        this.getStatements()
                    })
                else {
                    this.open_scores_table = false
                }
            },
            closeComponent() {
                this.$emit('close-component', null)
            },
            formatDate(str) {
                return String(str).split('-').reverse().join('.')
            },
            downloadStatements(file_link) {
                // Storage.methods.downloadStatements(pdf).then((response) => {
                const link = document.createElement('a')
                link.href = 'https://mrs.kgsxa.ru/media/' + file_link
                link.setAttribute('download', '123.pdf')
                link.setAttribute('target', '_blank')
                document.body.appendChild(link)
                link.click()
                // })
            },
            async getStatements() {
                const loading = await loadingController.create({
                    cssClass: 'loading',
                    message: 'Загрузка',
                    animated: true,
                    spinner: 'crescent',
                    translucent: true,
                })
                await loading.present();
                Storage.methods.getStatements().then((response) => {
                    this.statements = response

                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    loading.dismiss()
                })
            },
        },
        mounted() {
            this.getStatements()
            this.semester = Storage.getItem('semester')
            this.is_student = Storage.is_student()
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

    ion-icon {
        /*color: white !important;*/
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