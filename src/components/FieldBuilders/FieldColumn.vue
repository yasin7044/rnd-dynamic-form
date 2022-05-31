<template>
  <div>
    <FieldLabel v-model="modelValue.label" />

    <vs-checkbox
      v-model="isDedicatedColumnFields"
      @input="handleDedicatedColumnFields"
    >
      Needs a dedicated column fields
    </vs-checkbox>

    <div v-if="isDedicatedColumnFields" class="my-2">
      <button type="button" class="btn btn-primary" @click.prevent="addFields">
        Add Field
      </button>
      <div class="container mt-2">
        <div
          v-for="(field, index) in fields"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldLabel v-model="fields[index].label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldLabel from "./FieldLabel.vue";

export default {
  name: "FieldColumn",
  components: {
    FieldLabel,
  },
  data() {
    return {
      isDedicatedColumnFields: false,
    };
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
    fields: {
      get() {
        return this.modelValue.fields;
      },
      set(value) {
        this.modelValue = {
          ...this.modelValue,
          fields: value,
        };
      },
    },
  },
  methods: {
    addFields() {
      this.fields.push({
        label: "",
        model: `colField-${this.fields.length + 1}`,
      });
    },
    removeField(index) {
      this.fields = this.fields
        .filter((field, i) => i !== index)
        .map((field, i) => {
          field.model = `colField-${i + 1}`;
          return field;
        });
    },
    handleDedicatedColumnFields(value) {
      if (value) {
        this.fields = [];
      } else {
        this.fields = undefined;
      }
    },
  },
};
</script>

<style></style>
