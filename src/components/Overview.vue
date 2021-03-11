<template>
  <div class="d-block text-left">
    <h2>Overview</h2>

    <div class="d-flex justify-content-between">
      <div class="overview-card">
        <div>Streaming Start</div>
        <div class="overview-time">{{ getStartTime }}</div>
        <div>{{ getTodayDate }}</div>
      </div>

      <div class="overview-card">
        <div class="overview-count">{{ totalTweetCount }}</div>
        <div>Total Tweets</div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils/datetime';

export default {
  name: 'Overview',
  props: {
    startTime: { type: Date },
    totalTweetCount: { type: Number, required: true },
  },
  computed: {
    getStartTime() {
      return this.startTime ? utils.convertTime(this.startTime) : '-';
    },
    getTodayDate() {
      return utils.convertDate(new Date());
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.overview-card {
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 300;
  height: 160px;
  justify-content: space-between;
  padding: 24px 32px;
  width: calc(50% - 15px); 
}

.overview-count {
  color: #7f51df;
  font-size: 54px;
}

.overview-time {
  color: #7f51df;
  font-size: 32px;
}
</style>