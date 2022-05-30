<template>
  <div>
    <FieldLabel v-model="getModel.label" />
  </div>
</template>

<script>
import FieldLabel from './FieldLabel.vue'

export default {
  name: "FieldRow",
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
}
</script>

<style>
</style>