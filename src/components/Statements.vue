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
                    <p>{{semester.title}}</p>
                </ion-col>
            </ion-row>
        </ion-header>
        <ion-content>
            <ion-grid class="statements">
                <ion-row v-for="(statement,index) in statements" :key="index">
                    <ion-col size="6">
                        <p>
                            {{statement.subject}}
                        </p>
                    </ion-col>
                    <ion-col size="4" class="ion-text-center">
                        {{formatDate(statement.date_close)}}
                    </ion-col>
                    <ion-col size="2">
                        <ion-button fill="clear" :disabled="statement.link === ''"
                                    @click="downloadStatements(statement.link)">
                            <ion-icon
                                    :icon="downloadOutline"/>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
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
        IonIcon,
        IonButton,
        IonContent,
    } from '@ionic/vue';
    import {chevronBackOutline, downloadOutline} from 'ionicons/icons';
    import Storage from "../plugins/storage";

    export default {
        name: "Statements",
        components: {
            IonPage,
            IonContent,
            IonHeader,
            IonGrid,
            IonCol,
            IonRow,
            IonIcon,
            IonButton,
        },
        data() {
            return {
                chevronBackOutline,
                downloadOutline,
                statements: [],
                semester: {}
            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            formatDate(str) {
                return String(str).split('-').reverse().join('.')
            },
            downloadStatements(file_link) {
                // Storage.methods.downloadStatements(pdf).then((response) => {
                    const link = document.createElement('a')
                    link.href = 'https://mrs.kgsxa.ru/media/' + file_link
                    link.setAttribute('download', '123.pdf')
                    link.setAttribute('target', '_blank')
                    document.body.appendChild(link)
                    link.click()
                // })
            },
            getStatements() {
                Storage.methods.getStatements().then((response) => {
                    this.statements = response
                })
            },
        },
        mounted() {
            this.getStatements()
            this.semester = Storage.getItem('semester')
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .statements {
        font-family: "Jost SemiBold", sans-serif;
        margin: 5px;
        font-size: 10pt;
    }

    .statements ion-row {
        padding: 15px;
        margin-top: 15px;
        background-color: white;
        border-radius: 5px;
        color: grey;
        border: 1px solid #e0dfdf;
    }

    ion-icon {
        /*color: white !important;*/
        font-size: 20pt;
    }

    .return {
        font-size: 25pt;
        color: lightseagreen;
    }

    ion-button {
        font-family: "Jost SemiBold", sans-serif;
        font-weight: bold;
        font-size: 10pt;
    }

    ion-header {
        background-color: lightseagreen;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    ion-header ion-icon {
        color: white !important;
    }
</style>