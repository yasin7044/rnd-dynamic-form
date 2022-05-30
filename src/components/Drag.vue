<template>
  <div class="mt-5 list-group rounded">
    <div
      class="text-warning text-center list-group-item"
      data-bs-toggle="collapse"
      data-bs-target="#collapse1"
      aria-expanded="false"
      aria-controls="collapse1"
      @click="generalarrowChange()"
    >
      <div class="float-start">General</div>
      <div class="float-end">
        <i
          v-if="generalarrow == false"
          class="fa fa-chevron-up"
          aria-hidden="true"
        ></i>
        <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
      </div>
    </div>
    <div class="collapse show" id="collapse1">
      <pre> {{ labelbox }}</pre>
      <drag class="list-group-item" :transfer-data="labelbox"
        ><i class="fa fa-tag" aria-hidden="true"></i> Label</drag
      >
      <drag class="list-group-item" :transfer-data="textbox"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="25"
          fill="currentColor"
          class="bi bi-fonts"
          viewBox="0 0 16 18"
        >
          <path
            d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"
          />
        </svg>
        Textbox</drag
      >
      <drag class="list-group-item" :transfer-data="selectbox"
        ><i class="fa fa-chevron-circle-down" aria-hidden="true"></i>
        Dropdown</drag
      >
      <drag class="list-group-item" :transfer-data="textareabox"
        ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Textarea</drag
      >
      <drag class="list-group-item" :transfer-data="number"> Number</drag>
      <drag class="list-group-item" :transfer-data="email"> E-Mail</drag>
      <!--<drag class="list-group-item" :transfer-data="radiobox"><i class="fa fa-dot-circle-o" aria-hidden="true"></i> Radio Button</drag>
    <drag class="list-group-item" :transfer-data="checkbox"><i class="fa fa-check-square" aria-hidden="true"></i> Checkbox</drag>
    <drag class="list-group-item" :transfer-data="buttonbox"><i class="fa fa-bold" aria-hidden="true"></i> Button</drag>
    <drag class="list-group-item" :transfer-data="label2"><i class="fa fa-link" aria-hidden="true"></i> Link Button</drag>-->
      <drag class="list-group-item" :transfer-data="datebox"
        ><i class="fa fa-calendar" aria-hidden="true"></i> Datepicker</drag
      >
    </div>
    <!--<div class="text-warning text-center list-group-item" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2" @click="advancearrowChange()">
            <div class="float-start">Advanced</div>
            <div class="float-end">
                <i v-if="advancearrow == true" class="fa fa-chevron-up" aria-hidden="true"></i>
                <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
            </div>
    </div>
        <div class="collapse" id="collapse2">
        <drag class="list-group-item" :transfer-data="filebox"><i class="fa fa-file" aria-hidden="true"></i> File Upload</drag>
        <drag class="list-group-item" :transfer-data="urlbox"><i class="fa fa-link" aria-hidden="true"></i> URL</drag>
        <drag class="list-group-item mb-5" :transfer-data="tabelbox"><i class="fa fa-table" aria-hidden="true"></i> Table</drag>
    </div>-->
  </div>
</template>

<script>
import { Drag } from "vue-drag-drop";
export default {
  name: "drag-area",
  components: {
    Drag,
  },
  data: function () {
    return {
      advancearrow: false,
      generalarrow: false,
      tabelbox: {
        types: "table",
        row: "",
        col: "",
        info: "Tabel content",
      },
      labelbox: {
        type: "label",
        label: "",
        model: "labeling",
        color: "Black",
        featured: false,
        show: false,
      },
      textareabox: {
        type: "textArea",
        label: "",
        model: "name",
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
        placeholder: "",
        rows: 3,
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
      },
      textbox: {
        type: "input",
        inputType: "text",
        label: "",
        model: "pp",
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
        maxlength: 1000,
        styleClasses: "width-100",
        placeholder: "",
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
      },
      selectbox: {
        type: "select",
        label: "",
        required: false,
        values: "",
        model: "",
        noneSelectedText: "",
        featured: false,
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
      },
      filebox: {
        types: "file",
        info: "Choose your file",
      },
      checkbox: {
        types: "checkbox",
        info: "Enter checkbox here....",
      },
      radiobox: {
        type: "input",
        inputType: "radio",
        label: "",
        model: "name",
        values: [],
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
      },
      datebox: {
        type: "customdate",
        label: "",
        model: "",
        required: false,
        featured: false,
        placeholder: "",
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
        set: function (model, val) {
          return true;
        },
      },
      passwordbox: {
        types: "password",
        info: "Enter password here....",
      },
      buttonbox: {
        types: "button",
        info: "Enter submit here....",
      },
      urlbox: {
        type: "input",
        inputType: "url",
        label: "",
        model: "name",
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
        placeholder: "Hllo",
      },
      number: {
        type: "input",
        inputType: "number",
        label: "",
        model: "name",
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
        placeholder: "",
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
      },
      email: {
        type: "input",
        inputType: "email",
        label: "",
        model: "name",
        readonly: false,
        featured: false,
        required: false,
        disabled: false,
        maxlength: 1000,
        placeholder: "",
        show: false,
        isvisiblevalue: "",
        fieldmodalname: "all",
        visible: function (model) {
          return model && model.name == model.isvisiblevalue;
        },
      },
    };
  },
  methods: {
    advancearrowChange() {
      if (this.advancearrow == false) {
        this.advancearrow = true;
      } else {
        this.advancearrow = false;
      }
    },
    generalarrowChange() {
      if (this.generalarrow == false) {
        this.generalarrow = true;
      } else {
        this.generalarrow = false;
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 320px;
  padding: 10px;
  border: 5px solid gray;
  margin: 0;
}
.list-group {
  cursor: -webkit-grab;
  cursor: grab;
}
.list-group-item {
  background-color: whitesmoke;
}
</style>
