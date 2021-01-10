<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="title">TwitSwap</h1>
      <img src="../assets/logo.png" alt="Twitter" />
    </div>
    <p class="description">
      Stream any tweets related to your inputted contexts below <span>(up to 5 contexts)</span>
    </p>

    <form @submit.prevent="handleStreaming" method="post">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <b-form-tags
          :disabled="isStreaming"
          :limit="limit"
          placeholder="Type a tag and push enter to input it"
          remove-on-delete size="lg"
          tag-pills
          tag-variant="primary"
          v-model="contexts"
        />
      </div>
      <div class="d-flex justify-content-end mb-4">
        <b-button v-if="isStreaming" type="submit" variant="danger">S T O P</b-button>
        <b-button :disabled="contexts.length === 0" type="submit" v-else :variant="contexts.length ? 'success' : ''">
          S T A R T
        </b-button>
      </div>
    </form>

    <div class="d-flex justify-content-between align-items-center">
      <PopularHashtags />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PopularHashtags from '../components/PopularHashtags';
import Configs from '../constants/config';

export default {
  components: {
    PopularHashtags,
  },
  data: () => ({
    contexts: [],
    isStreaming: false,
    limit: 5,
  }),
  methods: {
    async handleStreaming() {
      const requestBody = JSON.stringify({ tags: this.contexts });
      const response = await axios.post(
        `${Configs.API_SERVER_URL}/v1/streaming?stop=${this.isStreaming}`,
        requestBody,
        { headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 200) {
        this.isStreaming = !this.isStreaming;
      }
    }
  }
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