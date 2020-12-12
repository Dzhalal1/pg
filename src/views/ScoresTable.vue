<template>
    <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
        <ion-page>
            <ion-header>
                <ion-row>
                    <ion-col size="1">
                        <ion-icon @click="closeMe" :icon="chevronBackOutline"/>
                    </ion-col>
                    <ion-col size="11">
                        <p>{{subject_name}}</p>
                    </ion-col>
                </ion-row>
            </ion-header>
            <ion-content>
                <ion-grid>
                    <ion-row>
                        <ion-col size="2">
                            <ion-button :disabled="(semester.current_week + week) === 1" @click="changeWeek('down')">
                                <ion-icon :icon="chevronBackOutline"/>
                            </ion-button>
                        </ion-col>
                        <ion-col size="8">
                            <p>{{semester.current_week + week}} неделя</p>
                            <p>{{subjectsInfo.dateweek.start_week}} - {{subjectsInfo.dateweek.end_week}}</p>
                        </ion-col>
                        <ion-col size="2" class="ion-text-end">
                            <ion-button :disabled="(semester.current_week + week) === 32" @click="changeWeek('up')">
                                <ion-icon :icon="chevronForwardOutline"/>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            {{selectScores}}
                            {{subjectsInfo.maxscore_info}}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </ion-page>
    </ion-modal>
</template>

<script>
    import Storage from "../plugins/storage";
    import {chevronBackOutline, chevronForwardOutline} from 'ionicons/icons';
    import {
        IonModal,
        IonPage,
        // createAnimation,
        // IonInput,
        IonButton,
        // IonLabel,
        // IonItem,
        IonIcon,
        IonCol,
        // IonSelect,
        // IonSelectOption,
        IonRow,
        IonGrid,
        IonHeader,
        // IonImg,
        // IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent,
    } from '@ionic/vue';

    export default {
        name: 'ChangeSemesters',
        data() {
            return {
                chevronBackOutline,
                chevronForwardOutline,
                isOpenRef: false,
                subjectsInfo: {
                    maxscore_info: {
                    },
                    dateweek: {
                        start_week: '',
                        end_week: '',
                    }
                },
                scores: [],
                week: 0,
                semester: {},
            }
        },
        methods: {
            closeMe() {
                this.isOpenRef = false
                this.$emit('close-dialog', this.isOpenRef)
            },
            loadSubjectInfo() {
                Storage.methods.getSubjectInfo(this.subject_id).then((response) => {
                    this.subjectsInfo = response
                    Storage.methods.getSubjectsScores(this.subject_id).then((response) => {
                        this.scores = response
                    })
                })
            },
            changeWeek(status) {
                if (status === 'up') {
                    this.week++
                } else this.week--
                Storage.methods.getSubjectInfo(this.subject_id, this.semester.current_week + this.week).then((response) => {
                    this.subjectsInfo = response
                })
            }
        },
        props: {
            open_dialog: {
                type: Boolean
            },
            subject_id: {
                type: Number
            },
            subject_name: {
                type: String
            }
        },
        mounted() {
            this.isOpenRef = this.open_dialog
            this.loadSubjectInfo()
            this.semester = Storage.getItem('semester')
        },
        computed: {
            selectScores() {
                return this.scores.find(item => item.week === (this.semester.current_week + this.week) - 1)
            }
        },
        components: {
            // ExploreContainer,
            // IonInput,
            // IonSelectOption,
            IonModal,
            IonButton,
            IonCol,
            IonRow,
            IonHeader,
            IonIcon,
            IonGrid,
            // IonSelect,
            // IonImg,
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
    * {
        font-family: "Jost SemiBold", sans-serif;
        margin: 0;
        padding: 0;
        color: black;
    }


    /*ion-input {*/
    /*    background-color: #dcddde !important;*/
    /*    border-radius: 20px;*/
    /*    margin-top: 1em;*/
    /*    color: black;*/
    /*    font-family: "Jost SemiBold", sans-serif;*/
    /*    box-shadow: 0 0 2px #9c9d9d;*/
    /*}*/

    /*ion-grid {*/
    /*    margin: auto;*/
    /*    padding-top: 40%;*/
    /*}*/

    .select_years {
        --ion-color-step-850: #20b2aa;
        --placeholder-color: #474747;
        border: 1px solid #cfcfcf;
        border-radius: 30px;
        background-color: white;
        color: #414141;
    }

    h4 {
        color: #20b2aa;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 16pt;
        text-align: center;
    }

    .return {
        --ion-color-primary: #d65050;
        justify-content: center;
    }

    p {
        color: grey;
        text-align: center;
    }

    ion-icon {
        font-size: 24pt;
        color: lightseagreen;

    }
</style>