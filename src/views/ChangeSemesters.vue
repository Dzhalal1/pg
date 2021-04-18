<template>
    <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-select class="select_years" placeholder="Учебный год" v-model="select_year"
                                    ok-text="Принять" cancel-text="Отклонить">
                            <ion-select-option v-for="year in academic_years" :key="year.id" :value="year.id">
                                {{year.title}}
                            </ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-select class="select_years" placeholder="Семестр" v-model="select_semester" value="зкш"
                                    ok-text="Принять" cancel-text="Отклонить">
                            <ion-select-option v-for="semester in semesters" :key="semester.id" :value="semester.id">
                                {{semester.title}}
                            </ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-button type="submit" expand="full" fill="solid"
                                    @click="changeSemester"
                                    shape="round" size="large">
                            Сохранить
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row class="return">
                    <ion-col size="10">
                        <ion-button type="submit" expand="full" fill="solid"
                                    @click="closeMe"
                                    shape="round" size="large">
                            Отмена
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-modal>
</template>

<script>
    import Storage from "../plugins/storage";
    import {
        IonModal,
        // IonPage,
        // createAnimation,
        // IonInput,
        IonButton,
        // IonLabel,
        // IonItem,
        // IonIcon,
        IonCol,
        IonSelect,
        IonSelectOption,
        IonRow,
        IonGrid,
        toastController,

        // IonImg,
        // IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent
    } from '@ionic/vue';

    export default {
        name: 'ChangeSemesters',
        data() {
            return {
                isOpenRef: false,
                form: {
                    current_password: '',
                    new_password: '',
                },
                academic_years: [],
                select_year: 0,
                select_semester: 0,
            }
        },

        methods: {
            closeMe() {
                this.isOpenRef = false
                this.$emit('close-dialog', this.isOpenRef)
            },
            async changeSemester() {
                if (this.select_semester !== 0) {
                    if (Storage.is_student()) {
                        const groups = Storage.getItem('user').groups
                        if (groups.find((grp) => grp.semester === this.select_semester)) {
                            Storage.setItem('semester', this.semesters.find(item => item.id === this.select_semester))
                            Storage.methods.getGroupInfo().then(() => {
                                this.closeMe()
                            })
                            console.log("artem")
                        } else {
                            const toast = await toastController
                                .create({
                                    message: "Нет группы в данном семестре",
                                    position: 'bottom',
                                    translucent: true,
                                    cssClass: 'error-message',
                                    animated: true,
                                    duration: 2000
                                })
                            return toast.present();
                        }
                    } else {
                        Storage.setItem('semester', this.semesters.find(item => item.id === this.select_semester))
                        this.closeMe()
                    }
                }
            }
        },
        props: {
            open_dialog: {
                type: Boolean
            }
        },
        mounted() {
            this.isOpenRef = this.open_dialog
            Storage.methods.getAcademicYear().then((response) => {
                this.academic_years = response
            })
        },
        computed: {
            semesters() {
                if (this.select_year !== 0) {
                    return this.academic_years.find(item => item.id === this.select_year).semesters
                } else return []
            }
        },
        components: {
            // ExploreContainer,
            // IonInput,
            IonSelectOption,
            IonModal,
            IonButton,
            IonCol,
            IonRow,
            IonGrid,
            IonSelect,
            // IonImg,
            // IonRippleEffect,
            // IonLabel,
            // IonItem,
            // IonIcon,
            // IonHeader,
            // IonToolbar,
            // IonTitle,
            IonContent,

            // IonPage
        },
    }
</script>

<style scoped>
    * {
        font-family: "Jost SemiBold", sans-serif !important;
        font-size: 12pt;
    }

    ion-input {
        background-color: #f7f7f7 !important;
        border-radius: 20px;
        margin-top: 1em;
        color: black;
        font-family: "Jost SemiBold", sans-serif;
        box-shadow: 0 0 2px #9c9d9d;
    }

    ion-grid {
        margin: auto;
        padding-top: 40%;
    }

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

</style>