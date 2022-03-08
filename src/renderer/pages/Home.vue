<template>
  <div>
    <new-schema-modal @created="setSchemas" />

    <div class="list-group d-flex flex-column">
      <div v-for="schema in schemas" :key="schema.id">
        <ul class="list-group list-group-horizontal mt-3">
          <router-link
            :to="`/data/${schema.name}`"
            class="list-group-item list-group-item-action fs-4"
          >
            {{ schema.name }}
          </router-link>

          <delete-alert-modal :data="schema" @agreed="delSchema(schema.name)" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EntryForm from "../components/EntryForm.vue";
import NewSchemaModal from "../components/NewSchemaModal.vue";
import DeleteAlertModal from "../components/DeleteAlertModal.vue";

export default {
  name: "home-page",
  components: { EntryForm, NewSchemaModal, DeleteAlertModal },
  data: () => {
    return {
      schemas: [],
    };
  },
  mounted() {
    this.setSchemas();
  },
  methods: {
    getSchemas() {
      let res;
      this.$db.getAll("schemas", this.$dbDir, (status, data) => {
        if (status) {
          res = data;
        }
      });
      return res;
    },
    delSchema(dbName) {
      this.$db.clearTable(dbName, this.$dbDir, (success, msg) => {
        if (success) {
          this.$notify({
            title: msg,
            type: "success",
          });
          this.$db.deleteRow(
            "schemas",
            this.$dbDir,
            // prettier-ignore
            { 'name': dbName },
            (succ, msg) => {
              this.$notify({
                title: msg,
                type: succ ? "success" : "error",
              });
            }
          );
          this.setSchemas();
        } else {
          this.$notify({
            title: msg,
            type: "error",
          });
        }
      });
    },
    setSchemas() {
      this.schemas = this.getSchemas();
    },
  },
};
</script>
