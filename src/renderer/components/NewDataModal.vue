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
            <h5 class="modal-title" id="staticBackdropLabel">Add New Data</h5>
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
                <div
                  class="row mb-2"
                  v-for="field in schema.fields"
                  :key="field.id"
                >
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    {{ field.name }}
                  </label>
                  <div class="col-sm-9">
                    <input
                      v-model="form[field.name]"
                      :type="field.type"
                      :key="field.type"
                      step=".01"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <button @click="resetForm" type="reset" class="btn btn-secondary">
                Reset
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Data
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["schema"],
  data() {
    return {
      form: {},
    };
  },
  methods: {
    resetForm() {
      this.form = {};
    },
    onSubmit() {
      if (this.$db.valid(this.schema.name, this.$dbDir)) {
        this.$db.insertTableContent(
          this.schema.name,
          this.$dbDir,
          this.form,
          (status, msg) => {
            this.$notify({
              title: msg,
              type: status ? "success" : "error",
            });
          }
        );
        this.$emit("submited");
        this.resetForm();
      }
    },
  },
};
</script>
