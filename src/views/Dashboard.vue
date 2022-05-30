<template>
  <div class="sww">
    <div class="nav justify-content-end mt-2 mb-4">
      <button
        type="button"
        class="btn btn-secondary float-right"
        @click="openModal"
        value="Add"
      >
        Create New AQ Form
      </button>
      <button
        type="button"
        class="btn btn-danger float-right"
        v-on:click.stop.prevent="logout"
      >
        Log Out <i class="fa fa-power-off"></i>
      </button>
    </div>
    <div class="nav justify-content-end mb-5">
      <div class="search float-right">
        <label for="search" class="mr-3">Select Year:</label>
        <select
          class="search-group mx-3"
          placeholder=" "
          name="search-group"
          id="search-group"
          v-model="selectOptionToFilter"
          @change="onChange($event)"
        >
          <option selected value="all">
            <p>All</p>
          </option>
          <option selected value="2022">
            <p>2022</p>
          </option>
          <option value="2021">
            <p>2021</p>
          </option>
          <option value="2020">
            <p>2020</p>
          </option>
          <option value="2019">
            <p>2019</p>
          </option>
          <option value="2018">
            <p>2018</p>
          </option>
          <option value="2017">
            <p>2017</p>
          </option>
        </select>
      </div>
    </div>
    <br />
    <div v-if="myModal">
      <transition name="slide-fade">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content needs-validation">
                <div class="modal-header">
                  <h6 class="modal-titel">Complete the selection process to proceed</h6>
                  <button class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col">
                      <select
                        v-bind:class="{
                          'form-control': true,
                          'is-invalid': select.year,
                        }"
                        required
                        @blur="onYearChange($event)"
                        aria-label="Default select example"
                      >
                        <option value="all" disabled selected hidden>Select year</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                      </select>
                      <div class="invalid-feedback">Please select year</div>
                    </div>
                    <div class="col">
                      <select
                        v-bind:class="{
                          'form-control': true,
                          'is-invalid': select.menu,
                        }"
                        required
                        @blur="onAQMenuChange($event)"
                        aria-label="Default select example"
                      >
                        <option value="all" disabled selected hidden>Select Menu</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                      </select>
                      <div class="invalid-feedback">Please select menu</div>
                    </div>
                    <div class="col">
                      <select
                        v-bind:class="{
                          'form-control': true,
                          'is-invalid': select.submenu,
                        }"
                        required
                        @blur="onAQSubMenuChange($event)"
                      >
                        <option value="all" disabled selected hidden>
                          Select Submenu
                        </option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                        <option value="0">0</option>
                      </select>
                      <div class="invalid-feedback">Please select submenu</div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="row justify-content-end">
                    <div class="col">
                      <button class="btn cancel" @click="closeModal">Cancel</button>
                    </div>
                    <div class="col">
                      <button class="btn continue" @click="submitdata">Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="dashboard mx-5 mt-4">
      <div class="grid1-container mb-2">
        <div class="stic">
          <strong>Id</strong>
        </div>
        <div class="stic">
          <strong>FullName</strong>
        </div>
        <div class="stic">
          <strong>Country</strong>
        </div>
        <div class="stic">
          <strong>Created at</strong>
        </div>
        <div class="stic q">
          <strong>Email</strong>
        </div>
      </div>
      <div class="grid-container my-1">
        <div>0</div>
        <div>AaronKris</div>
        <div>Philippines</div>
        <div>1991-05-23T14:19:51</div>
        <div>Ophelia_Mitchell@karley.name</div>
      </div>
      <div class="grid-container my-1">
        <div>1</div>
        <div>SimeonMcLaughlin</div>
        <div>Singapore</div>
        <div>2012-03-07T00:08:36</div>
        <div>Sabrina_Barton@torey.net</div>
      </div>
      <div class="grid-container my-1">
        <div>2</div>
        <div>Kelsie Shanahan</div>
        <div>Brazil</div>
        <div>1985-03-10T20:13:04</div>
        <div>Karianne@salvatore.biz</div>
      </div>
      <div class="grid-container my-1">
        <div>2</div>
        <div>Kelsie Shanahan</div>
        <div>Brazil</div>
        <div>1985-03-10T20:13:04</div>
        <div>Karianne@salvatore.biz</div>
      </div>
      <div class="grid-container my-1">
        <div>2</div>
        <div>Kelsie Shanahan</div>
        <div>Brazil</div>
        <div>1985-03-10T20:13:04</div>
        <div>Karianne@salvatore.biz</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "Dashboard",
  data() {
    return {
      templates: [],
      filterParameters: [],
      selectOptionToFilter: "all",
      select: { year: false, menu: false, submenu: false },
      selectvalid: { year: false, menu: false, submenu: false },
      myModal: false,
    };
  },
  methods: {
    submitdata() {
      if (
        this.select.year == false &&
        this.select.menu == false &&
        this.select.submenu == false
      ) {
        this.select.year = false;
        this.select.menu = false;
        this.select.submenu = false;
        let data = {
          id: 25,
          description: "pass data through params",
        };
        this.$router.push({ name: "Template", params: { data } });
      } else {
        alert("Please complete the selection process");
      }
    },
    openModal() {
      this.myModal = true;
    },
    closeModal() {
      this.myModal = false;
      this.select.year = false;
      this.select.menu = false;
      this.select.submenu = false;
    },
    getTemplates(filter) {
      let param = {
        length: 10,
        start: 0,
        draw: 10,
        sortBy: "string",
        sortDesc: true,
        search: {
          searchByAttribute: "string",
          value: "string",
          inActive: true,
        },
        order: [
          {
            column: 0,
            name: "string",
            dir: "string",
          },
        ],
        filterParameters: filter,
        isColumnFilter: true,
      };
      axios
        .post("/Template/FetchTemplates", param)
        .then((response) => {
          if (response.status === 200) {
            this.templates = response.data.data;
          }
        })
        .catch(function (error) {
          // alert(error.response.data.message);
        });
    },
    onChange(event) {
      this.filterParameters = [];
      if (event.target.value.toString() != "all") {
        this.filterParameters = [
          { Key: "FormNumber", Value: null },
          { Key: "Name", Value: null },
          { Key: "Year", Value: event.target.value.toString() },
          { Key: "Menu", Value: null },
          { Key: "SubMenu", Value: null },
          { Key: "ModifiedBy", Value: null },
          { Key: "LastModified", Value: null },
          { Key: "TemplateStatus", Value: null },
        ];
      }
      this.getTemplates(this.filterParameters);
    },
    onYearChange(event) {
      if (event.target.value.toString() != "all") {
        this.select.year = false;
      } else {
        this.select.year = true;
      }
    },
    onAQMenuChange(event) {
      if (event.target.value.toString() != "all") {
        this.select.menu = false;
      } else {
        this.select.menu = true;
      }
    },
    onAQSubMenuChange(event) {
      if (event.target.value.toString() != "all") {
        this.select.submenu = false;
      } else {
        this.select.submenu = true;
      }
    },
    logout() {
      Cookies.remove("token");
      Cookies.remove("userEmail");

      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      this.$router.push("/");
    },
  },
  activated() {},
  mounted() {
    this.getTemplates(this.filterParameters);
  },
  updated() {},
};
</script>
<style scoped>
.dashboard {
  height: 30%;
  overflow: auto;
  border-radius: 6px;
  background-color: #0a91ac;
}
.sww {
  height: 100%;
}
.grid-container:hover {
  background: #f9feff;
}
div.grid1-container {
  top: 0;

  position: sticky;
  position: -webkit-sticky;
}
.grid-container:nth-child(even) {
  background-color: rgba(89, 202, 250, 0.8);
}
.grid-container:nth-child(even):hover {
  background: #f9feff;
}
.grid-container {
  display: grid;
  align-content: start;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  grid-template-columns: 20% 20% 20% 20% 20%;
}
.grid-container > div {
  text-align: center;
  padding: 10px 0;
  width: 100%;
  overflow: auto;
}
.grid1-container {
  display: grid;
  align-content: start;
  border-radius: 5px;
  background-color: #edfbff;
  grid-template-columns: 20% 20% 20% 20% 20%;
}
.grid1-container > div {
  text-align: center;
  padding: 10px 0;
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
select {
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
