<template>
  <div>
    <h1 class="text-center">Demo of vue-form-generator</h1>
    <div class="container" id="app">
      <div class="panel panel-default">
        <div class="panel-heading">Form</div>
        <div class="panel-body">
          <!-- <pre>  {{model}}</pre> -->
          <vue-form-generator
            :schema="schema"
            :model="model"
          ></vue-form-generator>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">Model</div>
        <div class="panel-body">
          <pre v-if="model" v-html="prettyJSON(model)"></pre>
        </div>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">Schema</div>
        <div class="panel-body">
          <pre v-if="model" v-html="prettyJSON(schema)"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from "vue-form-generator";

export default {
  components: {
    "vue-form-generator": VueFormGenerator.component,
  },
  data() {
    return {
      model: {
        dataTable: [],
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
          },
          {
            type: "FileUploader",
          },
          {
            type: "matrix",
            inputType: "text",
            label: "Matrix",
            model: "matrix",
            subtotal: true,
            total: true,
            columns: [
              {
                label: "Testing Column1",
                model: "col1",
                value: 1,
                fields: [
                  {
                    label: "SuperMen",
                    model: "superMen",
                  },
                  {
                    label: "WonderWomen",
                    model: "wonderWomen",
                  },
                  {
                    label: "Hulk",
                    model: "hulk",
                  },
                ],
              },
              { label: "Testing column 2", model: "col2" },
              { label: "Testing column 3", model: "col3" },
            ],
            rows: [
              { label: "Testing Row 1", model: "row1", isInSubtotal: true },
              { label: "Testing Row 2", model: "row2", isInSubtotal: true },
              { label: "Testing Row 3", model: "row3", noInputFields: true },
              { label: "Testing Row 4", model: "row4" },
            ],
            columnsFields: [
              {
                label: "Men",
                model: "men",
              },
              {
                label: "Women",
                model: "women",
              },
              {
                label: "Other",
                model: "other",
              },
            ],
          },
          {
            type: "DataTable",
            tableLabel: "Data Table",
            model: "dataTable",
            isAddButtonRequired: true,
            headers: [
              {
                text: "First Name",
                type: "input",
                inputType: "text",
                value: "value-1",
              },
              {
                text: "Last Name",
                type: "input",
                inputType: "text",
                value: "value-2",
              },
              {
                text: "Age",
                type: "input",
                inputType: "number",
                value: "value-4",
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },

  methods: {
    prettyJSON: function (json) {
      if (json) {
        json = JSON.stringify(json, undefined, 4);
        json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function (match) {
            var cls = "number";
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = "key";
              } else {
                cls = "string";
              }
            } else if (/true|false/.test(match)) {
              cls = "boolean";
            } else if (/null/.test(match)) {
              cls = "null";
            }
            return '<span class="' + cls + '">' + match + "</span>";
          }
        );
      }
    },
  },
};
</script>

<style scoped>
html {
  font-family: Tahoma;
  font-size: 14px;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

pre {
  overflow: auto;
}
pre .string {
  color: #885800;
}
pre .number {
  color: blue;
}
pre .boolean {
  color: magenta;
}
pre .null {
  color: red;
}
pre .key {
  color: green;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.field-checklist .wrapper {
  width: 100%;
}
</style>
