<template>
  <div class="form-data bg-form" v-if="!submitted">
    <h4>Admin Login</h4>
    <hr />
      <input
        autocomplete="off"
        placeholder="Email or username"
        aria-label="Username"
        aria-describedby="Username"
        type="text"
        v-model="email"
        v-bind:class="{
          'form-control': true,
          'is-invalid': !validEmail(email) && emailBlured,
        }"
        v-on:blur="emailBlured = true"
      />
      <div class="invalid-feedback">A valid email is required!</div>

    <input
      autocomplete="off"
      type="password"
      aria-label="Password"
      aria-describedby="Password"
      placeholder="Password"
      v-model="password"
      v-bind:class="{
        'form-control': true,
        'is-invalid': !validPassword(password) && passwordBlured,
      }"
      v-on:blur="passwordBlured = true"
    />
    <div class="invalid-feedback">Enter Password!</div>

    <div class="mb-3">
      <button v-on:click.stop.prevent="submit" class="sub">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data: function () {
    return {
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      password: "",
      passwordBlured: false,
    };
  },
  methods: {
    validate: function () {
      this.emailBlured = true;
      this.passwordBlured = true;
      if (this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
    },

    validEmail: function (email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
    },

    validPassword: function (password) {
      if (password.length > 0) {
        return true;
      }
    },

    submit: function () {
      this.validate();
      if (this.valid) {
        var loginRequest = {
          UserName: this.email,
          Password: this.password,
        };
        axios
          .post("/Login/Login", loginRequest)
          .then((response) => {
            if (response.status === 200) {
              let token = response.data.jwtToken;
              let userEmail = response.data.userName;
              let userRoleID = response.data.roleID[0];
              let contactID = response.data.contactID;
              Cookies.set("token", token);
              Cookies.set("userEmail", userEmail);
              Cookies.set("userRoleID", userRoleID);
              localStorage.setItem("contactID", contactID);
              localStorage.setItem("token", token);
              localStorage.setItem("userEmail", userEmail);
              localStorage.setItem("userRoleID", userRoleID);
              /*resolve(response);*/
              this.$router.push("/Dashboard");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: aqua;
}

.card {
  border: none;
  height: 320px;
}

.forms-inputs {
  position: relative;
}

.forms-inputs span {
  position: absolute;
  top: -18px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;
}

.forms-inputs input {
  height: 50px;
  border: 2px solid #eee;
}

.forms-inputs input:focus {
  box-shadow: none;
  outline: none;
  border: 2px solid #000;
}

.btn {
  height: 50px;
}

.success-data {
  display: flex;
  flex-direction: column;
}
.bg-form {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 30%;
  padding: 20px;
  text-align: center;
}

.bxs-badge-check {
  font-size: 90px;
}

.bg-form input[type="text"],
.bg-form input[type="password"] {
  display: block;
  width: 65%;

  transition: 0.25s;
  margin: 20px auto;
}
.bg-form input[type="text"]:focus,
.bg-form input[type="password"]:focus {
  display: block;
  width: 80%;

  transition: 0.25s;
  margin: 20px auto;
}
button.sub {
  display: block;
  width: 150px;
  padding: 3px 2px;
  border: 1px solid rgb(80, 108, 139);
  border-radius: 10px;
  transition: 0.25s;
  margin: 20px auto;
}
button.sub:hover {
  background-color: rgb(54, 71, 92);
  color: #eee;
}
</style>