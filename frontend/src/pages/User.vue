<template>
  <div class="card">
    <span class="card__action"
      ><router-link to="/wall"
        ><i class="fa-solid fa-arrow-left"></i></router-link
    ></span>
    <i class="fa-regular fa-circle-user"></i>
    <h1 class="card__title">{{ user.username }}</h1>
    <p class="card__info-email">Email: {{ user.email }}</p>
    <div class="form-row-mdp">
      <p class="card__info">Changer de mot de passse:</p>
      <input
        class="form-row__input"
        type="password"
        placeholder="Nouveau mot de passe"
        v-model="newPassword"
      />
      <input
        class="form-row__input"
        type="password"
        placeholder="Répéter le nouveau mot de passe"
        v-model="RepeatNewPassword"
      />
      <button class="button" @click="changePassword">
        Changer le mot de passe
      </button>
    </div>
    <div class="form-row">
      <button class="button-dec" @click="logout">Déconnexion</button>
      <button class="button-del" @click="deleteAccount">
        Supprimer le compte
      </button>
    </div>
  </div>
</template>

<script>
import Axios from "@/_services/axios.service";

export default {
  name: "User",
  data() {
    return {
      user: "",
      newPassword: null,
      RepeatNewPassword: null,
    };
  },

  created() {
    this.displayProfil();
  },

  methods: {

    displayProfil() {
      Axios.get("/user/me", {})
        .then((response) => {
          this.user = response.data;
        })
        .catch(() => {
        });
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("isAdmin");
      this.$router.push({ path: "/login" });
    },

    deleteAccount() {
      Axios.delete("user/delete", {})
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          localStorage.removeItem("isAdmin");
          this.$router.push({ path: "/signup" });
          alert("Compte supprimé !");
        })
        .catch((error) => console.log(error));
    },

    changePassword() {
      if (
        this.newPassword == this.RepeatNewPassword &&
        this.newPassword != "" &&
        this.RepeatNewPassword != ""
      ) {
        Axios.put("user/update", {
          newPassword: this.newPassword,
        })
          .then((response) => {
            console.log("pwd change", response);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            localStorage.removeItem("isAdmin");
            this.$router.push({ path: "/login" });
            alert(
              "Changement de mot de passe réussi ! Veuillez vous reconnecter."
            );
          })
          .catch((err) => {
            console.log("admin", err);
            alert(
              "oops ! 8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique, un caractère spécial et différent de l'ancien mot de passe"
            );
          });
      }
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 60px;
}
.fa-regular {
  font-family: "Font Awesome 6 Free";
  font-weight: 400;
  font-size: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #38618c;
}

.fa-solid {
  font-size: 30px;
  color: #38618c;
}

.card__title {
  text-align: center;
  font-weight: 800;
}

.card__info {
  font-weight: 200;
  font-size: 18px;
}

.card__info-email {
  font-weight: 200;
  font-size: 18px;
  margin-top: 45px;
}

.button {
  background: #38618c;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}

.button-dec {
  background: #38618c;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
  margin-top: 40px;
}

.button-dec:hover {
  cursor: pointer;
  background: #1976d2;
}

.button:hover {
  cursor: pointer;
  background: #1976d2;
}

.button-del {
  background: #38618c;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.button-del:hover {
  cursor: pointer;
  background: #f32a23;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row-mdp {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 50px;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>

