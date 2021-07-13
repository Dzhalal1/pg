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
          <!--                    <p>{{semester.title}}</p>-->
        </ion-col>
      </ion-row>

    </ion-header>
    <ion-content>
      <ion-grid class="statements" v-if="is_student">
        <ion-row v-for="(order,index) in orders" :key="index">
          <ion-col size="6">
            <p>{{ order.name }}
            </p>
          </ion-col>
          <ion-col size="4">
            {{ order.semester }}
          </ion-col>
          <ion-col size="2" class="ion-text-end">
            <ion-icon class="check" :icon="checkmarkOutline" v-if="order.date_teacher !== null"/>
          </ion-col>
        </ion-row>
        <ion-row v-if="orders.length === 0">
          <ion-col><p>Список долгов пуст</p></ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid class="statements" v-else>
        <ion-row v-for="(order,index) in orders" :key="index">
          <ion-col size="6">
            <p>{{ order.subject }}
            </p>
          </ion-col>
          <ion-col>
            <p class="ion-text-end">{{ order.student }}
            </p>
            <ion-input type="number"
                       class="ion-text-center"
                       @change="saveOrders(order.scores,order.id)"
                       v-model="order.scores"></ion-input>
          </ion-col>
          <ion-col size="12" class="ion-text-end">
            <ion-button @click="signOrder(order.id)" :disabled="order.closed" expand="full">
              Подписать
            </ion-button>
          </ion-col>
          <ion-col size="12" style="font-size: 8pt" class="ion-text-center">
            До: {{ formatDate(order.date_finish) }}
            Сформирован: {{ formatDate(order.date_formed) }}
            Подписан: {{ formatDate(order.date_teacher) }}
          </ion-col>

        </ion-row>
        <ion-row v-if="orders.length === 0">
          <ion-col><p>Список долгов пуст</p></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonButton,
  IonInput,
  loadingController, toastController,
} from '@ionic/vue';
import {chevronBackOutline, checkmarkOutline} from 'ionicons/icons';
import Storage from "../plugins/storage";

export default {
  name: "Orders",
  components: {
    IonPage,
    IonHeader,
    IonGrid,
    IonContent,
    IonCol,
    IonRow,
    IonIcon,
    IonButton,
    IonInput,
  },
  data() {
    return {
      chevronBackOutline,
      checkmarkOutline,
      is_student: false,
      orders: [],
      semester: {},
    }
  },

  methods: {
    saveOrders(score, order_id) {
      Storage.methods.setOrderScore({scores: score, order_id})
    },
    downloadOrder(file_link) {
      // Storage.methods.downloadStatements(pdf).then((response) => {
      const link = document.createElement('a')
      link.href = 'https://mrs.kgsxa.ru/media/' + file_link
      link.setAttribute('download', '123.pdf')
      link.setAttribute('target', '_blank')
      document.body.appendChild(link)
      link.click()
      // })
    },
    closeComponent() {
      this.$emit('close-component', null)
    },
    signOrder(order_id) {
      Storage.methods.signOrders(order_id).then(response => {
        this.downloadOrder(response)
      })
    },
    async getOrders() {
      const loading = await loadingController.create({
        cssClass: 'loading',
        message: 'Загрузка',
        animated: true,
        spinner: 'crescent',
        translucent: true,
      })
      await loading.present();
      let user_id = Storage.getItem('user').student
      if (!Storage.is_student()) {
        user_id = Storage.getItem('user').id
      }
      Storage.methods.getOrders(user_id).then((response) => {
        this.orders = response

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
    },
    formatDate(str) {
      const date = String(str).split('-').reverse().join('.')
      if(str) {
        return date
      }
      return '-'
    },
  },
  mounted() {
    this.getOrders()
    this.semester = Storage.getItem('semester')
    this.is_student = Storage.is_student()
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
  background-color: #f7f7f7 !important;
  border-radius: 5px;
  color: grey;
  border: 1px solid #e0dfdf;
}

.check {
  color: lightseagreen !important;
  font-size: 15pt;
}

ion-button {
  font-family: "Jost SemiBold", sans-serif;
  font-weight: bold;
  font-size: 10pt;
}

.return {
  font-size: 25pt;
  color: lightseagreen;
}

ion-header {
  background-color: #20b2aa;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white !important;
}

ion-header ion-icon {
  color: white !important;
}

ion-input {
  background-color: #dcddde !important;
  /*border-radius: 20px;*/
  margin-top: 1em;
  margin-bottom: 1em;
  color: grey !important;
  font-family: "Jost SemiBold", sans-serif;
  box-shadow: 0 0 2px #9c9d9d;
}

</style>