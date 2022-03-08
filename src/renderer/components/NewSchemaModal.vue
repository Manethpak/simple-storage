<template>
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add New Table</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- Body -->
          <form @submit.prevent="onSubmit">
            <div class="modal-body">
              <div class="list-group d-flex flex-column">
                <input
                  type="text"
                  class="list-group-item list-group-item-action mb-2"
                  placeholder="Table Name"
                  v-model="schema.name"
                  required
                />
                <div
                  class="d-flex mb-2"
                  v-for="field in schema.fields"
                  :key="field.id"
                >
                  <input
                    type="text"
                    class="list-group-item list-group-item-action"
                    placeholder="Field name"
                    v-model="field.name"
                    required
                  />
                  <select class="form-select mx-2" v-model="field.type">
                    <option v-for="type in types" :key="type">
                      {{ type }}
                    </option>
                  </select>
                  <button
                    type="button"
                    @click="remove(field.id)"
                    class="btn btn-outline-danger"
                  >
                    <trash-icon />
                  </button>
                </div>
              </div>
              <button
                @click="addField"
                type="button"
                class="btn btn-success text-light mt-2"
              >
                Add field
              </button>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <button
                @click="resetFields"
                type="reset"
                class="btn btn-secondary"
              >
                Reset
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-4">
      <button
        type="button"
        class="btn btn-outline-success fs-5"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Table
      </button>
    </div>
  </div>
</template>

<script>
import fs from "fs";
import TrashIcon from "@/components/icons/TrashIcon.vue";

export default {
  components: { TrashIcon },
  data() {
    return {
      types: ["text", "number", "date"],
      schema: {
        name: "",
        fields: [
          {
            id: this.getId(),
            name: "",
            type: "text",
          },
        ],
      },
    };
  },
  methods: {
    getId() {
      return new Date().valueOf();
    },
    addField() {
      this.schema.fields.push({
        id: this.getId(),
        name: "",
        type: "text",
      });
    },
    resetFields() {
      this.schema.name = "";
      this.schema.fields = [
        {
          id: this.getId(),
          name: "",
          type: "text",
        },
      ];
    },
    remove(id) {
      this.schema.fields = this.schema.fields.filter((obj) => obj.id != id);
    },
    onSubmit() {
      if (this.schema.fields < 1) {
        this.$notify({
          title: "Error",
          type: "error",
          text: "Cannot save table with 0 field.",
        });
      }

      if (!fs.existsSync(this.$dbDir)) fs.mkdirSync(this.$dbDir);

      this.$db.createTable("schemas", this.$dbDir, (s, m) => {});

      let ok = true;
      this.$db.createTable(this.schema.name, this.$dbDir, (status, msg) => {
        this.$notify({
          title: msg,
          type: status ? "success" : "error",
        });
        ok = status;
      });

      if (ok) {
        this.$db.insertTableContent(
          "schemas",
          this.$dbDir,
          this.schema,
          (status, msg) => {
            this.$notify({
              title: msg,
              type: status ? "success" : "error",
            });
          }
        );
        this.$emit("created");
        this.resetFields();
      }
    },
  },
};
</script>
