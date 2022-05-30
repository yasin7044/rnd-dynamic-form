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
        <div class="col">URL</div>
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
          <label>Placeholder</label>
          <input
            type="text"
            v-model="placeholder"
            class="form-control"
            placeholder="Enter placeholder"
          />
        </div>
        <div class="col-3">
          <label>Label Position</label>
          <select class="form-control" name="LabelPosition">
            <option value="Top">Top</option>
            <option value="Left">Left</option>
          </select>
        </div>
        <div class="col-3">
          <label>Input Field Color</label>
          <select class="form-control" name="InputFieldColor">
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <div class="col-3">
          <label>Label Color</label>
          <select class="form-control" name="LabelColor">
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
  name: "urlmodal-area",
  data: function () {
    return {
      placeholder: "",
      label: "",
      id: 0,
      delete: false,
      arrow: false,
      Featured: false,
      Required: false,
      Disabled: false,
      Readonly: false,
    };
  },
  props: {
    open,
    getUrlDataModel: Function,
  },
  methods: {
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
      this.getUrlDataModel(this.delete, this.open);
    },
    SubmitData() {
      if (this.label == "" && this.placeholder == "") {
        alert("please fill the fields");
      } else {
        this.open.placeholder = this.placeholder;
        this.open.label = this.label;
        this.open.readonly = this.Readonly;
        this.open.required = this.Required;
        this.open.featured = this.Featured;
        this.open.disabled = this.Disabled;
        this.open.id = this.id;
        this.getUrlDataModel(this.delete, this.open);
        this.arrowChange();
      }
    },
  },
  mounted() {
    this.id = this.open.id;
    this.placeholder = this.open.placeholder;
    this.label = this.open.label;
    this.Readonly = this.open.readonly;
    this.Featured = this.open.featured;
    this.Required = this.open.required;
    this.Disabled = this.open.disabled;
  },
};
</script>

<style></style>
