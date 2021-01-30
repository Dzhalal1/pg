<template>
  <ion-modal :is-open="isOpenRef" @onDidDismiss="closeMe()">
    <ion-page>
      <ion-header>
        <ion-row>
          <ion-col>
            <!--                        <ion-button>-->
            <ion-icon @click="closeMe()" :icon="chevronBackOutline"/>
            <!--                        </ion-button>-->
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-text-center">
            <p>{{ subject_name }} ({{ selectGroup.group }})</p>
          </ion-col>
        </ion-row>
      </ion-header>
      <ion-content>
        <ion-grid>
          <ion-row class="week">
            <ion-col size="2" class="ion-text-end">
              <ion-button :disabled="(semester.current_week + week) === 1" @click="changeWeek('down')"
                          fill="clear">
                <ion-icon
                    :icon="chevronBackOutline"/>
              </ion-button>
            </ion-col>
            <ion-col size="8" style="margin-top: -8px !important;">
              <p>{{ semester.current_week + week }} неделя</p>
              <p>{{ subjectsInfo.dateweek.start_week }} - {{ subjectsInfo.dateweek.end_week }}</p>
            </ion-col>
            <ion-col size="2" class="ion-text-start">
              <ion-button :disabled="(semester.current_week + week) === 32" @click="changeWeek('up')"
                          fill="clear">
                <ion-icon
                    :icon="chevronForwardOutline"/>
              </ion-button>
            </ion-col>

          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button class="group" v-for="group in subjectsInfo.groups" @click="setGroup(group)"
                          :key="group.id">
                {{ group.group }}
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row class="score">
            <ion-col>
              <ion-row v-for="score in selectScores" :key="score.id">
                <ion-col size="10" class="ion-text-start">
                  {{ score.student }}
                  <!--                                    Пропуск-->

                </ion-col>
                <ion-col>{{ summSores(score.student).Rfact }}</ion-col>
                <ion-col size="12">
                  <ion-row>
                    <ion-col class="ion-text-center">
                      <span v-if="subjectsInfo.stype_id === 3 || subjectsInfo.stype_id === 5">Посещяемость</span> <span
                        v-else>Пропуск</span><br>
                      {{ subjectsInfo.maxscore_info.missed }}
                    </ion-col>
                    <ion-col class="ion-text-center">
                      <span v-if="subjectsInfo.stype_id === 3 || subjectsInfo.stype_id === 5">Эл-ты НИ</span> <span
                        v-else>Контроль</span><br>
                      {{ subjectsInfo.maxscore_info.reference_work }}
                    </ion-col>
                    <ion-col class="ion-text-center">
                      <span v-if="subjectsInfo.stype_id === 3 || subjectsInfo.stype_id === 5">Защита</span> <span
                        v-else>Сам. работа</span><br>
                      {{ subjectsInfo.maxscore_info.home_work }}
                    </ion-col>
                    <ion-col class="ion-text-center">
                      Активность<br>
                      {{ subjectsInfo.maxscore_info.active }}
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col style="text-align: center">
                      <ion-input type="number"

                                 :disabled='subjectsInfo.maxscore_info.missed === 0'
                                 @keyup="score.missed = Number(score.missed) > Number(subjectsInfo.maxscore_info.missed) ? subjectsInfo.maxscore_info.missed :Number(score.missed)"
                                 @change="saveScores(score)"
                                 v-model="score.missed"></ion-input>
                    </ion-col>
                    <ion-col class="ion-text-center">
                      <ion-input type="number"
                                 :disabled='subjectsInfo.maxscore_info.reference_work === 0'
                                 @keyup="score.reference_work = Number(score.reference_work) > Number(subjectsInfo.maxscore_info.reference_work) ? subjectsInfo.maxscore_info.reference_work :Number(score.reference_work)"
                                 @change="saveScores(score)"
                                 v-model="score.reference_work"></ion-input>
                    </ion-col>
                    <ion-col class="ion-text-center">
                      <ion-input type="number"
                                 :disabled='subjectsInfo.maxscore_info.home_work === 0'
                                 @keyup="score.home_work = Number(score.home_work) > Number(subjectsInfo.maxscore_info.home_work) ? subjectsInfo.maxscore_info.home_work :Number(score.home_work)"
                                 @change="saveScores(score)"
                                 v-model="score.home_work"></ion-input>
                    </ion-col>
                    <ion-col class="ion-text-center">
                      <ion-input type="number"
                                 :disabled='subjectsInfo.maxscore_info.active === 0'
                                 @keyup="score.active = Number(score.active) > Number(subjectsInfo.maxscore_info.active) ? subjectsInfo.maxscore_info.active :Number(score.active)"
                                 @change="saveScores(score)"
                                 v-model="score.home_work"></ion-input>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script>
import Storage from "../plugins/storage";
import {chevronBackOutline, chevronForwardOutline} from 'ionicons/icons';
import {
  IonModal,
  IonPage,
  // createAnimation,
  IonInput,
  IonButton,
  // IonLabel,
  // IonItem,
  IonIcon,
  IonCol,
  // IonSelect,
  // IonSelectOption,
  IonRow,
  IonGrid,
  IonHeader,
  // IonImg,
  // IonRippleEffect,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  IonContent, loadingController, toastController,
} from '@ionic/vue';

export default {
  name: 'TeacherScoresTable',
  data() {
    return {
      chevronBackOutline,
      chevronForwardOutline,
      isOpenRef: false,
      selectGroup: {group: 0},
      subjectsInfo: {
        maxscore_info: {},
        Rmax: {},
        dateweek: {
          start_week: '',
          end_week: '',
        }
      },
      scores: [],
      week: 0,
      semester: {current_week: 0},
      summsSores: {},


    }
  },
  methods: {
    setGroup(group) {
      this.selectGroup = group
    },
    saveScores(row) {
      Storage.methods.saveScore(row)
    },
    closeMe() {
      this.isOpenRef = false
      this.$emit('close-dialog', this.isOpenRef)
    },
    async loadSubjectInfo() {
      const loading = await loadingController.create({
        cssClass: 'loading',
        message: 'Загрузка',
        animated: true,
        spinner: 'crescent',
        translucent: true,
      })
      await loading.present();
      Storage.methods.getSubjectInfo(this.subject_id).then((response) => {
        this.subjectsInfo = response
        this.selectGroup = this.subjectsInfo.groups[0]
        // this.summSores()
        Storage.methods.getSubjectsScores(this.subject_id).then((response) => {
          this.scores = response
        }).catch(async (error) => {
          let message = 'Ошибка сервера.'
          if (error.response.data.errors)
            message = error.response.data.errors[0].detail
          else
            message += ' Ошибка номер ' + error.response.status
          const toast = await toastController
              .create({
                message,
                position: 'bottom',
                translucent: true,
                cssClass: 'error-message',
                animated: true,
                duration: 3000
              })
          return toast.present();
        }).finally(() => {
          loading.dismiss()
        })
      }).catch(async (error) => {
        let message = 'Ошибка сервера.'
        if (error.response.data.errors)
          message = error.response.data.errors[0].detail
        else
          message += ' Ошибка номер ' + error.response.status
        const toast = await toastController
            .create({
              message,
              position: 'bottom',
              translucent: true,
              cssClass: 'error-message',
              animated: true,
              duration: 3000
            })
        return toast.present();
      })
    },
    changeWeek(status) {
      if (status === 'up') {
        this.week++
      } else this.week--
      Storage.methods.getSubjectInfo(this.subject_id, this.semester.current_week + this.week).then((response) => {
        this.subjectsInfo = response
        this.summSores()
      })
    },
    summSores(student) {
      if (this.subjectsInfo.coeficients === undefined) {
        return {
          'active': 0,
          'missed': 0,
          'home_work': 0,
          'reference_work': 0,
          'Rfact': 0,
          'R': 0,
          'mark': 0
        }
      }

      function isBigEnough(value) {
        return value.student === student
      }

      const a = this.scores.filter(isBigEnough)
      let activ_sum = 0
      let missed_sum = 0
      let ref_work_sum = 0
      let home_work_sum = 0
      let Rfact = 0
      let R = 0
      let mark = ''
      a.forEach(item => {
        activ_sum += Number(item.active)
        missed_sum += parseFloat(item.missed)
        home_work_sum += parseFloat(item.home_work)
        ref_work_sum += parseFloat(item.reference_work)
      })

      if (this.subjectsInfo.stype != 3 && this.subjectsInfo.stype != 5 && this.subjectsInfo.stype != 6) {
        Rfact = activ_sum * this.subjectsInfo.coeficients.active_coefficient + home_work_sum * this.subjectsInfo.coeficients.home_work_coefficient + (this.subjectsInfo.Rmax['sum_missed'] - missed_sum) * this.subjectsInfo.coeficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coeficients.reference_work_coefficient
      } else {
        Rfact = activ_sum * this.subjectsInfo.coeficients.active_coefficient + home_work_sum * this.subjectsInfo.coeficients.home_work_coefficient + (missed_sum) * this.subjectsInfo.coeficients.missed_coefficient + ref_work_sum * this.subjectsInfo.coeficients.reference_work_coefficient
      }
      R = Rfact / this.subjectsInfo.Rmax['Rmax'] * 100
      R = R > 100 ? 100 : R
      R = (Math.round(R * 100) / 100)
      if (R <= 100 && R > 85.5) {
        mark = 5
      } else if (R < 85.5 && R >= 64.5) {
        mark = 4
      } else if (R < 64.5 && R >= 49.6) {
        mark = 3
      } else if (R < 49.6) {
        mark = 2
      }
      return {
        'active': Math.round(activ_sum),
        'missed': Math.round(missed_sum * 100) / 100,
        'home_work': Math.round(home_work_sum * 100) / 100,
        'reference_work': Math.round(ref_work_sum * 100) / 100,
        'Rfact': Math.round(Rfact * 100) / 100,
        'R': (Math.round(R * 100) / 100),
        'mark': mark
      }

    },

  },
  props: {
    open_dialog: {
      type: Boolean
    },
    subject_id: {
      type: Number
    },
    subject_name: {
      type: String
    }
  },
  mounted() {
    this.isOpenRef = this.open_dialog
    this.semester = Storage.getItem('semester')
    this.loadSubjectInfo()
  },
  computed: {
    selectScores() {
      let scores = []
      if (this.selectGroup.id !== 0) {
        scores = this.scores.filter(item => item.week === (this.semester.current_week + this.week) - 1 && Number(item.group) === Number(this.selectGroup.group))
      } else {
        scores = this.scores.filter(item => item.week === (this.semester.current_week + this.week) - 1)
      }
      if (scores)
        return scores.sort((a, b) => {
          if (a.student > b.student) {
            return 1;
          }
          if (a.student < b.student) {
            return -1;
          }
          return 0;
        })
      else return []
    }
  },
  components: {
    // ExploreContainer,
    IonInput,
    // IonSelectOption,
    IonModal,
    IonButton,
    IonCol,
    IonRow,
    IonHeader,
    IonIcon,
    IonGrid,
    // IonSelect,
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
}
</script>

<style scoped>
* {
  font-family: "Jost SemiBold", sans-serif;
  margin: 0;
  padding: 0;
  color: grey;
}

p {
  text-align: center;
  font-size: 10pt;


}

ion-icon {
  font-size: 25pt;
  color: lightseagreen;

}

.score {
  margin: 5px;
}

.score ion-row {
  font-family: "Jost SemiBold", sans-serif;
  font-size: 8pt !important;
  padding: 15px;
  margin-top: 15px;
  background-color: #f7f7f7 !important;
  border-radius: 5px;
  color: grey;
  border: 1px solid #e0dfdf;
}

.week {
  margin-top: 15px;
}

ion-header {
  background-color: lightseagreen;
  padding-top: 20px;
  padding-bottom: 20px;
}

ion-header ion-icon {
  color: white !important;
}

ion-header p {
  color: white !important;
  margin-bottom: 20px;
}

.group {
  color: white;
}

ion-input {
  background-color: #dcddde !important;
  border-radius: 2px;
  color: grey !important;
  font-family: "Jost SemiBold", sans-serif;
  box-shadow: 0 0 2px #9c9d9d;
}

</style>