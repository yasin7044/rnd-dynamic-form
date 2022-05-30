<template>
  <div class="maining">
    <div class="header">
      <heading />
    </div>
    <div class="aa">
      <router-view />
    </div>
    <!-- <spinner /> -->
    <div class="footer mt-4 p-2">
      <foot />
    </div>
  </div>
</template>
<script>
import Datepicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Foot from "./components/Footer/Foot.vue";
import Heading from "./components/Header/Heading.vue";
export default {
  name: "App",
  components: {
    Heading,
    Foot,
    Datepicker,
  },
  methods: {
    chk() {
      alert(this.customDate);
    },
  },
  // updated() {
  //   console.log(this.customDate);
  // },
  data() {
    return {
      customDate: "",
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      data: [
        { OrderID: 10248, CustomerID: "VINET", Freight: 32.38 },
        { OrderID: 10249, CustomerID: "TOMSP", Freight: 11.61 },
        { OrderID: 10250, CustomerID: "HANAR", Freight: 65.83 },
        { OrderID: 10251, CustomerID: "VICTE", Freight: 41.34 },
        { OrderID: 10252, CustomerID: "SUPRD", Freight: 51.3 },
        { OrderID: 10253, CustomerID: "HANAR", Freight: 58.17 },
        { OrderID: 10254, CustomerID: "CHOPS", Freight: 22.98 },
        { OrderID: 10255, CustomerID: "RICSU", Freight: 148.33 },
        { OrderID: 10256, CustomerID: "WELLI", Freight: 13.97 },
      ],
      c: Number,
      pageSettings: { pageSize: 5 },
    };
  },
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

.mx-input {
  display: inline-block;
  width: 100%;
  height: 34.2px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: none;
  -webkit-box-shadow: inset 0 1px 1px #fff;
  box-shadow: inset 0 1px 1px #fff;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}

.has-search .form-control {
  padding-left: 2.375rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
  height: 100%;
}
.aa {
  height: 100%;
  left: 0;
  top: 0;
  position: relative;
  width: 100%;
}
.a {
  border: none;
}
.maining {
  height: 100%;
  width: 100%;
}
.header {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  background-color: rgb(11, 11, 36);
  color: white;
  text-align: center;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(39, 51, 54);
  text-align: center;
}
</style>
