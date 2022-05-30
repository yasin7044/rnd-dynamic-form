<template>
  <div>
    <FieldLabel v-model="getModel.label" />
    <div class="my-2">
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="addFields"
      >
        Add Column Fields
      </button>
      <div class="container mt-2">
        <div
          v-for="(field, index) in value.fields"
          :key="index"
          class="border p-2 m-2"
        >
          <FieldLabel v-model="value.fields[index].label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldLabel from './FieldLabel.vue'

export default {
  name: "FieldColumn",
  components: {
    FieldLabel,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    addFields () {
      this.value.fields.push({
        label: "",
        model: 'F' + new Date().getTime()
      })
    }
  }
}
</script>

<style>
</style>