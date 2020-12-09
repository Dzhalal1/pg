<template>
    <ion-page>
        <ion-content>
            <ion-grid fixed="default">
                <ion-row class="bc__profile">
                    <h1>{{user.username}}</h1>
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
                        <ion-row class="profile__btn">
                            <ion-col>
                                <ion-button type="submit" @click="open_dialog = true" expand="full" fill="solid"
                                            shape="round" size="large">
                                    Сменить пароль

                                </ion-button>
                            </ion-col>
                        </ion-row>
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
        </ion-content>
    </ion-page>
</template>

<script>
    import ChangePassword from "./ChangePassword";
    import {
        IonPage,
        modalController,
        // createAnimation,
        IonInput,
        IonButton,
        // IonLabel,
        // IonItem,
        // IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        IonImg,
        IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import {lockClosed, person} from 'ionicons/icons';
    import Storage from "../plugins/storage";

    export default {
        name: 'Profile',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonCol,
            IonRow,
            IonGrid,
            ChangePassword,
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
        mounted() {
            const user = Storage.getItem('user')
            this.user.father_name = user.father_name
            this.user.first_name = user.first_name
            this.user.last_name = user.last_name
            this.user.email = user.email
            this.user.phone = user.phone
            this.user.username = user.username
            this.user.id = user.id
        },
        methods: {
            async openChangePass() {
                const modal = await modalController.create({
                    component: ChangePassword
                })
                return modal.present()
            },
            closeChangePassword(data) {
                this.open_dialog = data
            },
            saveUser() {
                const fd = new FormData()
                for (const key in this.user) {
                    fd.set(key, this.user[key])
                }

                Storage.methods.putUserInfo({id: this.user.id, form: fd})
            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        font-family: "Jost SemiBold", sans-serif;
    }

    .bc__profile {
        background-color: #20b2aa;
    }

    h1 {
        padding: 50px;
        color: white;
    }

    .bc__main {
        background-color: #ececec;
        padding: 50px;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 0 20px dimgray;
    }

    ion-input {
        background-color: #dcddde !important;
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

    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        margin-top: 0.5em;
        font-size: 12pt;
    }

    .profile__btn {
        padding-top: 30px;
    }


</style>