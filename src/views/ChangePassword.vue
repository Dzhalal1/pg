<template>
    <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-input placeholder="Текущий пароль" type="password" v-model="form.current_password">

                        </ion-input>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-input placeholder="Новый пароль" type="password" v-model="form.new_password">

                        </ion-input>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="10">
                        <ion-button type="submit" expand="full" fill="solid"
                                    @click="changePassword"
                                    shape="round" size="large">
                            Сменить пароль
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center">
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
        IonInput,
        IonButton,
        // IonLabel,
        // IonItem,
        // IonIcon,
        IonCol,
        IonRow,
        IonGrid,
        // IonImg,
        // IonRippleEffect,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        IonContent
    } from '@ionic/vue';

    export default {
        name: 'ChangePassword',
        data() {
            return {
                isOpenRef: false,
                form: {
                    current_password: '',
                    new_password: '',
                }
            }
        },

        methods: {
            closeMe() {
                this.isOpenRef = false
                this.$emit('close-dialog', this.isOpenRef)
            },
            changePassword() {
                Storage.methods.changePassword(this.form).then(()=> {
                    this.closeMe()
                })
            }
        },
        props: {
            open_dialog: {
                type: Boolean
            }
        },
        mounted() {
            this.isOpenRef = this.open_dialog
        },
        components: {
            // ExploreContainer,
            IonInput,
            IonModal,
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
            // IonPage
        },
    }
</script>

<style scoped>
    * {
        font-family: "Jost SemiBold", sans-serif;
    }

    ion-input {
        background-color: #dcddde !important;
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

    h4 {
        color: #20b2aa;
        font-family: "Jost SemiBold", sans-serif;
        font-size: 16pt;
        text-align: center;
    }

    .profile__btn {
        padding-top: 30px;
    }

</style>