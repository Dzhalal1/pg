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
                    <p>{{ semester.title }}</p>
                </ion-col>
            </ion-row>
        </ion-header>
        <ion-content>
            <ion-grid class="subjects">
                <ion-row v-for="subject in subjects" :key="subject.id">
                    <ion-col>
                        <p>{{ subject.name }}</p>
                    </ion-col>
                    <ion-col class="ion-text-end">
                        <p v-if="subject.subject_teachers.find(item => item.head)">
                            {{ subject.subject_teachers.find(item => item.head).fullname }}
                        </p>

                    </ion-col>
                    <ion-col size="12">
                        <ion-row>
                            <ion-col v-if="subject.eios_course_id">
                                <ion-button expand="block"
                                            :href="'https://eios.kgsxa.ru/course/view.php?id='+subject.eios_course_id">
                                    Курс в еиос
                                </ion-button>

                            </ion-col>
                            <ion-col>
                                <ion-button expand="block" @click="openScoresTable(subject)">
                                    Журнал
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>

            </ion-grid>
            <teacher-scores-table :open_dialog="teacher_open" @close-dialog="closeScorestable"
                                  :subject_id="selectedSubject.id" :disabled="is_student"
                                  :subject_name="selectedSubject.name" v-if="teacher_open">

            </teacher-scores-table>
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
        IonButton, loadingController, toastController,
    } from '@ionic/vue';
    import {chevronBackOutline} from 'ionicons/icons';
    import Storage from "../plugins/storage";
    // import ScoresTable from "../views/ScoresTable";
    import TeacherScoresTable from "./TeacherScoresTable";

    export default {
        name: "ListSubjects",
        components: {
            TeacherScoresTable,
            IonPage,
            IonHeader,
            IonContent,
            IonGrid,
            IonCol,
            IonRow,
            IonIcon,
            IonButton,
            // ScoresTable
        },
        data() {
            return {
                chevronBackOutline,
                subjects: [],
                open: false,
                selectedSubject: [],
                semester: {},
                is_student: Storage.is_student(),
                teacher_open: false
            }
        },

        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            closeScorestable(data) {
                this.open = false
                this.teacher_open = false
            },
            openScoresTable(subject) {
                this.selectedSubject = subject
                // this.open = Storage.is_student()
                this.teacher_open = true
            },
            async loadSubjects() {
                const loading = await loadingController.create({
                    cssClass: 'loading',
                    message: 'Загрузка',
                    animated: true,
                    spinner: 'crescent',
                    translucent: true,
                })
                await loading.present();
                Storage.methods.getSubjects().then((response) => {
                    this.subjects = response
                }).catch(async (error) => {
                    const message = error.message
                    const toast = await toastController
                        .create({
                            message,
                            position: 'bottom',
                            translucent: true,
                            cssClass: 'error-message',
                            animated: true,
                            duration: 3000
                        })
                    return toast.present()
                }).finally(() => {
                    loading.dismiss()
                })
            },
        },
        mounted() {
            this.loadSubjects()
            this.semester = Storage.getItem('semester')
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
        background-color: #f7f7f7 !important;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

    .ion-text-center {
        /*--ion-color-primary: #196FBF;*/
    }

    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        font-size: 10pt;
    }

    .return {
        font-size: 25pt;
        color: lightseagreen;
    }

    ion-header {
        background-color: lightseagreen;
        padding-top: 20px;
        padding-bottom: 20px;
        color: white !important;
    }

    ion-header ion-icon {
        color: white !important;
    }

    ion-header p {
        color: white !important;
    }


</style>