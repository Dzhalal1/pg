<template>
  <ion-page>
    <ion-grid>
      <ion-row class="segment__mrs">
        <ion-col>
          <ion-segment color="primary" v-model="tab">
            <ion-segment-button value="1">
              <ion-label>Внеучебный рейтинг</ion-label>
            </ion-segment-button>
            <ion-segment-button value="2">
              <ion-label>Интегральный рейтинг</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-col>
      </ion-row>
      <ion-row v-if="tab === '1'">
        <ion-col class="list__rating">
          <ion-row>
            <ion-col>
              <p>Общественный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ obshReit }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Научный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ nauchReit }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Спортивный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ sportReit }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Воспитательный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ vospReit }}
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-row v-if="tab === '2'">
        <ion-col class="list__rating">
          <ion-row>
            <ion-col>
              <p>Учебный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ parseFloat(integralRating.learning).toFixed(1) }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Внеучебный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ parseFloat(integralRating.extracurricular).toFixed(1) }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>Интегральный</p>
            </ion-col>
            <ion-col class="ion-text-end">
              {{ parseFloat(integralRating.learning*0.8+integralRating.extracurricular*0.2).toFixed(1) }}
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonSegmentButton,
  IonSegment,
  // createAnimation,
  // IonInput,
  // IonButton,
  IonLabel,
  // IonItem,
  // IonIcon,
  IonCol,
  IonRow,
  IonGrid, loadingController, toastController,
  // IonImg,
  // IonRippleEffect,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  // IonContent
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import Storage from "../plugins/storage";
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Rating',
  components: {
    // ExploreContainer,
    // IonInput,
    // IonButton,
    IonSegmentButton,
    IonSegment,
    IonCol,
    IonRow,
    IonGrid,
    // IonImg,
    // IonRippleEffect,
    IonLabel,
    // IonItem,
    // IonIcon,
    // IonHeader,
    // IonToolbar,
    // IonTitle,
    // IonContent,
    IonPage
  },
  data() {
    return {
      tab: '1',
      vneucRating: null,
      integralRating: {Ri: 0, Rv: 0, Ru: 0},
    }
  },
  computed: {
    obshReit() {
      if (this.vneucRating === null) {
        return 0
      } else {
        return this.vneucRating.obsh1 + this.vneucRating.obsh2 + this.vneucRating.obsh3
      }
    },
    nauchReit() {
      if (this.vneucRating === null) {
        return 0
      } else {
        return this.vneucRating.nauch1 + this.vneucRating.nauch2 + this.vneucRating.nauch3
      }
    },
    sportReit() {
      if (this.vneucRating === null) {
        return 0
      } else {
        return this.vneucRating.sport1 + this.vneucRating.sport2 + this.vneucRating.sport3
      }
    },
    vospReit() {
      if (this.vneucRating === null) {
        return 0
      } else {
        return this.vneucRating.vosp1 + this.vneucRating.vosp2 + this.vneucRating.vosp3
      }
    },

  },
  methods: {
    async loadRating() {
      const loading = await loadingController.create({
        cssClass: 'loading',
        message: 'Загрузка',
        animated: true,
        spinner: 'crescent',
        translucent: true,
      })
      await loading.present();
      Storage.methods.getVneucRating(Storage.getItem('user').student).then((response) => {
        this.vneucRating = response

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
        Storage.methods.getIntegralRating(Storage.getItem('user').student).then((response) => {
          this.integralRating = response
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
      })
    },
  },
  mounted() {
    this.loadRating()
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

ion-segment-button {
  font-family: "Jost SemiBold", sans-serif;
  font-size: 9pt;
}

.segment__mrs {
  --ion-color-primary: white !important;
  background: #20b2aa;
  padding-top: 16px;
  /*box-shadow: 2px 2px 5px 1px grey;*/
}

.list__rating {
  font-family: "Jost SemiBold", sans-serif;
  margin: 5px;

}

.list__rating ion-row {
  padding: 15px;
  margin-top: 15px;
  background-color: #f7f7f7 !important;
  border-radius: 5px;
  color: grey;
  border: 1px solid #e0dfdf;
}

</style>