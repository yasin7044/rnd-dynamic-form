<template>
  <div class="IndicationColor mb-2">
    <div
      class="p-2 text-dark"
      data-bs-toggle="collapse"
      :data-bs-target="'#text' + id"
      aria-expanded="true"
      :aria-controls="id"
      @click="arrowChange()"
    >
      <div class="row justify-content-end">
        <div class="col">Radio Button</div>
        <div class="col-1">
          <button class="btn text-danger" @click="DeleteItem()">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div class="col-1">
          <i v-if="arrow == true" class="fa fa-chevron-up" aria-hidden="true"></i>
          <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    <div class="collapse p-4" :id="'text' + id">
      <div class="row">
        <div class="col-3">
          <label>Label</label>
          <input type="text" v-model="label" class="form-control" placeholder="Number" />
        </div>
        <div class="col-3">
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
        </div>
      </div>
      <div>
        <div class="col-4 mt-3" v-for="radio in radios" :key="radio.id">
          <label>Radio Button Name</label>
          <div class="input-group mb-3">
            <input class="form-control" v-model="radio.value" placeholder="Value" /><span>
              <button class="btn text-danger" @click="DeleteRadio(radio.id)">
                <i class="fa fa-trash" aria-hidden="true"></i></button
            ></span>
          </div>
        </div>
      </div>
      <button class="btn prime mt-2" @click="addradio">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </button>
      <div class="nav justify-content-end">
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
      </div>
      <div class="form-check form-check-inline">
        <input
          v-if="Readonly == true"
          class="form-check-input"
          @click="readonlyfun"
          type="checkbox"
          :value="Readonly"
          name="readonly"
          checked
        />
        <input
          v-else
          class="form-check-input"
          @click="readonlyfun"
          type="checkbox"
          :value="Readonly"
          name="readonly"
        />
        <label class="form-check-label">Readonly</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          v-if="Featured == true"
          class="form-check-input"
          @click="featuredfun"
          type="checkbox"
          :value="Featured"
          name="featured"
          checked
        />
        <input
          v-else
          class="form-check-input"
          @click="featuredfun"
          type="checkbox"
          :value="Featured"
          name="featured"
        />
        <label class="form-check-label">Featured</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          v-if="Required == true"
          class="form-check-input"
          @click="requirefun"
          type="checkbox"
          name="required"
          :value="Required"
          checked
        />
        <input
          v-else
          class="form-check-input"
          @click="requirefun"
          type="checkbox"
          name="required"
          :value="Required"
        />
        <label class="form-check-label">Required</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          v-if="Disabled == true"
          class="form-check-input"
          type="checkbox"
          @click="disablefun"
          :value="Disabled"
          name="disabled"
          checked
        />
        <input
          v-else
          class="form-check-input"
          type="checkbox"
          @click="disablefun"
          :value="Disabled"
          name="disabled"
        />
        <label class="form-check-label">Disabled</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "radio-modal-area",
  data: function () {
    return {
      label: "",
      id: 0,
      delete: false,
      arrow: false,
      radios: [],
      unique: 0,
      Featured: false,
      Required: false,
      Disabled: false,
      Readonly: false,
    };
  },
  props: {
    open,
    getRadioDataModel: Function,
  },
  methods: {
    DeleteRadio(id) {
      for (let i = 0; i < this.radios.length; i++) {
        if (this.radios[i].id == id) {
          this.radios.splice(i, 1);
        }
      }
    },
    addradio() {
      if (this.label == "") {
        alert("Please fill the label name before adding Radios");
      } else {
        var item = {
          id: this.unique,
          name: this.label,
          value: "",
        };
        this.radios.push(item);
        this.unique = this.unique + 1;
      }
    },
    disablefun() {
      if (this.Disabled == false) {
        this.Disabled = true;
      } else {
        this.Disabled = false;
      }
    },
    requirefun() {
      if (this.Required == false) {
        this.Required = true;
      } else {
        this.Required = false;
      }
    },
    readonlyfun() {
      if (this.Readonly == false) {
        this.Readonly = true;
      } else {
        this.Readonly = false;
      }
    },
    featuredfun() {
      if (this.Featured == false) {
        this.Featured = true;
      } else {
        this.Featured = false;
      }
    },
    arrowChange() {
      if (this.arrow == false) {
        this.arrow = true;
      } else {
        this.arrow = false;
      }
    },
    DeleteItem() {
      this.delete = true;
      this.getRadioDataModel(this.delete, this.open);
    },
    SubmitData() {
      if (this.label == "") {
        alert("please fill the fields");
      } else {
        this.open.label = this.label;
        this.open.readonly = this.Readonly;
        this.open.required = this.Required;
        this.open.featured = this.Featured;
        this.open.disabled = this.Disabled;
        this.open.values = this.radios;
        this.open.id = this.id;
        this.getRadioDataModel(this.delete, this.open);
      }
      this.arrowChange();
    },
  },
  mounted() {
    this.id = this.open.id;
    this.label = this.open.label;
    this.Readonly = this.open.readonly;
    this.Featured = this.open.featured;
    this.Required = this.open.required;
    this.Disabled = this.open.disabled;
    this.radios = this.open.values;
    let count = 0;
    for (let i = 0; i < this.radios.length; i++) {
      count = count + 1;
    }
    this.unique = count;
  },
};
</script>

<style>
.prime {
  color: #2567bb;
}
.prime:hover {
  color: #005e85;
}
</style>
