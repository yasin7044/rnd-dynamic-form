<template>
  <div class="IndicationColor mb-2">
    <div class="p-2 text-dark">
      <div class="row">
          <div class="col-md-10 pointing" data-bs-toggle="collapse" :data-bs-target="'#label' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
              <Label style="max-width: 100%; word-wrap: break-word; white-space: pre-wrap;" textWrap="true">Label: {{ open.label }}</Label>
          </div>
        <div class="col-md-2 ml-auto">
            <button class="btn text-dark" data-bs-toggle="collapse" :data-bs-target="'#label' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
                <i v-if="arrow == true" class="fa fa-chevron-up" aria-hidden="true"></i>
                <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          <button class="btn text-danger" @click="DeleteItem()">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="collapse p-4" :id="'label' + open.id">
        <div class="row">
            <div class="col-12">
                <label>Label</label>
                <!--<input type="text" v-model="open.label" class="form-control" />-->
                <textarea v-model="open.label" class="form-control"/>
            </div>
            <div class="col-4">
                <label>Label Color</label>
                <select v-model="open.color" class="form-control" name="LabelColor">
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                </select>
            </div>
            <!--<div class="col-3">
      <div class="row">
        <div class="col-6">
          <label>Label</label>
          <input type="text" v-model="open.label" class="form-control" />
        </div>
        <div class="col-4">
          <label>Label Color</label>
          <select v-model="open.color" class="form-control" name="LabelColor">
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <!--<div class="col-3">
          <label>Identifier</label>
          <input
            type="Number"
            class="form-control"
            placeholder="Enter the number"
            value="0"
          />
        </div>-->
        </div>
        <!--<div class="nav justify-content-end">
      <button
        class="btn OutlineButton"
        :data-bs-target="'#label' + open.id"
        aria-expanded="false"
        :aria-controls="open.id"
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
                   name="featuredLabel"
                   checked />
            <input v-else
                   class="form-check-input"
                   @click="featuredfun"
                   type="checkbox"
                   :value="open.featured"
                   name="featuredLabel" />
            <label class="form-check-label">Featured</label>
        </div>
    </div>
  </div>
</template>

<script>
    import swal from "sweetalert";
export default {
  name: "label-modal-area",
  props: {
    open,
    getLabelDataModal: Function,
  },
  data: function () {
    return {
      label: "",
      id: 0,
      delete: false,
      arrow: false,
    };
  },
  methods: {
    arrowChange() {
      if (this.arrow == false) {
        this.arrow = true;
      } else {
        this.arrow = false;
      }
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
                      this.getLabelDataModal(this.delete, this.open);
                  } else {
                      swal("The field is safe!");
                  }
              });
    },
    SubmitData() {

        //this.open.label = this.label;
        //this.open.id = this.id;
        this.getLabelDataModal(this.delete, this.open);
        this.arrowChange();
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
  },
};
</script>

<style></style>
