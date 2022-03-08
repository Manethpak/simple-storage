<template>
  <div>
    <div
      class="modal fade"
      :id="`staticBackdropAlert${data.id}`"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Alert</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              You are about to delete "{{ data.name }}". Are you sure? This
              process cannot be undone.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-danger"
              @click="$emit('agreed', data.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn h-100 btn-outline-danger"
      data-bs-toggle="modal"
      :data-bs-target="`#staticBackdropAlert${data.id}`"
    >
      <trash-icon />
    </button>
  </div>
</template>

<script>
import TrashIcon from "./icons/TrashIcon.vue";

export default {
  components: { TrashIcon },
  props: ["data"],
};
</script>
