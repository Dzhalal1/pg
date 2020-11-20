<template>
    <ion-page>
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
                    <ion-row>
                        <ion-col class="login__input">
                            <ion-row>
                                <ion-col size="2" class="login__input__icon">
                                    <ion-icon :icon="person"></ion-icon>
                                </ion-col>
                                <ion-col size="10">
                                    <ion-input placeholder="Логин" type="email"></ion-input>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="login__input">
                            <ion-row>
                                <ion-col size="2" class="login__input__icon">
                                    <ion-icon :icon="lockClosed"></ion-icon>
                                </ion-col>
                                <ion-col size="10">
                                    <ion-input placeholder="Пароль" type="password"></ion-input>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-row class="ion-justify-content-center">
                                <ion-col size="8">
                                    <ion-button expand="full" fill="solid" shape="round" size="large">войти</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>
        </ion-grid>
        <ion-grid class="bac__image">
            <ion-row>
                <ion-col>
                    <ion-img :src="require('./../assets/img/background/myapp.svg')"></ion-img>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>

<script>
    import {
        IonPage,
        IonInput,
        IonButton,
        IonLabel,
        IonItem,
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

    export default {
        name: 'Login',
        components: {
            // ExploreContainer,
            IonInput,
            IonButton,
            IonCol,
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
                person
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
        font-family: "GeometriaMedium", sans-serif;
    }

    ion-icon {
        font-size: 25px;
        color: #acacac;
    }

    ion-col.login__input__icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }


    ion-button {
        font-family: "Geometria", sans-serif;
        font-weight: bold;
        margin-top: 0.5em;
        font-size: 12pt;
    }

    p {
        margin: auto;
        display: flex;
        justify-content: center;
        font-size: 16pt;
        color: black;
        font-family: "GeometriaMedium", sans-serif;
    }

    .bac__image {
        background: linear-gradient(-360deg, lightseagreen, rgba(45, 178, 170, 0));
        width: 100%;
    }

    ion-img {
        height: 120px;
    }
</style>