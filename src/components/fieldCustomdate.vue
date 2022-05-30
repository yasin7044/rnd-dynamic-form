<template>
  <datepick
    v-model="value"
    format="MM/dd/yyyy"
    :placeholder="schema.placeholder"
    readonly="true"
    clear-button="true"
    class="form-control"
  ></datepick>
</template>

<script>
import { abstractField } from "vue-form-generator";
import datepick from "vuejs-datepicker";

export default {
  name: "customDate-modal-area",
  mixins: [abstractField],
  components: {
    datepick,
  },
};
</script>
<style>
    input {
        width: 96%;
        border: none;
        outline: none;
    }
</style>
