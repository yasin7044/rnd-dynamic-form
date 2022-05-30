<template>
  <div class="container flex-column mb-2 border">

    <button @click.prevent="setDummyColumnRows">Dummy Field</button>
    <FieldLabel v-model="modelValue.label" />

    <div class="my-2">
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="addColumn"
      >
        Add Column
      </button>
      <div class="container mt-2">
        <div
          v-for="(column, index) in modelValue.columns"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldColumn v-model="modelValue.columns[index]" />
        </div>
      </div>
    </div>

    <div class="my-2">
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="addRow"
      >Add Rows</button>

      <div class="container mt-2">
        <div
          v-for="(row, index) in modelValue.rows"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldRow v-model="modelValue.rows[index]" />
        </div>
      </div>
    </div>

    <div class="my-2">
      <button
        type="button"
        class="btn btn-primary"
        @click="addColumnFields"
      >Add Column Fields</button>
      <div class="container mt-2">
        <div
          v-for="(row, index) in modelValue.columnsFields"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldLabel v-model="modelValue.columnsFields[index].label" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FieldLabel from "./FieldLabel.vue";
import FieldColumn from './FieldColumn.vue';
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
      get () {
        return this.value
      },
      set (value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    setDummyColumnRows () {
      this.value.columns = [
        {
          "label": "Testing Column1",
          "model": "col1",
          "value": 1,
          "fields": [
            {
              "label": "SuperMen",
              "model": "superMen"
            },
            {
              "label": "WonderWomen",
              "model": "wonderWomen"
            },
            {
              "label": "Hulk",
              "model": "hulk"
            }
          ]
        },
        {
          "label": "Testing column 2",
          "model": "col2"
        },
        {
          "label": "Testing column 3",
          "model": "col3"
        }
      ]
      this.value.rows = [
        {
          "label": "Testing Row 1",
          "model": "row1"
        },
        {
          "label": "Testing Row 2",
          "model": "row2"
        },
        {
          "label": "Testing Row 3",
          "model": "row3",
          "noInputFields": true
        },
        {
          "label": "Testing Row 4",
          "model": "row4"
        }
      ]

      this.value.columnsFields = [
        {
          "label": "Men",
          "model": "men"
        },
        {
          "label": "Women",
          "model": "women"
        },
        {
          "label": "Other",
          "model": "other"
        }
      ]

    },
    addColumn () {
      this.value.columns.push({ label: '', fields: [], model: 'C' + new Date().getTime(), value: null });
    },
    addRow () {
      this.value.rows.push({ label: '', fields: [], model: 'R' + new Date().getTime(), value: null })
    },
    addColumnFields () {
      console.log(this.value)
      this.value.columnsFields.push({ label: '', model: 'F' + new Date().getTime() })

    }
  }
}
</script>

<style>
</style>