<template>
  <v-file-input
    v-model="files"
    chips
    counter
    multiple
    show-size
    dense
    outlined
    :loading="loading"
    truncate-length="35"
    :label="label"
  >
    <template #selection="{ index, text }">
      <v-chip close color="primary" @click:close="removeFile(index)">
        {{ text }}
      </v-chip>
    </template>

    <template #append-outer>
      <v-btn
        icon
        color="primary"
        class="pb-2"
        :loading="loading"
        @click.prevent.stop="handleUpload"
      >
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
    </template>
  </v-file-input>

  <!--Thumbnail-->
  <!-- <v-card max-width="300">
      <v-img
        src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        width="300"
        height="200"
      >
        <v-icon
          color="error"
          style="position: absolute; top: 8px; right: 8px"
          @click="dialog = !dialog"
        >
          mdi-delete
        </v-icon>
        <v-card-title>Image</v-card-title>
        <template v-slot:placeholder>
          <v-skeleton-loader type="image" />
        </template>
      </v-img>
    </v-card> -->

  <!--Delete dialog-->
  <!-- <v-dialog v-model="dialog" hide-overlay width="300">
    <v-card color="primary" dark>
      <v-card-text>
        This will delete the image
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog> -->
</template>

<script>
import { abstractField } from "vue-form-generator";
import axios from "axios";

// implement api call here
async function uploadImage(formData) {
  try {
    const response = await axios.post(
      "https://api.upload.io/v1/files/basic",
      formData,
      {
        headers: {
          Authorization: "Bearer public_FW25ar5C1Y3UNBasPXxrAs5SRmNb",
          "Content-Type": "image/jpeg",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default {
  name: "FieldFileUploader",
  mixins: [abstractField],
  data() {
    return {
      files: [],
      loading: false,
      dialog: false,
    };
  },
  computed: {
    url() {
      const { url } = this.schema;
      return url ?? "www.example.com";
    },
    label() {
      const { fieldLabel } = this.schema;
      return fieldLabel ?? "";
    },
  },
  methods: {
    async handleUpload() {
      this.loading = true;
      // use this.files in formData to upload
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append("File", file);
      });

      formData.append("questionaryId", 2);
      formData.append("documentTypeId", 3);
      formData.append("subMenuId", 4);

      const response = await uploadImage(formData);
      this.modelValue = response;
      this.loading = false;
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.file-uploader {
  padding: 20px;
  border: 1px solid #999797;
  width: 100%;
}
</style>
