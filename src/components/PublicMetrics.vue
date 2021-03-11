<template>
  <div class="d-block text-left">
    <h2>Public Metrics</h2>

    <div class="d-flex justify-content-between">
      <div class="metric-card">
        <div>Retweet count</div>
        <div class="metric-count">{{ retweetCount }}</div>
      </div>

      <div class="metric-card">
        <div>Reply count</div>
        <div class="metric-count">{{ replyCount }}</div>
      </div>

      <div class="metric-card">
        <div>Like count</div>
        <div class="metric-count">{{ likeCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicMetrics',
  props: {
    likeCount: { type: Number, required: true },
    replyCount: { type: Number, required: true },
    retweetCount: { type: Number, required: true },
  },
};
</script>

<style scoped>
h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.metric-card {
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 300;
  height: 160px;
  justify-content: space-between;
  padding: 24px;
  width: calc(33.33% - 15px); 
}

.metric-count {
  color: #71c87d;
  font-size: 48px;
}
</style>