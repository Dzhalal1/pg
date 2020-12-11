<template>
    <ion-page>
        <ion-header>
            <ion-button @click="closeComponent">
                <ion-icon :icon="chevronBackCircleOutline"/>
            </ion-button>
        </ion-header>
        <ion-content>
            <ion-grid class="statements">
                <ion-row v-for="(statement,index) in statements" :key="index">
                    <ion-col size="6">
                        <p>
                            {{statement.subject}}
                        </p>
                    </ion-col>
                    <ion-col size="4">
                        {{formatDate(statement.date_close)}}
                    </ion-col>
                    <ion-col size="2">
                        <ion-button :disabled="statement.open" @click="downloadStatements(statement.close_subject_id)">
                            <ion-icon :icon="cloudDownload"/>
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
    import {chevronBackCircleOutline, cloudDownload} from 'ionicons/icons';
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
                chevronBackCircleOutline,
                cloudDownload,
                statements: []
            }
        },
        methods: {
            closeComponent() {
                this.$emit('close-component', null)
            },
            formatDate(str) {
                return String(str).split('-').reverse().join('.')
            },
            downloadStatements(pdf) {
                Storage.methods.downloadStatements(pdf).then((response)=> {
                    const link = document.createElement('a')
                    link.href = 'https://mrs.kgsxa.ru/media/' + response
                    link.setAttribute('download', '123.pdf')
                    link.setAttribute('target', '_blank')
                    document.body.appendChild(link)
                    link.click()
                })
            },
            getStatements() {
                Storage.methods.getStatements().then((response) =>{
                    this.statements = response
                })
            }
        },
        mounted() {
            this.getStatements()
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
</style>