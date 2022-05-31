<template>
  <div>
    <div class="mt-5 list-group rounded">
      <vs-list>
        <drag
          class="list-group-item"
          :transfer-data="eachItem"
          v-for="(eachItem, index) in allFields"
          :key="index"
        >
          <vs-list-item :title="eachItem.formLabel"></vs-list-item>
        </drag>
      </vs-list>

      <vs-button>Create Form</vs-button>
    </div>
  </div>
</template>

<script>
import { Drag } from "vue-drag-drop";

const vueMultiSelectOption = {
  options: ["Canada", "United States"],
};

let count = 1;

export default {
  name: "DragField",
  components: {
    Drag,
  },
  data() {
    return {
      countModel: 0,
      generalarrow: false,
      allFields: [
        this.getField({ type: "label", formLabel: "Label" }),
        this.getField({ type: "input", formLabel: "Text", inputType: "text" }),
        this.getField({
          type: "input",
          formLabel: "Email",
          inputType: "email",
        }),
        this.getField({
          type: "input",
          formLabel: "Number",
          inputType: "number",
        }),
        this.getField({ type: "textArea", formLabel: "Text Area" }),
        this.getField({ type: "vueSelect", formLabel: "Dropdown" }),
        this.getField({
          type: "matrix",
          formLabel: "Matrix",
          componentName: "FieldMatrixBuilder",
        }),
      ],
    };
  },
  methods: {
    getField(fieldProps) {
      let commonField = {
        label: "Name",
        model: `field-${count++}`,
        readonly: false,
        featured: true,
        required: true,
        disabled: false,
        placeholder: "User's name",
        inputType: null,
        ...fieldProps,
      };
      switch (fieldProps.type) {
        case "textArea":
        case "label":
          return commonField;
        case "text":
          return { ...commonField, ...{ min: "", max: "" } };
        case "radios":
          return { ...commonField, values: [] };
        case "vueSelect": {
          return { ...commonField, props: vueMultiSelectOption };
        }
      }
      return commonField;
    },
  },
};
</script>

<style lang="scss" scoped></style>
