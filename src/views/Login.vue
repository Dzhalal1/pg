<template>
    <ion-page>
        <ion-img :src="require('./../assets/img/background/back.svg')"></ion-img>
        <ion-grid fixed="default">
            <ion-row>
                <ion-col>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    <p>Авторизация</p>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="10" class="login__input">
                            <ion-row>
                                <ion-col size="2" class="login__input__icon">
                                    <ion-icon :icon="person"></ion-icon>
                                </ion-col>
                                <ion-col size="10">
                                    <ion-input placeholder="Логин" v-model="formLogin.username"></ion-input>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-col class="login__input" size="10">
                            <ion-row>
                                <ion-col size="2" class="login__input__icon">
                                    <ion-icon :icon="lockClosed"></ion-icon>
                                </ion-col>
                                <ion-col size="10">
                                    <ion-input placeholder="Пароль" type="password"
                                               v-model="formLogin.password"></ion-input>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-col style="padding: 0;" size="10">
                            <ion-button type="submit" expand="full" fill="solid" shape="round" size="large"
                                        @click="submit">Вход
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>

        </ion-grid>
        <ion-footer>
            <ion-row>
                <ion-col>
                    <h5>ФГБОУ ВО Костромская ГСХА</h5>
                </ion-col>
            </ion-row>
        </ion-footer>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        IonInput,
        IonButton,
        IonLabel,
        IonItem,
        IonFooter,
        IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        IonImg,
        IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        // IonContent
    } from '@ionic/vue';
    import ExploreContainer from '@/components/ExploreContainer.vue';
    import {lockClosed, person} from 'ionicons/icons';
    import http from "@/plugins/axios";
    // import { IonicStorageModule } from '@ionic/storage';
    import Storage from "@/plugins/storage";

    export default {
        name: 'Login',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonCol,
            IonFooter,
            IonRow,
            IonGrid,
            IonImg,
            // IonRippleEffect,
            // IonLabel,
            // IonItem,
            IonIcon,
            // IonHeader,
            // IonToolbar,
            // IonTitle,
            // IonContent,
            IonPage
        },
        setup() {
            return {
                lockClosed,
                person,
                formLogin: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            submit() {
                Storage.methods.getToken(this.formLogin).then(() => {
                    Storage.methods.getUserInfo().then(() => {
                        Storage.methods.getLastSemester().then(() => {
                            if (Storage.is_student()) {
                                Storage.methods.getGroupInfo().then(() => {
                                    this.$router.push({name: 'Home'})
                                })
                            } else {
                                this.$router.push({name: 'Home'})
                            }
                        })
                    })
                })
            }
        }
    }
</script>

<style scoped>
    ion-col.login__input {
        background-color: #E5E7E9 !important;
        border-radius: 30px;
        margin-top: 1em;
    }

    ion-col.login__input ion-input {
        color: gray;
        font-family: "Jost SemiBold", sans-serif;
    }

    ion-icon {
        font-size: 20px;
        color: #acacac;
    }

    ion-col.login__input__icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }


    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        margin-top: 0.7em;
        font-size: 18pt;
    }

    p {
        margin: auto;
        display: flex;
        justify-content: center;
        font-size: 16pt;
        color: #20b2aa;
        font-family: "Jost SemiBold", sans-serif;
    }

    h5 {
        color: #20b2aa;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 12pt;
        text-align: center;
    }

    .row__academy {
        display: table-cell;
        position: absolute;
        bottom: 0;
        left: auto;
        width: 100%;
    }
</style>