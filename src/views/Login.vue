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
                <ion-col size="8">
                  <ion-input placeholder="Пароль"
                             v-model="formLogin.password"
                             :type="[showPassword ? 'password' : 'text']"></ion-input>
                </ion-col>
                <ion-col class="login__input__icon" size="2">
                  <div @click="showPassword =!showPassword">
                    <box-icon color='#B2BABB' v-if="!showPassword" type='solid' name='hide'></box-icon>
                    <box-icon color='#B2BABB' v-else type='solid' name='show'></box-icon>
                  </div>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center">
            <ion-col style="padding: 0;" size="10">
              <ion-button type="submit" expand="full" shape="round"
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
  IonToggle,
  IonPage,
  IonInput,
  IonButton,
  toastController,
  // IonItem,
  IonFooter,
  IonLabel,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
  IonImg,
  // IonRippleEffect,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  // IonContent
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import {lockClosed, person, eye, eyeOff} from 'ionicons/icons';
import 'boxicons';
import http from "@/plugins/axios";
// import { IonicStorageModule } from '@ionic/storage';
import Storage from "@/plugins/storage";

export default {
  name: 'Login',
  components: {
    IonToggle,
    IonLabel,
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
  data() {
    return {
      showPassword: true,
    }
  },
  setup() {
    return {
      lockClosed,
      person,
      eye,
      eyeOff,
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
              Storage.setItem('learning_form', 1)
              this.$router.push({name: 'Home'})
            }
          })
        })
      }).catch(async (error) => {
        let message = 'Ошибка сервера'
        if (error.response.status === 400)
          message = 'Ошибка при авторизации'
        const toast = await toastController
            .create({
              message,
              position: 'bottom',
              translucent: true,
              cssClass: 'error-message',
              animated: true,
              duration: 2000
            })
        return toast.present();
      })
    }
  }
}
</script>

<style scoped>
ion-col.login__input {
  background-color: #fcfcfc;
  border-radius: 30px;
  margin-top: 1em;
}

ion-col.login__input ion-input {
  color: #B2BABB;
  font-family: "Jost SemiBold", sans-serif;
}

ion-icon {
  font-size: 20px;
  color: #B2BABB;
}

ion-col.login__input__icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

ion-col.login__input__icon ion-label {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 10pt;
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