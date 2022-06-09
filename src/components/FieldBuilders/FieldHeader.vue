<template>
  <div>
    <v-text-field
      dense
      outlined
      label="Header Label"
      v-model="modelValue.text"
      validate-on-blur
      :rules="[required]"
    />
    <FieldTypeSelect
      v-model="modelValue"
      validate-on-blur
      :rules="[required]"
    />
  </div>
</template>

<script>
import FieldTypeSelect from "./FieldTypeSelect.vue";
import useValidation from "mixins/use-validation";

export default {
  name: "FieldDataTableHeaderBuilder",
  mixins: [useValidation],
  components: {
    FieldTypeSelect,
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
