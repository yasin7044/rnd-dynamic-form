<template>
  <div class="mt-5 drop-field rounded" style="height: 100%">
    <drop
      class="box"
      @drop="handelDrop"
      style="min-height: 440px; max-height: 90vh"
    >
      <div v-for="(eachField, index) in generateField" :key="index">
        <div class="header">
          {{ eachField.formLabel }}
        </div>
        {{ eachField }}
        <component
          :is="eachField.componentName"
          v-model="generateField[index]"
        />
        <vs-button @click.prevent="deleteField(index)">Delete</vs-button>
      </div>

      <!-- <vs-collapse
        v-for="(eachField,index) in generateField"
        :key="index"
      >

        <vs-collapse-item :open="true">
          <div slot="header">
            {{eachField.formLabel}}
          </div>
          <component
            :is="eachField.componentName"
            v-model="generateField[index]"
          />
        </vs-collapse-item>
      </vs-collapse> -->
    </drop>

    <div>
      <h1 class="text-center">Demo of vue-form-generator</h1>
      <div class="container" id="app">
        <div class="panel panel-default">
          <div class="panel-heading">Form</div>
          <div class="panel-body">
            <vue-form-generator
              :schema="schema"
              :model="model"
            ></vue-form-generator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Drop } from "vue-drag-drop";
import VueFormGenerator from "vue-form-generator";

export default {
  components: {
    Drop,
    "vue-form-generator": VueFormGenerator.component,
  },
  data() {
    return {
      generateField: [],
      active: false,
      schema: {
        fields: [],
      },
      model: {},
    };
  },
  watch: {
    generateField: {
      deep: true,
      handler() {
        this.$set(this.schema, "fields", this.generateField);
      },
    },
  },
  methods: {
    handelDrop(data, event) {
      this.generateField.push(data);
    },
    deleteField(index) {
      this.$nextTick(() => {
        this.generateField.splice(index, 1);
      });
    },
  },
};
</script>

<style>
.mainbox {
  height: 95%;
  width: 100%;
}
.box {
  background-color: whitesmoke;
  overflow: auto;
  padding: 5px;
}

.drop-field {
  height: 100%;
  width: 100%;
  /* overflow-y: scroll; */
  margin-bottom: 20px;
}
</style>
