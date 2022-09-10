<template>
  <q-page class="q-pa-md">
    <!-- <div class="full-width"> -->
    <q-uploader
      url="http://192.168.8.103:3000/file/uploadNewFile"
      label="Upload files"
      color="primary"
      square
      flat
      bordered
      class="full-width"
      field-name="upload-file"
    />
    <div style="text-align: center; margin-top: 20px">
      <q-btn color="primary" label="Reload" @click="rafraichir" />
    </div>
    <!-- </div> -->
    <div v-if="!files" style="margin-top: 100px; text-align: center">
      <q-spinner-pie color="primary" size="8em" />
      <q-tooltip :offset="[0, 8]">QSpinnerPie</q-tooltip>
    </div>
    <div
      class="fit flex column q-mt-lg"
      v-else
      v-for="file in files"
      :key="file.id"
    >
      <q-card
        flat
        class="q-md bg-primary flex items-center justify-between full-width"
      >
        <q-card-section class="flex items-center">
          <q-icon name="description" size="1.5rem" />
          <span class="q-ml-sm cut-text"
            >{{ file.file_name }} - {{ formatDate(file.created_at) }}</span
          >
        </q-card-section>
        <q-card-section>
          <q-btn
            round
            color="blue"
            icon="download"
            size="sm"
            @click="download(file.file_name)"
          />
          <q-btn
            round
            color="negative"
            icon="close"
            size="sm"
            @click="confirm = true"
            class="q-ml-sm"
          />
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Do you really wanna delete this</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="confirm"
                  color="primary"
                  v-close-popup
                  @click="supprimerFichier(file.id)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { getAllFiles, downloadFile, deleteFile } from "../api";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      confirm: false,
      files: null,
    };
  },
  methods: {
    rafraichir() {
      location.reload();
    },
    formatDate(daty) {
      const dates = new Date(daty);
      return dates.toLocaleDateString("fr");
    },
    download(nom) {
      downloadFile(nom);
    },
    supprimerFichier(id) {
      console.log("mandeh");
      deleteFile(id).then(() => {
        getAllFiles().then((res) => {
          this.files = res.data;
        });
      });
    },
  },
  mounted() {
    getAllFiles().then((res) => {
      this.files = res.data;
    });
  },
});
</script>

<style lang="scss" scoped>
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 175px;
}
</style>
