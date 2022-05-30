<template>
  <div class="mainbox">
    <div class="row justify-content-end">
      <div class="col-3">
        <input />
      </div>
    </div>
  <!-- <pre>  {{schemaData}}</pre>
  <pre>  {{formOptions}}</pre>
   <pre> {{model}}</pre> -->
    <div class="mt-2 p-2 dropmainbox">
      <drop class="box" @drop="handelDrop">
        <div class="mt-1" v-for="field_iteam in inputFields.fields" :key="field_iteam.id">
          <div v-if="field_iteam.type == 'textArea'">
            <text-area-modal
              :getTextAreaDataModel="getTextAreaModal"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            />
          </div>
          <div v-if="field_iteam.type == 'label'">
            <label-modal :getLabelDataModal="getLabelModel" :open="field_iteam" />
          </div>
          <div v-else-if="field_iteam.type == 'select'">
            <drop-down
              :getDropdownDataModel="getDropdownModel"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            />
          </div>
          <div v-else-if="field_iteam.inputType == 'text'">
            <text-modal
              :getTextDataModel="getTextModal"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            />
          </div>
          <div v-else-if="field_iteam.inputType == 'number'">
            <number-modal
              :getNumberDataModel="getNumberModal"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            />
          </div>
          <div v-else-if="field_iteam.inputType == 'email'">
            <email-modal
              :getEmailDataModel="getEmailModal"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            />
          </div>
          <div v-else-if="field_iteam.type == 'customdate'">
            <date-modal
              :getDateDataModel="getDateModal"
              :open="field_iteam"
              v-bind:inputFields="inputFields"
            ></date-modal>
          </div>
        </div>
      </drop>
    </div>
    <button class="btn save mb-2">
      <b>Save</b>
    </button>
    <button class="btn save mb-2" @click="formPreview">
      <b>Preview</b>
    </button>
    <div v-if="showModalTemplate">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-dialog-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-titel">Preview</h6>
                  <button class="btn-close" @click="closeModalPreview"></button>
                </div>
                <div class="modal-body-lg">
                  <div class="modal-body-panel">
                    <vue-form-generator
                      v-bind:schema="schemaData"
                      v-bind:options="formOptions"
                      :model="model"
                    ></vue-form-generator>
                   <pre> {{ model }}</pre>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-success btn-w-m"
                    @click="closeModalPreview"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { Drop } from "vue-drag-drop";
import DateModal from "./DateModal.vue";
import LabelModal from "./LabelModal.vue";
import TextModal from "./TextModal.vue";
import TextAreaModal from "./TextAreaModal.vue";
import RadioModal from "./RadioModal.vue";
import DropDown from "./DropDown.vue";
import UrlModal from "./UrlModal.vue";
import NumberModal from "./NumberModal.vue";
import EmailModal from "./EmailModal.vue";
import axios from "axios";
import swal from "sweetalert";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
export default {
  name: "drop-area",
  components: {
    Drop,
    DateModal,
    LabelModal,
    TextModal,
    TextAreaModal,
    RadioModal,
    DropDown,
    UrlModal,
    "vue-form-generator": VueFormGenerator.component,
    NumberModal,
    EmailModal,
  },
  data: function () {
    return {
      inputFields: { fields: [] },
      model: {},
      label: [],
      formName: "",
      unique: 0,
      links: [],
      textField: [],
      year: "",
      menu: 0,
      submenu: 0,
      selectFormName: true,
      locklabel: "Lock",
      tableedit: false,
      showModalTemplate: false,
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
      schemaData: {},
      count: 0,
    };
  },
  methods: {
    getDateModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getLabelModel(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getTextModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getNumberModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getEmailModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getTextAreaModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getDropdownModel(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getRadioModel(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    getUrlModal(deleteitem, Data) {
      if (deleteitem == true) {
        this.deleteField(Data.id);
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          if (this.inputFields.fields[i].id == Data.id) {
            this.inputFields.fields.splice(i, 1, Data);
          }
        }
      }
    },
    OnFormNamechange(event) {
      if (event.target.value.toString() != "") {
        this.selectFormName = false;
      } else {
        this.selectFormName = true;
      }
    },
    Tableaccess: function () {
      if (this.tableedit == true) {
        this.tableedit = false;
        this.locklabel = "Lock";
      } else {
        this.tableedit = true;
        this.locklabel = "Unlock";
      }
    },
    handelDrop: function (data, event) {
      if (this.inputFields.fields === undefined) {
        this.inputFields = {
          fields: [],
        };
      }
      console.log(this.inputFields.fields);
      let count = 0;
      for (let i = 0; i < this.inputFields.fields.length; i++) {
        if (this.inputFields.fields[i].id != undefined) {
          count = this.inputFields.fields[i].id;
        }
      }
      this.unique = count + 1;
      if (data.type == "select") {
        var newitem = {
          type: data.type,
          label: data.label,
          required: data.required,
          featured: data.featured,
          model: this.unique + "_" + data.type,
          values: [],
          selectOptions: {
            noneSelectedText: data.noneSelectedText,
          },
          id: this.unique,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
        console.log("select", this.inputFields);
      } else if (data.inputType == "text") {
        var newitem = {
          type: data.type,
          inputType: data.inputType,
          label: data.label,
          model: this.unique + "_" + data.inputType,
          readonly: data.readonly,
          featured: data.featured,
          required: data.required,
          disabled: data.disabled,
          maxlength: data.maxlength,
          placeholder: data.placeholder,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
          styleClasses: data.styleClasses,
          id: this.unique,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
        console.log("input", this.inputFields);
      } else if (data.type == "label") {
        var newitem = {
          type: data.type,
          label: data.label,
          model: this.unique + "_" + data.type,
          color: data.color,
          id: this.unique,
          featured: data.featured,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
        console.log("label", this.inputFields);
      } else if (data.type == "textArea") {
        var newitem = {
          type: data.type,
          label: data.label,
          model: this.unique + "_" + data.type,
          readonly: data.readonly,
          featured: data.featured,
          required: data.required,
          disabled: data.disabled,
          placeholder: data.placeholder,
          rows: data.rows,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
          id: this.unique,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
        console.log("input", this.inputFields);
      } else if (data.inputType == "number") {
        var newitem = {
          type: data.type,
          inputType: data.inputType,
          label: data.label,
          model: this.unique + "_" + data.inputType,
          readonly: data.readonly,
          featured: data.featured,
          required: data.required,
          disabled: data.disabled,
          maxlength: data.maxlength,
          placeholder: data.placeholder,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
          id: this.unique,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
      } else if (data.inputType == "email") {
        var newitem = {
          type: data.type,
          inputType: data.inputType,
          label: data.label,
          model: this.unique + "_" + data.inputType,
          readonly: data.readonly,
          featured: data.featured,
          required: data.required,
          disabled: data.disabled,
          maxlength: data.maxlength,
          placeholder: data.placeholder,
          id: this.unique,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
      } else if (data.type == "customdate") {
        var newitem = {
          type: data.type,
          label: data.label,
          model: this.unique + "_" + data.type,
          required: data.required,
          featured: data.featured,
          placeholder: data.placeholder,
          id: this.unique,
          set: data.set,
          show: data.show,
          visible: data.visible,
          isvisiblevalue: data.isvisiblevalue,
          fieldmodalname: data.fieldmodalname,
        };
        this.unique = this.unique + 1;
        this.inputFields.fields.push(newitem);
      } else {
        swal("Still in progress");
      }
      event;
    },
    deleteField(Id) {
      var deletedModel = "";
      for (let i = 0; i < this.inputFields.fields.length; i++) {
        if (this.inputFields.fields[i].id == Id) {
          deletedModel = this.inputFields.fields[i].model;
          this.inputFields.fields.splice(i, 1);
        }
      }
      let counting = 1;
      for (let j = 0; j < this.inputFields.fields.length; j++) {
        this.inputFields.fields[j].id = counting;
        if (this.inputFields.fields[j].type == "input") {
          this.inputFields.fields[j].model =
            this.inputFields.fields[j].id + "_" + this.inputFields.fields[j].inputType;
        } else {
          this.inputFields.fields[j].model =
            this.inputFields.fields[j].id + "_" + this.inputFields.fields[j].type;
        }
        if (this.inputFields.fields[j].fieldmodalname == deletedModel) {
          this.inputFields.fields[j].show = false;
          this.inputFields.fields[j].fieldmodalname = "all";
          this.inputFields.fields[j].isvisiblevalue = "";
          this.inputFields.fields[j].visible = function (model) {
            return true;
          };
        }
        counting = counting + 1;
      }
      console.log("After arranging", this.inputFields.fields);
    },
    formCreate: function () {
      // if (this.selected.name == "") {
      //     swal("Please fill form name");
      // }
      if (this.inputFields.fields === undefined || this.inputFields.fields.length == 0) {
        swal("Please add atleast one control to create a template");
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          this.inputFields.fields[i].disabled =
            this.inputFields.fields[i].color == "Blue" ? true : false;
        }
        swal({
          title: "Are you sure?",
          text: "Click ok to save the Template",
          buttons: true,
        }).then((value) => {
          if (value) {
            for (let i = 0; i < this.inputFields.fields.length; i++) {
              if (
                this.inputFields.fields[i].show == true &&
                (this.inputFields.fields[i].fieldmodalname == "all" ||
                  this.inputFields.fields[i].isvisiblevalue == "")
              ) {
                this.inputFields.fields[i].show = false;
                this.inputFields.fields[i].fieldmodalname = "all";
                this.inputFields.fields[i].isvisiblevalue = "";
                this.inputFields.fields[i].visible = function (model) {
                  return true;
                };
              }
            }
            let token = localStorage.getItem("token");
            let config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            var templateRequest = {
              TemplateID: this.templateID,
              /*FormNumber: "FAQ-" + this.templateID,*/
              Name: this.selected.name,
              Year: this.year,
              MenuID: this.menu,
              SubMenuID: this.submenu,
              TemplateStatusID: 1,
              Schema: JSON.stringify(this.inputFields),
            };
            if (templateRequest) {
              console.log("Test", templateRequest);
              axios
                .post("/Template/SaveOrUpdateTemplate", templateRequest, config)
                .then((response) => {
                  console.log(response);
                  if (response.data.isSuccess) swal("Template Saved Sucessfully");
                  this.$router.push({ name: "Dashboard" });
                })
                .catch(function (error) {
                  swal(error, "error");
                });
            }
          } else {
            swal("Template is not saved");
          }
        });
      }
    },
    formPreview: function () {
      console.log("values", this.inputFields);
      if (this.inputFields.fields === undefined || this.inputFields.fields.length == 0) {
        swal("No controles are available to preview", "error");
        this.showModalTemplate = false;
      } else {
        for (let i = 0; i < this.inputFields.fields.length; i++) {
          this.inputFields.fields[i].disabled =
            this.inputFields.fields[i].color == "Blue" ? true : false;
        }
        this.schemaData = this.inputFields;
        this.showModalTemplate = true;
      }
    },
    closeModalPreview: function () {
      var that = this;
      that.showModalTemplate = false;
      that.model = {};
    },
  },
  updated() {

    console.log('HI')
    if (this.count == 0 && this.inputFields.fields.length > 0) {
      for (let i = 0; i < this.inputFields.fields.length; i++) {
        if (this.inputFields.fields[i].show == true) {
          const myObject = this.inputFields.fields[i];
          myObject.visible = function (model) {
            let result = {};
            console.log("Before", Object.entries(model));
            for (const [key, value] of Object.entries(model)) {
              console.log("After", model);
              if (key.includes(myObject.fieldmodalname)) {
                if (isNaN(value)) {
                  result[key] = value.toLowerCase();
                  console.log("String", value);
                } else {
                  if (myObject.fieldmodalname.search(/customdate/g) != -1) {
                    var today = new Date(value);
                    var dd = String(today.getDate()).padStart(2, "0");
                    var mm = String(today.getMonth() + 1).padStart(2, "0");
                    var yyyy = today.getFullYear();
                    today = mm + "/" + dd + "/" + yyyy;
                    result[key] = today;
                  } else {
                    result[key] = value;
                  }
                  console.log("Not a String", value);
                }
              }
            }
            if (result[Object.keys(result)[0]] == myObject.isvisiblevalue.toLowerCase()) {
              return true;
            }
          };
        }
        if (this.inputFields.fields[i].type == "customdate") {
          const myObject = this.inputFields.fields[i];
          myObject.set = function (model, val) {
            var today = new Date(val);
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;
            model[myObject.model] = today;
            console.log("After save model", model);
          };
        }
        this.count = 1;
      }
    }
  },
};
</script>
<style>
.form-group > label {
  max-width: 100% !important;
  word-wrap: break-word !important;
}
.form-group.disabled > label {
  color: blue !important;
  font-style: inherit !important;
  max-width: 100% !important;
  word-wrap: break-word !important;
}
.vue-form-generator .field-label span {
  display: block;
  width: 100%;
  margin-left: 12px;
  white-space: pre-wrap;
}
.width-10 {
  width: 10% !important;
  padding-left: 5px;
  padding-right: 5px;
}
.width-20 {
  width: 20% !important;
  padding-left: 5px;
  padding-right: 5px;
}
.width-30 {
  width: 30% !important;
  padding-left: 5px;
  padding-right: 5px;
}
.width-40 {
  width: 40% !important;
  padding-left: 5px;
  padding-right: 5px;
}
.width-50 {
  width: 50% !important;
  padding-left: 5px;
  padding-right: 5px;
}

/*        .width-30:first-child {
            padding: 0 6px 0 0;
        }

        .width-20:last-child {
            width: 20% !important;
            padding: 0 0 6px 0;
        }

        .width-20:first-child {
            padding: 0 10px 0 10px;
        }*/

/*    .form-group {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
        .form-group > label {
        margin-right: 1rem;
        color: blue !important;
    }
    .vue-form-generator .form-control {
        display: block;
        margin-right: 25rem;

        width: 100%;
        outline: 0;
        padding: 5px;

    }*/
</style>
<style scoped>
.mainbox {
  height: 95%;
  width: 100%;
}
.box {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
  overflow: auto;
  padding: 5px;
}

.dropmainbox {
  border: 2px dashed rgb(139, 132, 132);
  background-color: #edfbff;
  border-radius: 8px;
  height: 95%;
}

.a {
  border-right-style: dashed;
  border-color: rgb(139, 132, 132);
  border-width: 2px;
}

.b {
  position: absolute;
  bottom: 0px;
  width: 100px;
}

td {
  padding: 15px;
}

table,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.save {
  border: 1.5px solid #005e85;
  color: #005e85;
  background-color: #f9feff;
}

.save:hover {
  border: 2px solid #005e85;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-body-lg {
  position: relative;
  height: 400px;
  overflow-y: auto;
  overflow-y: scroll;
  padding: 10px;
}

.modal-body-panel {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

select,
#search-group {
  border: 1px solid #2567bb;
  color: #2567bb;
}

.continue {
  background-color: #005e85;
  color: #f9feff;
}

.cancel {
  border: 1.5px solid #005e85;
  color: #005e85;
}

.cancel:hover {
  border: 2px solid #005e85;
}

.createAQ {
  background-color: #005e85;
  color: #f9feff;
}

.modal-dialog-lg {
  max-width: 900px;
}
</style>
