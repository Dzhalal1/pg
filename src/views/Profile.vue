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
                        <ion-input>

                        </ion-input>
                        <ion-row>
                            <ion-col>
                                <h5>Имя</h5>
                                <ion-input>

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Отчество</h5>
                                <ion-input>

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Почта</h5>
                                <ion-input>

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h5>Телефон</h5>
                                <ion-input>

                                </ion-input>
                            </ion-col>
                        </ion-row>
                        <ion-row class="profile__btn">
                            <ion-col>
                                <ion-button type="submit" expand="full" fill="solid" shape="round" size="large">
                                    Сменить пароль

                                </ion-button>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-button type="submit" expand="full" fill="solid" shape="round" size="large">
                                    Сохранить

                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        IonPage,
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

    export default {
        name: 'Home',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonCol,
            IonRow,
            IonGrid,
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
                user: {
                    username: 'Login'
                }
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
        background-color: lightseagreen;
    }

    h1 {
        padding: 50px;
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
        color: black;
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