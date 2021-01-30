<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row class="bc__profile">
                    <ion-col>
                        <ion-row>
                            <ion-col size="8" class="ion-text-center">
                                <h1>{{ user.username }}</h1>
                            </ion-col>
                            <ion-col size="3" class="ion-text-end">
                                <ion-icon @click="logout()" :icon="exitOutline"/>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
                <ion-row class="bc__profile">
                    <ion-col class="bc__main">
                        <h5>Фамилия</h5>
                        <ion-input v-model="user.last_name">

                        </ion-input>
                        <ion-row>
                            <ion-col>
                                <h5>Имя</h5>
                                <ion-input v-model="user.first_name">

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Отчество</h5>
                                <ion-input v-model="user.father_name">

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Почта</h5>
                                <ion-input v-model="user.email">

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Телефон</h5>
                                <ion-input v-model="user.phone">

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row v-if="!is_student">
                            <ion-col>
                                <ion-radio-group v-model="selected_learning_form" @IonChange="changeLearnForm">
                                    <ion-list-header>
                                        <ion-label>
                                            <h5>Форма обучения</h5>
                                        </ion-label>
                                    </ion-list-header>
                                    <ion-radio :value="1"></ion-radio>
                                    <ion-label class="label">Очно</ion-label>
                                    <br>
                                    <ion-radio :value="2"></ion-radio>
                                    <ion-label class="label">Заочно</ion-label>
                                </ion-radio-group>
                            </ion-col>
                        </ion-row>
                        <ion-row class="profile__btn">
                            <ion-col>
                                <ion-button type="submit" @click="open_dialog = true" expand="full" fill="solid"
                                            shape="round" size="large">
                                    Сменить пароль

                                </ion-button>
                            </ion-col>
                        </ion-row>
                        <!--                        <ion-row class="click">-->
                        <!--                            <ion-col>-->
                        <!--                                <ion-button type="submit" @click="open_semesters = true" expand="full" fill="solid"-->
                        <!--                                            shape="round" size="large">-->
                        <!--                                    Сменить семестр-->
                        <!--                                </ion-button>-->
                        <!--                            </ion-col>-->
                        <!--                        </ion-row>-->
                        <ion-row>
                            <ion-col>
                                <ion-button @click="saveUser" type="submit" expand="full" fill="solid" shape="round"
                                            size="large">
                                    Сохранить
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <change-password :open_dialog="open_dialog" @close-dialog="closeChangePassword"
                             v-if="open_dialog"></change-password>
            <!--            <change-semesters :open_dialog="open_semesters" @close-dialog="closeChangeSemesters"-->
            <!--                              v-if="open_semesters"></change-semesters>-->
        </ion-content>
    </ion-page>
</template>

<script>
    import ChangePassword from "./ChangePassword";
    // import ChangeSemesters from "./ChangeSemesters";
    import {
        IonPage,
        IonRadioGroup,
        IonListHeader,
        IonLabel,
        modalController,
        IonItem,
        IonRadio,
        // createAnimation,
        IonInput,
        IonButton,
        // IonLabel,

        // IonItem,
        IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        // IonImg,
        // IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent, toastController
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import {exitOutline, person} from 'ionicons/icons';
    import Storage from "../plugins/storage";

    export default {
        name: 'Profile',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonIcon,
            // IonItem,
            IonCol,
            IonRow,
            IonRadio,
            IonGrid,
            ChangePassword,
            IonRadioGroup,
            IonListHeader,
            IonLabel,
            // ChangeSemesters,
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
        data() {
            return {
                open_dialog: false,
                is_student: false,
                selected_learning_form: 1,
                // open_semesters: false,
                exitOutline,
                user: {
                    email: "",
                    father_name: "",
                    first_name: "",
                    last_name: "",
                    phone: "",
                    username: "",
                }
            }
        },
        created() {
            const user = Storage.getItem('user')
            this.selected_learning_form = Storage.getItem('learning_form')
            this.is_student = Storage.is_student()
            this.user.father_name = user.father_name
            this.user.first_name = user.first_name
            this.user.last_name = user.last_name
            this.user.email = user.email
            this.user.phone = user.phone
            this.user.username = user.username
            this.user.id = user.id
        },
        methods: {
            changeLearnForm(data) {
                Storage.setItem('learning_form', data.detail.value)
            },
            async openChangePass() {
                const modal = await modalController.create({
                    component: ChangePassword
                })
                return modal.present()
            },
            closeChangePassword(data) {
                this.open_dialog = data
            },
            // closeChangeSemesters(data) {
            //     this.open_semesters = data
            // },
            saveUser() {
                const fd = new FormData()
                for (const key in this.user) {
                    fd.set(key, this.user[key])
                }
                Storage.methods.putUserInfo({id: this.user.id, form: fd}).then(async () => {
                    const toast = await toastController
                        .create({
                            message: 'Данные успешно сохранены',
                            position: 'top',
                            translucent: true,
                            cssClass: 'success-message',
                            animated: true,
                            duration: 3000
                        })
                    return toast.present();
                }).catch(async (error) => {
                    let message = 'Ошибка сервера.'
                    if (error.response.data.errors)
                        message = error.response.data.errors[0].detail
                    else
                        message += ' Ошибка номер ' + error.response.status
                    const toast = await toastController
                        .create({
                            message,
                            position: 'top',
                            translucent: true,
                            cssClass: 'error-message',
                            animated: true,
                            duration: 3000
                        })
                    return toast.present();
                })
            },
            logout() {
                Storage.methods.signOut()
                // this.$router.push({
                //     name: 'Home'
                // })
                window.location.replace('/login')
            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        font-family: "Jost SemiBold", sans-serif;
        /*background-color: white !important;*/
    }

    .bc__profile {
        background-color: #20b2aa;
        color: white !important;
    }

    h1 {
        padding: 10px;
        color: white;
        font-size: 19pt;
    }

    .bc__main {
        background-color: white !important;
        padding: 50px;
        margin-top: 50px;
        border-radius: 20px 20px 0 0;
        -webkit-box-shadow: -5px -20px 20px -15px rgba(50, 50, 50, 0.45);
        -moz-box-shadow: -5px -20px 20px -15px rgba(50, 50, 50, 0.45);
        box-shadow: -5px -20px 20px -15px rgba(50, 50, 50, 0.45);
    }


    ion-input {
        background-color: #f7f7f7 !important;
        border-radius: 20px;
        margin-top: 1em;
        color: grey !important;
        font-family: "Jost SemiBold", sans-serif;
        box-shadow: 0 0 2px #9c9d9d;
    }

    h5 {
        margin-top: 20px;
        color: black;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 12pt;
    }

    .label {
        margin-top: 20px;
        color: black;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 12pt;
        vertical-align: top;
        padding-left: 5px;
    }

    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        margin-top: 0.5em;
        font-size: 12pt;
    }

    .profile__btn {
        margin-top: 30px;
        --ion-color-primary: #155799;

    }

    .click {
        --ion-color-primary: #155799;
    }

    ion-item {
        background-color: red !important;
    }

    .ion-text-end {
        font-size: 25pt;
        margin-right: 10px;
        margin-top: 10px;
    }

    .ion-text-center {
        margin-right: 10px;
        margin-top: 10px;
    }


</style>