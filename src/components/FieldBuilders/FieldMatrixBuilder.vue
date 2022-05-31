<template>
  <div class="container flex-column mb-2 border">
    <button @click.prevent="setDummyColumnRows">Dummy Field</button>
    <FieldLabel v-model="modelValue.label" />

    <div class="my-2">
      <button type="button" class="btn btn-primary" @click.prevent="addColumn">
        Add Column
      </button>
      <div class="container mt-2">
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldColumn
            v-model="columns[index]"
            @onDelete="removeColumn(index)"
          />
        </div>
      </div>
    </div>

    <div class="my-2">
      <button type="button" class="btn btn-primary" @click.prevent="addRow">
        Add Row
      </button>

      <div class="container mt-2">
        <div v-for="(row, index) in rows" :key="index" class="border p-2 m-2">
          <FieldRow v-model="rows[index]" @onDelete="removeRow(index)" />
        </div>
      </div>
    </div>

    <div class="my-2">
      <button type="button" class="btn btn-primary" @click="addColumnFields">
        Add Column Field
      </button>
      <div class="container mt-2">
        <div
          v-for="(row, index) in columnsFields"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldLabel v-model="columnsFields[index].label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldLabel from "./FieldLabel.vue";
import FieldColumn from "./FieldColumn.vue";
import FieldRow from "./FieldRow.vue";

export default {
  name: "FieldMatrixBuilder",
  components: {
    FieldColumn,
    FieldLabel,
    FieldRow,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    columns: {
      get() {
        if (!this.modelValue.columns) {
          this.columns = [];
        }
        console.log("get columns");
        return this.modelValue.columns;
      },
      set(value) {
        console.log("set columns", value);
        this.modelValue = {
          ...this.modelValue,
          columns: value,
        };
      },
    },
    rows: {
      get() {
        if (!this.modelValue.rows) {
          this.rows = [];
        }
        return this.modelValue.rows;
      },
      set(value) {
        this.modelValue = {
          ...this.modelValue,
          rows: value,
        };
      },
    },
    columnsFields: {
      get() {
        if (!this.modelValue.columnsFields) {
          this.columnsFields = [];
        }
        return this.modelValue.columnsFields;
      },
      set(value) {
        this.modelValue = {
          ...this.modelValue,
          columnsFields: value,
        };
      },
    },
  },
  methods: {
    setDummyColumnRows() {
      this.value.columns = [
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
        {
          label: "Testing column 2",
          model: "col2",
        },
        {
          label: "Testing column 3",
          model: "col3",
        },
      ];
      this.value.rows = [
        {
          label: "Testing Row 1",
          model: "row1",
        },
        {
          label: "Testing Row 2",
          model: "row2",
        },
        {
          label: "Testing Row 3",
          model: "row3",
          noInputFields: true,
        },
        {
          label: "Testing Row 4",
          model: "row4",
        },
      ];

      this.value.columnsFields = [
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
      ];
    },
    addColumn() {
      this.columns.push({
        label: "",
        model: `col-${this.columns.length + 1}`,
      });
    },
    removeColumn(index) {
      console.log("remove column", index);
      this.columns = this.columns
        .filter((column, i) => i !== index)
        .map((column, index) => {
          column.model = `col-${index + 1}`;
          return column;
        });
    },
    addRow() {
      this.rows.push({
        label: "",
        model: `row-${this.rows.length + 1}`,
        noInputFields: false,
      });
    },
    removeRow(index) {
      console.log("remove row", index);
      this.rows = this.rows
        .filter((row, i) => i !== index)
        .map((row, index) => {
          row.model = `row-${index + 1}`;
          return row;
        });
    },
    addColumnFields() {
      this.columnsFields.push({
        label: "",
        model: `colField-${this.columnsFields.length + 1}`,
      });
    },
    removeColumnField(index) {
      console.log("remove column field", index);
      this.columnsFields = this.columnsFields
        .filter((field, i) => i !== index)
        .map((field, index) => {
          field.model = `colField-${index + 1}`;
          return field;
        });
    },
  },
};
</script>

<style></style>
