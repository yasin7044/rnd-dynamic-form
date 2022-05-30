<template>
    <div class="IndicationColor mb-2">
        <div class="p-2 text-dark">
            <div class="row">
                <div class="col-md-10 pointing" data-bs-toggle="collapse" :data-bs-target="'#text' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
                    Number: {{open.label}}
                </div>
                <div class="col-md-2 ml-auto">
                    <button class="btn text-dark" data-bs-toggle="collapse" :data-bs-target="'#text' + open.id" aria-expanded="true" :aria-controls="open.id" @click="arrowChange()">
                        <i v-if="arrow == true" class="fa fa-chevron-up" aria-hidden="true"></i>
                        <i v-else class="fa fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    <button class="btn text-danger" @click="DeleteItem()">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="collapse p-4" :id="'text' + open.id">
            <div class="row">
                <div class="col-5">
                    <label>Label</label>
                    <input type="text" v-model="open.label" class="form-control" />
                </div>
                <div class="col-3">
                    <label>Placeholder</label>
                    <input type="text"
                           v-model="open.placeholder"
                           class="form-control"
                           placeholder="Enter placeholder" />
                </div>
            </div>
            <br />
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
            <br />
            <div class="form-check form-check-inline">
                <input v-if="open.featured == true"
                       class="form-check-input"
                       @click="featuredfun"
                       type="checkbox"
                       :value="open.featured"
                       name="featured"
                       checked />
                <input v-else
                       class="form-check-input"
                       @click="featuredfun"
                       type="checkbox"
                       :value="open.featured"
                       name="featured" />
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
        name: "number-modal-area",
        data: function () {
            return {
                placeholder: "",
                label: "",
                labelHeading: "",
                id: 0,
                delete: false,
                arrow: false,
                Featured: false,
                Required: false,
                max: false,
                isvisiblevalue: "",
                fieldmodalname: "",

            };
        },
        props: {
            open,
            getNumberDataModel: Function,
            inputFields: [],
        },
        methods: {
            arrowChange() {
                if (this.arrow == false) {
                    this.arrow = true;
                } else {
                    this.arrow = false;
                }
            },
            requirefun() {
                if (this.open.required == false) {
                    this.open.required = true;
                } else {
                    this.open.required = false;
                }
            },
            featuredfun() {
                if (this.open.featured == false) {
                    this.open.featured = true;
                } else {
                    this.open.featured = false;
                }
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
                        console.log("dropdown", result);
                        return result[Object.keys(result)[0]] == extractedValue.toLowerCase() ? true : false
                    }
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
                            this.getNumberDataModel(this.delete, this.open);
                        } else {
                            swal("The field is safe!");
                        }
                    });
            },
            SubmitData() {

                this.getNumberDataModel(this.delete, this.open);
                this.arrowChange();

            },
        },
        mounted() {
            this.id = this.open.id;
            this.placeholder = this.open.placeholder;
            this.isvisiblevalue = this.open.isvisiblevalue;
            this.label = this.open.label;
            this.Featured = this.open.featured;
            this.Required = this.open.required;
        },
    };
</script>

<style>
    .IndicationColor {
        background-color: #C8C8C8;
        border: 0.01px solid rgb(0, 94, 133, 0.3);
        border-radius: 5px;
    }

    .OutlineButton {
        border: 1.5px solid #005e85;
        color: #005e85;
        background-color: #f9feff;
    }

        .OutlineButton:hover {
            border: 2px solid #005e85;
        }

    .pointing {
        cursor: pointer;
    }
</style>
