<template>
  <div :class="wrapperClass">
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
            <div
              v-if="!row.noInputFields"
              class="row flex-nowrap input-groups justify-content-between"
            >
              <div
                v-for="field in getColumnFields(column)"
                :key="field.model"
                class="input-group"
              >
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
        <tr v-if="subtotal">
          <th scope="row">Subtotal</th>
          <td v-for="column in columns" :key="column.model">
            <div class="row flex-nowrap input-groups justify-content-between">
              <div
                v-for="field in getColumnFields(column)"
                :key="field.model"
                class="input-group"
              >
                <input
                  :type="field.type || 'number'"
                  :id="`${field.model}-subtotal-${column.model}`"
                  :name="`${field.model}-subtotal-${column.model}`"
                  :value="!value ? '' : !value['subtotal'] ? '' : !value['subtotal'][column.model] ? '' : value['subtotal'][column.model][field.model]"
                  :disabled="field.disabled"
                  :required="field.required"
                  :class="`form-control ${field.class || ''}`"
                  readonly
                />
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="total">
          <th scope="row">Total</th>
          <td v-for="column in columns" :key="column.model">
            <div class="row flex-nowrap input-groups justify-content-between">
              <div
                v-for="field in getColumnFields(column)"
                :key="field.model"
                class="input-group"
              >
                <input
                  :type="field.type || 'number'"
                  :id="`${field.model}-total-${column.model}`"
                  :name="`${field.model}-total-${column.model}`"
                  :value="!value ? '' : !value['total'] ? '' : !value['total'][column.model] ? '' : value['total'][column.model][field.model]"
                  :disabled="field.disabled"
                  :required="field.required"
                  :class="`form-control ${field.class || ''}`"
                  readonly
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
    subtotal() {
      const { subtotal } = this.schema;
      return subtotal;
    },
    total() {
      const { total } = this.schema;
      return true;
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

      this.calculate(field, column);
    },
    calculate(field, column) {
      const { model: columnModel } = column;
      const { model: fieldModel } = field;
      const subtotalModel = "subtotal";
      const totalModel = "total";
      const { [subtotalModel]: subtotalValues } = this.value ?? {};
      const { [totalModel]: totalValues } = this.value ?? {};
      const { [columnModel]: columnSubtotalValues } = subtotalValues ?? {};
      const { [columnModel]: columnTotalValues } = totalValues ?? {};
      let subtotal = 0;
      let total = 0;

      this.rows.forEach((row) => {
        const { model, isInSubtotal, noInputFields } = row;

        if (noInputFields) return;

        const { [model]: rowValue } = this.value ?? {};
        const { [columnModel]: columnValue } = rowValue ?? {};
        const { [fieldModel]: fieldValue } = columnValue ?? {};
        const value = fieldValue || 0
        total += parseFloat(value);

        if (this.subtotal && isInSubtotal) {
          subtotal += parseFloat(value);
        }
      });

      this.value = {
        ...this.value,
        [subtotalModel]: {
          ...subtotalValues,
          [columnModel]: {
            ...columnSubtotalValues,
            [fieldModel]: subtotal,
          },
        },
        [totalModel]: {
          ...totalValues,
          [columnModel]: {
            ...columnTotalValues,
            [fieldModel]: total,
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

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
</style>
