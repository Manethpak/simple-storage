<template>
  <table class="table table-hover table-responsive">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">id</th>
        <th v-for="field in fields" :key="field.id" scope="col">
          {{ field.name }}
        </th>
        <th scope="col">action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in formated" :key="row.id">
        <th scope="row">{{ index }}</th>
        <td v-for="data in row" :key="data.id">
          {{ data }}
        </td>
        <td>
          <delete-alert-modal :data="row" @agreed="deleted" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TrashIcon from "./icons/TrashIcon.vue";
import DeleteAlertModal from "./DeleteAlertModal.vue";

export default {
  components: { TrashIcon, DeleteAlertModal },
  props: ["fields", "data"],
  computed: {
    formated() {
      const format = this.data.map((obj) => ({ id: obj.id, ...obj }));
      return format;
    },
  },
  methods: {
    deleted(id) {
      this.$emit("onDelete", id);
    },
  },
};
</script>

<style></style>
