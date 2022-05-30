<template>
  <div :class="wrapperClass">
  <!-- <pre>{{value}}</pre> -->
    <table :class="tableClass">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" v-for="column in columns" :key="column.model">
            <div class="column">
              <div>{{ column.label }}</div>
              <div class="row flex-nowrap">
                <label
                  v-for="field in getColumnFields(column)"
                  :key="field.model"
                  class="col mx-1"
                >
                  {{ field.label }}
                </label>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.model">
          <th scope="row">
            {{ row.label }}
          </th>
          <td v-for="column in columns" :key="column.model">
            <div v-if="!row.noInputFields" class="row flex-nowrap input-groups justify-content-between">
              <div v-for="field in getColumnFields(column)"
                :key="field.model"
                class="input-group">
                <input
                  :type="field.type || 'number'"
                  :id="`${field.model}-${row.model}-${column.model}`"
                  :name="`${field.model}-${row.model}-${column.model}`"
                  :value="getValue(field, row, column)"
                  :disabled="field.disabled"
                  :required="field.required"
                  :readonly="field.readonly"
                  :class="`form-control ${field.class || ''}`"
                  @input="onInput(field, row, column, $event)"
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
  name: "FieldMatrix",
  mixins: [abstractField],
  computed: {
    columns() {
      const { columns } = this.schema;
      return columns ?? [];
    },
    rows() {
      const { rows } = this.schema;
      return rows ?? [];
    },
    columnsFields() {
      const { columnsFields } = this.schema;
      return columnsFields ?? [];
    },
    wrapperClass() {
      const { wrapperClass } = this.schema;
      return wrapperClass || "table-responsive";
    },
    tableClass() {
      const { tableClass } = this.schema;
      return tableClass || "table table-bordered";
    },
  },
  methods: {
    getColumnFields(column) {
      return column.fields ?? this.columnsFields;
    },
    getValue(field, row, column) {
      const { model } = row;
      const { model: columnModel } = column;
      const { model: fieldModel } = field;
      const { [model]: rowValue } = this.value ?? {};
      const { [columnModel]: columnValue } = rowValue ?? {};
      const { [fieldModel]: fieldValue } = columnValue ?? {};
      return fieldValue;
    },
    onInput(field, row, column, event) {
      const { value } = event.target;
      this.setValue(field, row, column, value);
    },
    setValue(field, row, column, value) {
      const { model } = row;
      const { model: columnModel } = column;
      const { model: fieldModel } = field;
      const { [model]: rowValue } = this.value ?? {};
      const { [columnModel]: columnValue } = rowValue ?? {};
      this.value = {
        ...this.value,
        [model]: {
          ...rowValue,
          [columnModel]: {
            ...columnValue,
            [fieldModel]: value,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.input-groups {
  padding-left: 5px;
  padding-right: 5px;
}

.input-groups > .input-group {
  width: 70px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
