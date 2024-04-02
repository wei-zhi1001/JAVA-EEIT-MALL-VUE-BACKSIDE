<template>
  <div>
    <!-- Button to trigger modal -->
    <button type="button" class="btn btn-primary" @click="openModal">Open Modal</button>
  
    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" ref="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openModal() {
      // Show the modal
      this.$refs.myModal.classList.add('show');
      this.$refs.myModal.style.display = 'block';
      document.body.classList.add('modal-open');
    },
    closeModal() {
      // Hide the modal
      this.$refs.myModal.classList.remove('show');
      this.$refs.myModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
}
</script>
