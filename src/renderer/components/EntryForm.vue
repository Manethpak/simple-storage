<template>
  <form class="mt-3 mx-2" @submit.prevent="submitForm">
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Employee Name</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Project</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Position</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Start Date</label>
      <div class="col-sm-9">
        <input type="date" class="form-control" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">End Date</label>
      <div class="col-sm-9">
        <input type="date" class="form-control" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Reason</label>
      <div class="col-sm-9">
        <textarea type="text" class="form-control" rows="3" />
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Reviewer</label>
      <div class="col-sm-9">
        <select class="form-select" aria-label="Select Reviewer">
          <option
            v-for="reviewer in reviewers"
            :key="reviewer.name"
            :value="reviewer.value"
          >
            {{ reviewer.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-3 col-form-label">Approver</label>
      <div class="col-sm-9">
        <input type="text" class="form-control" id="inputPassword" />
      </div>
    </div>

    <button type="submit" class="btn btn-outline-primary float-end">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      reviewers: [
        { name: "One", value: "One" },
        { name: "Two", value: "Two" },
        { name: "Three", value: "Three" },
      ],
    };
  },
  methods: {
    submitForm() {
      this.$emit("onSubmit");
      return;
    },
  },
};
</script>

<style></style>
