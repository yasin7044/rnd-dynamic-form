<template>
  <v-data-table
    :headers="computedHeaders"
    :items="value"
    sort-by="calories"
    class="elevation-5"
    disable-pagination
    disable-filtering
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="mr-5">{{ label }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-dialog v-if="isAddButtonRequired" v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add {{ label }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <vue-form-generator :model="item" :schema="computedSchema" />
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ index }">
      <v-icon
        v-if="this.value.isEditable"
        small
        class="mr-2"
        @click="editItem(index)"
      >
        mdi-pencil
      </v-icon>
      <v-icon v-if="this.value.isDeletable" small @click="deleteItem(index)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:footer>
      <!-- <pre>Value: {{ obj }}</pre>
      <pre>Headers / Columns: {{ computedHeaders }}</pre>
      <pre>Schema: {{ computedSchema }}</pre> -->
    </template>
  </v-data-table>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import { abstractField } from "vue-form-generator";

export default {
  name: "FieldDataTable",
  mixins: [abstractField],
  components: { "vue-form-generator": VueFormGenerator.component },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    item: {
      "value-1": "",
      "value-2": "",
      "value-3": "",
    },
  }),
  computed: {
    isAddButtonRequired() {
      const { isAddButtonRequired } = this.schema;
      return isAddButtonRequired;
    },
    isEditable() {
      const { isEditable } = this.schema;
      return isEditable;
    },
    isDeletable() {
      const { isDeletable } = this.schema;
      return isDeletable;
    },
    headers() {
      const { headers } = this.schema;
      return headers ?? [];
    },
    label() {
      const { tableLabel } = this.schema;
      return tableLabel ?? "";
    },
    formTitle() {
      return this.editedIndex === -1
        ? `Add ${this.label}`
        : `Edit ${this.label}`;
    },
    computedSchema() {
      const schema = {
        fields: this.headers.map((header) => ({
          ...header,
          label: header.text,
          model: header.value,
        })),
      };
      return schema;
    },
    computedHeaders() {
      const headers = this.headers.filter((column) => !column.hideInTable);

      if (this.isEditable || this.isDeletable) {
        headers.push({
          text: "Actions",
          value: "actions",
        });
      }
      return headers;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(index) {
      this.editedIndex = index;
      this.item = Object.assign({}, this.value[index]);
      this.dialog = true;
    },

    deleteItem(index) {
      this.editedIndex = index;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.value.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.item = {};
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.item = {};
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.value[this.editedIndex], this.item);
      } else {
        this.value.push(this.item);
      }
      this.close();
    },
  },
};
</script>
