<template>
  <div>
    <FieldLabel v-model="modelValue.label" />
    <vs-checkbox v-model="modelValue.noInputFields">
      No Input Fields
    </vs-checkbox>
  </div>
</template>

<script>
import FieldLabel from "./FieldLabel.vue";

export default {
  name: "FieldRow",
  components: {
    FieldLabel,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style></style>
