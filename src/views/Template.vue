<template>
  <div class="container-fluid temp mb-5">
    <div class="nav justify-content-start">
      <div class="col-5 mt-1">
        <button class="btn gotoDashboard">
          <i class="fa fa-angle-left" aria-hidden="true"></i> Dashboard
        </button>
      </div>
      <h4><i class="fa fa-wpforms"></i> Form Builder</h4>
    </div>
    <div class="temprow row">
      <div class="tempdrop col-sm-10">
        <drop></drop>
      </div>
      <div class="col-sm-2">
        <drag></drag>
      </div>
    </div>
  </div>
</template>

<script>
import Drag from "../components/Drag.vue";
import Drop from "../components/Drop.vue";

export default {
  name: "Template",
  data() {
    return {
      datain: "",
    };
  },
  components: { Drag, Drop },
  mounted() {
    this.datain = this.$route.params.data;
  },
};
</script>
<style scoped>
.temp {
  width: 85%;
  height: 100%;
}
.temprow {
  height: 78%;
}
.tempdrop {
  height: 100%;
}
h4 {
  text-align: center;
}

.gotoDashboard {
  border: 1.5px solid #005e85;
  color: #005e85;
  background-color: #f9feff;
}

.gotoDashboard:hover {
  border: 2px solid #005e85;
}
h2 {
  text-align: center;
}
.ss {
  width: 100%;
}
.sa {
  height: 80%;
}
.sb {
  height: 100%;
}
</style>
