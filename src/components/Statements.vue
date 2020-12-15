<template>
    <ion-page>
        <ion-header>
            <ion-col>
                <ion-icon size="1" class="return" @click="closeComponent" :icon="chevronBackOutline"/>
            </ion-col>
            <ion-col size="12" class="ion-text-center">
                <ion-button type="submit" @click="open_semesters = true" expand="block" fill="clear"
                            shape="round">
                    Сменить семестр
                </ion-button>
            </ion-col>
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
                        <!--                        <ion-button>-->
                        <ion-icon :disabled="statement.open" @click="downloadStatements(statement.close_subject_id)"
                                  :icon="downloadOutline"/>
                        <!--                        </ion-button>-->
                    </ion-col>
                </ion-row>
            </ion-grid>
            <change-semesters :open_dialog="open_semesters" @close-dialog="closeChangeSemesters"
                              v-if="open_semesters"></change-semesters>
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
    import ChangeSemesters from "../views/ChangeSemesters";

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
            ChangeSemesters
        },
        data() {
            return {
                chevronBackOutline,
                downloadOutline,
                statements: [],
                open_semesters: false,
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
                Storage.methods.downloadStatements(pdf).then((response) => {
                    const link = document.createElement('a')
                    link.href = 'https://mrs.kgsxa.ru/media/' + response
                    link.setAttribute('download', '123.pdf')
                    link.setAttribute('target', '_blank')
                    document.body.appendChild(link)
                    link.click()
                })
            },
            getStatements() {
                Storage.methods.getStatements().then((response) => {
                    this.statements = response
                })
            },
            closeChangeSemesters(data) {
                this.open_semesters = data
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

    ion-icon {
        color: lightseagreen;
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

</style>