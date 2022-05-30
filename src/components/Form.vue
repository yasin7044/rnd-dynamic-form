<template>
    <div>
        <button class="btn btn-primary" @click="gotomain">Go back</button>
        <h2><i class="fa fa-file"></i> Your Form</h2>
        <div class="mt-4 box" style="background-color: #EBF5FB ">
            <div v-for="input_iteam in fullform" :key="input_iteam.id">
                <label class="form-label" v-if="input_iteam.label != 'No_label'">{{ input_iteam.label }} </label>
                <br />
                <input v-if="input_iteam.inputType !='textarea' && input_iteam.type != 'select' &&  input_iteam.inputType != 'radio'  && input_iteam.inputType !='table'"
                       class="mb-3"
                       :type="input_iteam.inputType"
                       :placeholder="input_iteam.placeholder" /><!--<a v-if="input_iteam.linkname!='No_link'" :href="input_iteam.linkname"><i class="fa fa-link"></i></a>-->
                <textarea v-if="input_iteam.inputType=='textarea'" :placeholder="input_iteam.placeholder"></textarea>
                <div v-if="input_iteam.inputType == 'radio'">
                    <div class="form-check form-check-inline"
                         v-for="radio in input_iteam.values"
                         :key="radio">
                        <label> {{ radio.value }}</label>
                        <input :type="input_iteam.inputType" :value="radio.value" :name="radio.name" />
                    </div>
                </div>
                <table v-if="input_iteam.inputType=='table'" style="width:50%">
                    <tr v-for="m in parseInt(input_iteam.row)" :key="m">
                        <td v-for="n in parseInt(input_iteam.col)" :key="n">
                            <input v-if="tableedit"
                                   class="form-control"
                                   type="text"
                                   disabled />
                            <input v-else class="form-control" type="text" />
                        </td>
                    </tr>
                    <button class="btn btn-primary" @click="Tableaccess">
                        {{ locklabel }}
                    </button>
                </table>
                <select v-if="input_iteam.type == 'select'">
                    <option :value="input_iteam.selectOptions.noneSelectedText" disabled selected hidden>
                        {{ input_iteam.selectOptions.noneSelectedText }}
                    </option>
                    <option v-for="value in input_iteam.values" :key="value" :value="value.name">
                        {{ value.name }}
                    </option>
                </select>
            </div>
        </div>
        <button @click="jsonwatch" class="btn btn-outline-info mb-5">JSON Watch</button>
    </div>
</template>

<script>
    import swal from "sweetalert";
    export default {
        name: "form",
        data() {
            return {
                fullform: [],
                locklabel: "Lock",
                tableedit: false,
            };
        },
        created() {
            if (!localStorage.getItem("Fullform")) {
                localStorage.setItem("Fullform", JSON.stringify([]));
            }
            const retrieve = JSON.parse(localStorage.getItem("Fullform"));
            this.fullform = retrieve.fields;
        },
        methods: {
            Tableaccess: function () {
                if (this.tableedit == true) {
                    this.tableedit = false;
                    this.locklabel = "Lock";
                } else {
                    this.tableedit = true;
                    this.locklabel = "Unlock";
                }
            },
            gotomain: function () {
                swal({
                    title: "Are you sure?",
                    text: "Once you go back This form will be cleared",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal("You can create new form now", {
                            icon: "success",
                        });
                        localStorage.clear();
                        this.$router.push({ name: "Template" });
                    } else {
                        swal("Your Form is Safe....");
                    }
                });
            },
            jsonwatch: function () {
                swal(localStorage.getItem("Fullform"));
            },
        },
    };
</script>

<style scoped>
    .box {
        width: 100%;
        height: 900px;
        border: 2px solid rgb(139, 132, 132);
        overflow: auto;
        border-radius: 8px;
        padding: 5px;
    }

    h2 {
        text-align: center;
    }

    td {
        padding: 15px;
    }

    table,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
</style>