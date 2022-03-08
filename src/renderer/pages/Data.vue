<template>
  <div>
    <div class="d-flex bd-highlight mb-3">
      <router-link to="/" class="btn btn-outline-primary me-auto">
        Back
      </router-link>

      <new-data-modal class="me-2" :schema="schema[0]" @submited="setData" />

      <export :json="data" :schema="schema[0]" />
    </div>

    <data-table :fields="schema[0].fields" :data="data" @onDelete="deleteRow" />
  </div>
</template>

<script>
import NewDataModal from "../components/NewDataModal.vue";
import DataTable from "../components/DataTable.vue";
import Export from "../components/Export.vue";

export default {
  name: "data-page",
  components: { NewDataModal, DataTable, Export },
  data() {
    return {
      data: [],
      schema: [{ fields: [] }],
    };
  },
  mounted() {
    this.setData();
    this.getSchema();
  },
  methods: {
    getSchema() {
      this.$db.getRows(
        "schemas",
        this.$dbDir,
        // prettier-ignore
        { 'name': this.$route.params.name },
        (suc, data) => {
          if (suc) this.schema = data;
        }
      );
    },
    getData() {
      let res;
      this.$db.getAll(this.$route.params.name, this.$dbDir, (suc, data) => {
        if (suc) res = data;
      });
      return res;
    },
    setData() {
      this.data = this.getData();
    },
    deleteRow(id) {
      this.$db.deleteRow(
        this.schema[0].name,
        this.$dbDir,
        // prettier-ignore
        { "id": id },
        (succ, msg) => {
          this.$notify({
            title: msg,
            type: succ ? "success" : "error",
          });
        }
      );
      this.setData();
    },
  },
};
</script>
