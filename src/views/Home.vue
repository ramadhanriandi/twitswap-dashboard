<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="title">TwitSwap</h1>
      <img src="../assets/logo.png" alt="Twitter" />
    </div>
    <p class="description">
      Stream any tweets related to your inputted contexts below <span>(up to 5 contexts)</span>
    </p>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <b-form-tags
        :limit="limit"
        placeholder="Type a tag and push enter to input it"
        remove-on-delete size="lg"
        tag-pills
        tag-variant="primary"
        v-model="contexts"
      />
    </div>
    <div class="d-flex justify-content-end">
      <b-button
        :disabled="contexts.length === 0"
        :variant="contexts.length ? 'success' : ''"
      >
        S T A R T
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contexts: [],
    limit: 5,
  }),
};
</script>

<style scoped>
.description {
  color: #858585;
  margin-bottom: 24px;
  text-align: left;
}

.description span {
  font-weight: 700;
}

.title {
  font-size: 36px;
  font-weight: 900;
}
</style>