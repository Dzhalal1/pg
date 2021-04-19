<template>
    <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
        <ion-page>
            <ion-header>
                <ion-row>
                    <ion-col>
                        <ion-icon @click="closeMe()" :icon="chevronBackOutline"/>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col class="ion-text-center">
                        <p>{{ subject_name }} ({{ selectGroup.group }})</p>
                    </ion-col>
                </ion-row>
                <ion-row class="week">
                    <ion-col size="2" class="ion-text-end">
                        <ion-button :disabled="(semester.current_week + week) === 1" @click="changeWeek('down')"
                                    fill="clear">
                            <ion-icon
                                    :icon="chevronBackOutline"/>
                        </ion-button>
                    </ion-col>
                    <ion-col size="8" style="margin-top: -8px !important;">
                        <p>{{ semester.current_week + week }} неделя</p>
                        <p>{{ getDateWeek(semester.current_week + week ).week_start }} - {{
                            getDateWeek(semester.current_week + week ).week_end }}</p>
                    </ion-col>
                    <ion-col size="2" class="ion-text-start">
                        <ion-button :disabled="(semester.current_week + week) === 32" @click="changeWeek('up')"
                                    fill="clear">
                            <ion-icon :icon="chevronForwardOutline"/>
                        </ion-button>
                    </ion-col>
                </ion-row>

            </ion-header>
            <ion-content>
                <ion-grid>
                    <ion-row>
                        <ion-col v-for="group in subjectsInfo.groups" :key="group.id">
                            <ion-button expand="full" color="primary" @click="setGroup(group)">
                                {{ group.group }}
                            </ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row class="score">
                        <ion-col>
                            <ion-row v-for="score in selectScores" :key="score.id">
                                <ion-col size="10" class="ion-text-start">
                                    {{ score.fullname }}
                                </ion-col>
                                <ion-col>{{sumSores(score.student).Rfact }}
                                </ion-col>
                                <ion-col size="12">
                                    <ion-row>
                                        <ion-col class="ion-text-center">
                                            <span v-if="subjectsInfo.type_id === 3 || subjectsInfo.type_id === 5">Посещяемость</span>
                                            <span v-else>Пропуск</span><br>
                                            {{ maxscoreInfo.missed }}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            <span v-if="subjectsInfo.type_id === 3 || subjectsInfo.type_id === 5">Эл-ты НИ</span>
                                            <span v-else>Контроль</span><br>
                                            {{ maxscoreInfo.reference_work }}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            <span v-if="subjectsInfo.type_id === 3 || subjectsInfo.type_id === 5">Защита</span>
                                            <span v-else>Сам. работа</span><br>
                                            {{ maxscoreInfo.home_work }}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            Активность<br>
                                            {{ maxscoreInfo.active }}
                                        </ion-col>
                                    </ion-row>
                                    <ion-row v-if="!disabled">
                                        <ion-col style="text-align: center">
                                            <ion-input type="number"
                                                       :disabled='Number(maxscoreInfo.missed) === 0'
                                                       @keyup="score.missed = Number(score.missed) > Number(maxscoreInfo.missed) ? maxscoreInfo.missed : Number(score.missed)"
                                                       @change="saveScores(score)"
                                                       v-model="score.missed"></ion-input>
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            <ion-input type="number"
                                                       :disabled='maxscoreInfo.reference_work === 0'
                                                       @keyup="score.reference_work = Number(score.reference_work) > Number(maxscoreInfo.reference_work) ? maxscoreInfo.reference_work : Number(score.reference_work)"
                                                       @change="saveScores(score)"
                                                       v-model="score.reference_work"></ion-input>
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            <ion-input type="number"
                                                       :disabled='maxscoreInfo.home_work === 0'
                                                       @keyup="score.home_work = Number(score.home_work) > Number(maxscoreInfo.home_work) ? maxscoreInfo.home_work :Number(score.home_work)"
                                                       @change="saveScores(score)"
                                                       v-model="score.home_work"></ion-input>
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            <ion-input type="number"
                                                       :disabled='maxscoreInfo.active === 0'
                                                       @keyup="score.active = Number(score.active) > Number(maxscoreInfo.active) ? maxscoreInfo.active :Number(score.active)"
                                                       @change="saveScores(score)"
                                                       v-model="score.home_work"></ion-input>
                                        </ion-col>
                                    </ion-row>
                                    <ion-row v-else>
                                        <ion-col style="text-align: center">
                                            {{score.missed}}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            {{score.reference_work}}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            {{score.home_work}}
                                        </ion-col>
                                        <ion-col class="ion-text-center">
                                            {{score.home_work}}
                                        </ion-col>
                                    </ion-row>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-col size="12" class="ion-text-end">
                                <!--                                <ion-button v-if="!is_student" @click="signStatement(statement.id)"-->
                                <!--                                            :disabled="!statement.open">-->
                                <!--                                    Подписать-->
                                <!--                                </ion-button>-->
                                Дата закрытия ведомости{{dateClose}}
                            </ion-col>
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
        IonButton,
        IonCol,
        IonContent,
        IonGrid,
        IonHeader,
        IonIcon,
        IonInput,
        IonModal,
        IonPage,
        IonRow,
        loadingController,
        toastController,
    } from '@ionic/vue';

    export default {
        name: 'TeacherScoresTable',
        props: {
            open_dialog: {
                type: Boolean
            },
            subject_id: {
                type: Number
            },
            disabled: {
                type: Boolean,
                default: false
            },
            subject_name: {
                type: String
            }
        },
        data() {
            return {
                chevronBackOutline,
                chevronForwardOutline,
                isOpenRef: false,
                selectGroup: {group: 0},
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
            setGroup(group) {
                this.selectGroup = group
            },
            getDateWeek(week) {
                const date_start = new Date(this.semester.start)
                const date = {
                    week_start: new Date(date_start.getTime() + 7 * (week - 1) * 86400000),
                    week_end: new Date(date_start.getTime() + (7 * (week - 1) + 5) * 86400000)
                }

                function formatDate(date) {
                    let dd = date.getDate();
                    if (dd < 10) dd = '0' + dd;
                    let mm = date.getMonth() + 1;
                    if (mm < 10) mm = '0' + mm;
                    let yy = date.getFullYear() % 100;
                    if (yy < 10) yy = '0' + yy;
                    return dd + '.' + mm + '.' + yy;
                }

                return {
                    week_start: formatDate(date.week_start),
                    week_end: formatDate(date.week_end)
                }
            },
            saveScores(row) {
                Storage.methods.saveScore(row)
            },
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
                    const groups = Storage.getItem('user').groups
                    const group = groups !== null ? groups.find((grp) => grp.semester === this.semester.id) : undefined
                    this.subjectsInfo = response
                    this.selectGroup = Storage.is_student() ? group : this.subjectsInfo.groups[0]
                    this.scores = response.scores
                }).catch(async (error) => {
                    console.log(error)
                    // let message = 'Ошибка сервера.'
                    // if (error.response.data.errors)
                    //     message = error.response.data.errors[0].detail
                    // else
                    //     message += ' Ошибка номер ' + error.response.status
                    // const toast = await toastController
                    //     .create({
                    //         message,
                    //         position: 'bottom',
                    //         translucent: true,
                    //         cssClass: 'error-message',
                    //         animated: true,
                    //         duration: 3000
                    //     })
                    // return toast.present();
                }).finally(() => {
                    loading.dismiss()
                })
            },
            changeWeek(status) {
                if (status === 'up') {
                    this.week++
                } else this.week--
            },
            sumSores(student) {
                if (this.subjectsInfo.coefficients === undefined) {
                    return {
                        'active': 0,
                        'missed': 0,
                        'home_work': 0,
                        'reference_work': 0,
                        'Rfact': 0,
                        'R': 0,
                        'mark': 0
                    }
                }
                const a = this.scores.filter(value => value.student === student)
                let activ_sum = 0
                let missed_sum = 0
                let ref_work_sum = 0
                let home_work_sum = 0
                let Rfact = 0
                let R = 0
                let mark = ''
                a.forEach(item => {
                    activ_sum += Number(item.active)
                    missed_sum += parseFloat(item.missed)
                    home_work_sum += parseFloat(item.home_work)
                    ref_work_sum += parseFloat(item.reference_work)
                })

                if (this.subjectsInfo.type !== 3 && this.subjectsInfo.type !== 5 && this.subjectsInfo.type !== 6) {
                    Rfact = activ_sum * this.subjectsInfo.coefficients.active_coefficient + home_work_sum * this.subjectsInfo.coefficients.home_work_coefficient + (this.subjectsInfo.max_scores.sum_missed - missed_sum) * this.subjectsInfo.coefficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coefficients.reference_work_coefficient
                } else {
                    Rfact = activ_sum * this.subjectsInfo.coefficients.active_coefficient + home_work_sum * this.subjectsInfo.coefficients.home_work_coefficient + (missed_sum) * this.subjectsInfo.coefficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coefficients.reference_work_coefficient
                }
                R = Rfact / this.subjectsInfo.max_scores.Rmax * 100
                R = R > 100 ? 100 : R
                R = (Math.round(R * 100) / 100)
                if (R <= 100 && R > 85.5) {
                    mark = 5
                } else if (R < 85.5 && R >= 64.5) {
                    mark = 4
                } else if (R < 64.5 && R >= 49.6) {
                    mark = 3
                } else if (R < 49.6) {
                    mark = 2
                }
                return {
                    'active': Math.round(activ_sum),
                    'missed': Math.round(missed_sum * 100) / 100,
                    'home_work': Math.round(home_work_sum * 100) / 100,
                    'reference_work': Math.round(ref_work_sum * 100) / 100,
                    'Rfact': Math.round(Rfact * 100) / 100,
                    'R': (Math.round(R * 100) / 100),
                    'mark': mark
                }

            },

        },
        mounted() {
            this.isOpenRef = this.open_dialog
            this.semester = Storage.getItem('semester')
            this.loadSubjectInfo()
        },
        computed: {
            selectScores() {
                let scores = []
                if (this.selectGroup.id !== 0) {
                    scores = this.scores.filter(item => item.week === (this.semester.current_week + this.week) && Number(item.group) === Number(this.selectGroup.id))
                } else {
                    scores = this.scores.filter(item => item.week === (this.semester.current_week + this.week))
                }
                if (scores)
                    return scores.sort((a, b) => {
                        if (a.fullname > b.fullname) {
                            return 1;
                        }
                        if (a.fullname < b.fullname) {
                            return -1;
                        }
                        return 0;
                    })
                else return []
            },
            maxscoreInfo() {
                const indicators = this.subjectsInfo.week_indicators.find(indicators => Number(indicators.week) === Number(this.semester.current_week + this.week))
                if (indicators) {
                    return indicators
                } else {
                    return {
                        active: 0,
                        active_more: "",
                        home_work: 0,
                        home_work_more: "",
                        missed: 0,
                        missed_more: "",
                        reference_work: 0,
                        reference_work_more: "",
                        week: "",
                    }
                }
            },
            dateClose() {
                let date_close = ''
                if (this.subjectsInfo.dates_close) {
                    date_close = this.subjectsInfo.dates_close.find(date => date.group_id === this.selectGroup.id)
                    if (date_close){
                        date_close = date_close.date_close
                    }
                }
                return date_close
            }
        },
        components: {
            // ExploreContainer,
            IonInput,
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
        font-size: 10pt;


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
        font-size: 8pt !important;
        padding: 15px;
        margin-top: 15px;
        background-color: #f7f7f7 !important;
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

    .group {
        color: white;
    }

    ion-input {
        background-color: #dcddde !important;
        border-radius: 2px;
        color: grey !important;
        font-family: "Jost SemiBold", sans-serif;
        box-shadow: 0 0 2px #9c9d9d;
    }

</style>