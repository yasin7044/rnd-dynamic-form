<template>
  <div class="IndicationColor mb-2">
    <div class="p-2 text-dark">
      <div class="row">
          <div class="col-md-10 pointing" data-bs-toggle="collapse" :data-bs-target="'#select' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
                Dropdown: {{open.label}}
          </div>
          <div class="col-md-2 ml-auto">
              <button class="btn text-dark" data-bs-toggle="collapse" :data-bs-target="'#select' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
                  <i v-if="arrow == true" class="fa fa-chevron-up" aria-hidden="true"></i>
                  <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
              </button>
              <button class="btn text-danger" @click="DeleteItem()">
                  <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
          </div>
      </div>
    </div>
    <div class="collapse p-4" :id="'select' + open.id">
        <div class="row">
            <div class="col-5">
                <label>Label</label>
                <input type="text" v-model="open.label" class="form-control" />
            </div>
            <div class="col-3">
                <label>None Selected Text</label>
                <input type="text"
                       v-model="open.selectOptions.noneSelectedText"
                       class="form-control" />
            </div>
            <!--<div class="col-3">
          <label>Label Position</label>
          <select class="form-control" name="LabelPosition">
            <option value="Top">Top</option>
            <option value="Left">Left</option>
          </select>
        </div>
        <div class="col-3">
          <label>Radio button Color</label>
          <select class="form-control" name="InputFieldColor">
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <div class="col-3">
          <label>Identifier</label>
          <input
            type="Number"
            class="form-control"
            placeholder="Enter the number"
            value="0"
          />
        </div>-->
        </div>
        <div>
            <div class="col-4 mt-3" v-for="option in open.values" :key="option.unique">
                <label>Option name</label>
                <div class="input-group mb-3">
                    <input class="form-control" @keyup="assignId(option.unique)" v-model="option.name" placeholder="Value" /><span>
                        <button class="btn text-danger" @click="DeleteOptions(option.unique)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <button class="btn prime mt-2" @click="addOptions">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        <div class="row">
            <div class="col-3" v-if="open.show">
                <label>If the form component</label>
                <select class="form-control" placeholder="Please select" v-model="open.fieldmodalname" @change="fieldmodalselect">
                    <option value="all">
                        Select
                    </option>
                    <option v-for="input in inputFields.fields" v-bind:value="input.model" v-if="input.id < open.id">
                        {{input.model }}
                    </option>
                </select>

            </div>
            <div v-if="open.show" class="col-3">
                <label>has value</label>
                <input type="text" class="form-control" @keyup="fieldmodalselect" v-model="open.isvisiblevalue" />
            </div>
        </div>
        <!--<div class="nav justify-content-end">
      <button
        class="btn OutlineButton"
        :data-bs-target="'#text' + id"
        aria-expanded="false"
        :aria-controls="id"
        data-bs-toggle="collapse"
        @click="SubmitData"
      >
        Save
      </button>
    </div>-->
        <br>
        <div class="form-check form-check-inline">
            <input v-if="open.featured == true"
                   class="form-check-input"
                   @click="featuredfun"
                   type="checkbox"
                   :value="open.featured"
                   name="featuredDropdown"
                   checked />
            <input v-else
                   class="form-check-input"
                   @click="featuredfun"
                   type="checkbox"
                   :value="open.featured"
                   name="featuredDropdown" />
            <label class="form-check-label">Featured</label>
        </div>
        <div class="form-check form-check-inline">
            <input v-if="open.required == true"
                   class="form-check-input"
                   @click="requirefun"
                   type="checkbox"
                   name="required"
                   :value="open.required"
                   checked />
            <input v-else
                   class="form-check-input"
                   @click="requirefun"
                   type="checkbox"
                   name="required"
                   :value="open.required" />
            <label class="form-check-label">Required</label>
        </div>
        <div class="form-check form-check-inline" v-if="open.id!=1">
            <input v-if="open.show==true"
                   class="form-check-input"
                   @click="setVisible"
                   type="checkbox"
                   :value="open.maxlength"
                   name="visible"
                   checked />
            <input v-else
                   class="form-check-input"
                   @click="setVisible"
                   type="checkbox"
                   :value="open.maxlength"
                   name="visible" />
            <label class="form-check-label">Set visible field</label>
        </div>
    </div>
  </div>
</template>

<script>
    import swal from "sweetalert";
export default {
  name: "dropdown-area",
  data: function () {
    return {
      label: "",
      id: 0,
      delete: false,
      labelHeading:"",
      arrow: false,
      values: [],
      unique: 0,
        noneSelectedText: "",
      validator: [],
        Required: false,
        isvisiblevalue: "",
        fieldmodalname: "",
    };
  },
  props: {
    open,
      getDropdownDataModel: Function,
      inputFields: [],
  },
  methods: {
    DeleteOptions(id) {
      for (let i = 0; i < this.open.values.length; i++) {
        if (this.open.values[i].unique == id) {
          this.open.values.splice(i, 1);
        }
      }
      },
      assignId(ID) {
          for (let i = 0; i < this.open.values.length; i++) {
              if (this.open.values[i].unique == ID) {
                  this.open.values[i].id = this.open.values[i].name;
              }
          }
      },
    addOptions() {

        var item = {
            id: "",
            name: "",
            unique: this.unique,        
        };
        this.open.values.push(item);
        this.unique = this.unique + 1;

      },
      setVisible() {
          if (this.open.show == true) {
              this.open.show = false;
              this.open.fieldmodalname = "all";
              this.open.isvisiblevalue = "";
              this.open.visible = function (model) {
                  return true;
              }
          }
          else {
              this.open.show = true;
          }
      },

      fieldmodalselect() {
          if (this.open.fieldmodalname.search(/customdate/g) != -1 && this.open.isvisiblevalue == "") {
              swal({
                  title: "Write in MM/DD/YYYY format",
                  text: this.open.fieldmodalname + " component has value field should be in the format of MM/DD/YYYY Eg.('05/28/1997')",
              });
          }
          if (this.open.fieldmodalname != "all" && this.open.isvisiblevalue != "") {
              var that = this;
              var extractedValue = this.open.isvisiblevalue;
              var extractedValuefieldmodalname = that.open.fieldmodalname;
              var a = that.open.isvisiblevalue

              this.open.visible = function (model) {
                  let result = {}
                  console.log("model", model);
                  for (const [key, value] of Object.entries(model)) {
                      if (key.includes(extractedValuefieldmodalname)) {
                          if (isNaN(value)) {
                              result[key] = value.toLowerCase();
                          }
                          else {
                              if (extractedValuefieldmodalname.search(/customdate/g) != -1) {
                                  var today = new Date(value);
                                  var dd = String(today.getDate()).padStart(2, "0");
                                  var mm = String(today.getMonth() + 1).padStart(2, "0");
                                  var yyyy = today.getFullYear();
                                  today = mm + "/" + dd + "/" + yyyy;
                                  result[key] = today;
                              }
                              else {
                                  result[key] = value;
                              }
                          }
                      }
                  }
                  return result[Object.keys(result)[0]] == extractedValue.toLowerCase() ? true : false
              }
          }
      },
    requirefun() {
      if (this.open.required == false) {
        this.open.required = true;
      } else {
        this.open.required = false;
      }
    },
    arrowChange() {
      if (this.arrow == false) {
        this.arrow = true;
      } else {
        this.arrow = false;
      }
    },
    SubmitData() {

        //this.open.id = this.id;
        //this.open.label = this.label;
        //this.open.required = this.Required;
    /*    this.open.values = this.values;*/
/*            this.open.selectOptions.noneSelectedText = this.noneSelectedText;*/
          this.labelHeading = this.label;
        this.getDropdownDataModel(this.delete, this.open);

      this.arrowChange();
    },
      DeleteItem() {
          swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this field!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          })
              .then((willDelete) => {
                  if (willDelete) {
                      swal("You have deleted!", {
                          icon: "success",
                      });
                      this.delete = true;
                      this.getDropdownDataModel(this.delete, this.open);
                  } else {
                      swal("The field is safe!");
                  }
              });
      },
      featuredfun() {
          if (this.open.featured == false) {
              this.open.featured = true;
          } else {
              this.open.featured = false;
          }
      },
  },
  mounted() {
    this.id = this.open.id;
    this.label = this.open.label;
      this.Required = this.open.required;
      this.isvisiblevalue = this.open.isvisiblevalue;
    this.values = this.open.values;
    this.selectOptions = this.open.selectOptions;
    let count = 0;
    for (let i = 0; i < this.open.values.length; i++) {
      count = count + 1;
    }
    this.unique = count;
  },
};
</script>

<style></style>
