<template>
    <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
        <ion-page>
            <ion-header>
                <ion-row>
                    <ion-col>
                        <!--                        <ion-button>-->
                        <ion-icon @click="closeMe()" :icon="chevronBackOutline"/>
                        <!--                        </ion-button>-->
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <p>{{subject_name}}</p>
                    </ion-col>
                </ion-row>
            </ion-header>
            <ion-content>
                <ion-grid>
                    <ion-row class="week">
                        <ion-col size="2" class="ion-text-end">
                            <ion-button :disabled="(semester.current_week + week) === 1" @click="changeWeek('down')"
                                        fill="clear">
                                <ion-icon
                                        :icon="chevronBackOutline"/>
                            </ion-button>
                        </ion-col>
                        <ion-col size="8" style="margin-top: -8px !important;">
                            <p>{{semester.current_week + week}} неделя</p>
                            <p>{{subjectsInfo.dateweek.start_week}} - {{subjectsInfo.dateweek.end_week}}</p>
                        </ion-col>
                        <ion-col size="2" class="ion-text-start">
                            <ion-button :disabled="(semester.current_week + week) === 32" @click="changeWeek('up')"
                                        fill="clear">
                                <ion-icon
                                        :icon="chevronForwardOutline"/>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row class="score">
                        <ion-col>
                            <ion-row>
                                <ion-col size="4" class="ion-text-start">
                                    Пропуск
                                </ion-col>
                                <ion-col>{{subjectsInfo.maxscore_info.more}}</ion-col>
                                <ion-col class="ion-text-end">{{selectScores.missed}} из
                                    {{subjectsInfo.maxscore_info.missed}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="4" class="ion-text-start">
                                    Контроль
                                </ion-col>
                                <ion-col>{{subjectsInfo.maxscore_info.check_forms}}</ion-col>
                                <ion-col class="ion-text-end">{{selectScores.reference_work}} из
                                    {{subjectsInfo.maxscore_info.reference_work}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="4" class="ion-text-start">
                                    Активность
                                </ion-col>
                                <ion-col>{{subjectsInfo.maxscore_info.active_more}}</ion-col>
                                <ion-col class="ion-text-end">{{selectScores.active}} из
                                    {{subjectsInfo.maxscore_info.active}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="4" class="ion-text-start">
                                    Самост. работа
                                </ion-col>
                                <ion-col>{{subjectsInfo.maxscore_info.sam_more}}</ion-col>
                                <ion-col class="ion-text-end">{{selectScores.home_work}} из
                                    {{subjectsInfo.maxscore_info.home_work}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col class="ion-text-start">
                                    Фактический
                                    рейтинг-балл
                                    к текущей неделе
                                </ion-col>

                                <ion-col class="ion-text-end">
                                    {{summsSores.Rfact}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col class="ion-text-start">
                                    Текущая успеваемость
                                    студента (%)
                                </ion-col>
                                <ion-col class="ion-text-end">
                                    {{summsSores.R}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col class="ion-text-start">
                                    Оценка в традиционных
                                    баллах к текущей неделе
                                </ion-col>
                                <ion-col class="ion-text-end">
                                    {{summsSores.mark}}
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col class="ion-text-start">
                                    Максимальный балл
                                </ion-col>
                                <ion-col class="ion-text-end">
                                    {{subjectsInfo.Rmax.Rmax}}
                                </ion-col>
                            </ion-row>
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
        IonContent, loadingController, toastController,
    } from '@ionic/vue';

    export default {
        name: 'ScoresTable',
        data() {
            return {
                chevronBackOutline,
                chevronForwardOutline,
                isOpenRef: false,
                subjectsInfo: {
                    maxscore_info: {},
                    Rmax: {},
                    dateweek: {
                        start_week: '',
                        end_week: '',
                    }
                },
                scores: [],
                week: 0,
                semester: {current_week: 0},
                summsSores: {},


            }
        },
        methods: {
            closeMe() {
                this.isOpenRef = false
                this.$emit('close-dialog', this.isOpenRef)
            },
            async loadSubjectInfo() {
                const loading = await loadingController.create({
                    cssClass: 'loading',
                    message: 'Загрузка',
                    animated: true,
                    spinner: 'crescent',
                    translucent: true,
                })
                await loading.present();
                Storage.methods.getSubjectInfo(this.subject_id).then((response) => {
                    this.subjectsInfo = response
                    this.summSores()
                    Storage.methods.getSubjectsScores(this.subject_id).then((response) => {
                        this.scores = response
                    })
                }).catch(async (error) => {
                    let message = 'Ошибка сервера.'
                    if (error.response.data.errors)
                        message = error.response.data.errors[0].detail
                    else
                        message += ' Ошибка номер ' + error.response.status
                    const toast = await toastController
                        .create({
                            message,
                            position: 'bottom',
                            translucent: true,
                            cssClass: 'error-message',
                            animated: true,
                            duration: 3000
                        })
                    return toast.present();
                }).finally(() => {
                    loading.dismiss()
                })
            },
            changeWeek(status) {
                if (status === 'up') {
                    this.week++
                } else this.week--
                Storage.methods.getSubjectInfo(this.subject_id, this.semester.current_week + this.week).then((response) => {
                    this.subjectsInfo = response
                    this.summSores()
                })
            },
            summSores() {
                let activ_sum = 0
                let missed_sum = 0
                let ref_work_sum = 0
                let home_work_sum = 0
                let Rfact = 0
                let R = 0
                let mark = ''
                this.scores.forEach(item => {
                    activ_sum += Number(item.active)
                    missed_sum += parseFloat(item.missed)
                    home_work_sum += parseFloat(item.home_work)
                    ref_work_sum += parseFloat(item.reference_work)
                })

                if (this.subjectsInfo.stype != 3 && this.subjectsInfo.stype != 5 && this.subjectsInfo.stype != 6) {
                    Rfact = activ_sum * this.subjectsInfo.coeficients.active_coefficient + home_work_sum * this.subjectsInfo.coeficients.home_work_coefficient + (this.subjectsInfo.Rmax['sum_missed'] - missed_sum) * this.subjectsInfo.coeficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coeficients.reference_work_coefficient
                } else {
                    Rfact = activ_sum * this.subjectsInfo.coeficients.active_coefficient + home_work_sum * this.subjectsInfo.coeficients.home_work_coefficient + (missed_sum) * this.subjectsInfo.coeficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coeficients.reference_work_coefficient
                }
                R = Rfact / this.subjectsInfo.Rmax['Rmax'] * 100
                R = R > 100 ? 100 : R
                R = (Math.round(R * 100) / 100)
                if (R <= 100 && R > 85.6) {
                    mark = 5
                } else if (R < 85.5 && R >= 64.6) {
                    mark = 4
                } else if (R < 64.5 && R >= 49.6) {
                    mark = 3
                } else if (R < 49.6) {
                    mark = 2
                }
                this.summsSores = {
                    'active': Math.round(activ_sum),
                    'missed': Math.round(missed_sum * 100) / 100,
                    'home_work': Math.round(home_work_sum * 100) / 100,
                    'reference_work': Math.round(ref_work_sum * 100) / 100,
                    'Rfact': Math.round(Rfact * 100) / 100,
                    'R': (Math.round(R * 100) / 100),
                    'mark': mark
                }
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
            this.semester = Storage.getItem('semester')
            this.loadSubjectInfo()
        },
        computed: {
            selectScores() {
                if (this.scores.find(item => item.week === (this.semester.current_week + this.week) - 1))
                    return this.scores.find(item => item.week === (this.semester.current_week + this.week) - 1)
                else return {
                    missed: 0,
                    reference_work: 0,
                    home_work: 0,
                    active: 0,
                }
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
        color: grey;

    }

    p {
        text-align: center;
        font-size: 11pt;

    }

    ion-icon {
        font-size: 25pt;
        color: lightseagreen;

    }

    .score {
        margin: 5px;
    }

    .score ion-row {
        font-family: "Jost SemiBold", sans-serif;
        font-size: 11pt;
        padding: 15px;
        margin-top: 15px;
        background-color: white;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

    .week {
        margin-top: 15px;
    }

    ion-header {
        background-color: lightseagreen;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    ion-header ion-icon {
        color: white !important;
    }

    ion-header p {
        color: white !important;
        margin-bottom: 20px;
    }

</style>