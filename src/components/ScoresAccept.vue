<template>
    <ion-modal :is-open="is_open" @onDidDismiss="closeMe()">
        <ion-page>
            <ion-content>
                <ion-grid>
                    <ion-row v-for="score in scores_table" :key="score.id">
                        <ion-col>
                            {{score.attributes.fio}}
                        </ion-col>
                        <ion-col>
                            {{score.attributes.Rscores.Rfact}}
                        </ion-col>
                        <ion-col>
                            {{score.attributes.Rscores.R}}
                        </ion-col>
                        <ion-col>
                            <ion-checkbox :disabled="score.attributes.Rscores.Rfact<50"
                                          @ionChange="successSubjects(score)"

                                          v-model="score.attributes.succsess_subject"></ion-checkbox>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="12" class="ion-text-end">
                            <ion-button @click="closeMe(true)" expand="full">
                                Готово
                            </ion-button>
                        </ion-col>
                        <ion-col size="12" class="ion-text-end">
                            <ion-button @click="closeMe(false)" expand="full">
                                Отмена
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </ion-page>
    </ion-modal>
</template>

<script>
    import Storage from "../plugins/storage";
    import {
        IonModal,
        IonPage,
        IonCheckbox,
        // IonInput,
        IonButton,
        // IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        // IonHeader,
        IonContent,
    } from '@ionic/vue';

    export default {
        name: "ScoresAccept",
        components: {
            IonCheckbox,
            IonModal,
            IonCol,
            IonRow,
            IonGrid,
            IonContent,
            IonButton,
            IonPage
        },
        data() {
            return {
                is_open: false,
                scores_table: []
            }
        },
        mounted() {
            this.loadScoresAccept()
        },
        props: {
            close_subject_id: Number(),
            open_modal: Boolean()
        },
        methods: {
            successSubjects(row) {
                Storage.methods.studenSubjectSuccess(
                    {
                        students_id: row.id,
                        closesubject_id: this.close_subject_id
                    }
                ).then(response => {
                    this.loadScoresAccept()
                })
            },
            closeMe(sign) {
                this.is_open = false
                this.$emit('close-dialog', sign)
            },
            loadScoresAccept() {
                Storage.methods.getScoresAccept(this.close_subject_id).then(response => {
                    this.scores_table = response
                    this.is_open = this.open_modal
                })
            }
        },

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

    * {
        color: black;
    }
</style>