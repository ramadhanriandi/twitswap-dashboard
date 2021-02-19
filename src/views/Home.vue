<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="title">TwitSwap</h1>
      <img src="../assets/logo.png" alt="Twitter" />
    </div>
    <p class="description">
      Stream any tweets related to your inputted keywords below <span>(up to 5 keywords)</span>
    </p>

    <form @submit.prevent="handleStreaming" method="post">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <b-form-tags
          :disabled="isStreaming"
          :limit="limit"
          placeholder="Type a keyword and push enter to input it"
          remove-on-delete size="lg"
          tag-pills
          tag-variant="primary"
          v-model="keywords"
        />
      </div>
      <div class="d-flex justify-content-end mb-4">
        <b-button v-if="isStreaming" type="submit" variant="danger">S T O P</b-button>
        <b-button :disabled="keywords.length === 0" type="submit" v-else :variant="keywords.length ? 'success' : ''">
          S T A R T
        </b-button>
      </div>
    </form>

    <div class="row justify-content-between align-items-center mb-5">
      <Overview class="col" :startTime="overview.startTime" :totalTweetCount="overview.totalTweetCount" />
      <PublicMetrics
        class="col"
        :likeCount="publicMetric.likeCount"
        :replyCount="publicMetric.replyCount"
        :retweetCount="publicMetric.retweetCount"
      />
    </div>

    <div class="row justify-content-between align-items-center mb-5">
      <PopularHashtags class="col" v-if="dataLoadCount % 2 === 1" :popularHashtags="popularHashtags" />
      <PopularHashtags class="col" v-else :popularHashtags="popularHashtags" />
      <TweetCountTotal class="col" v-if="dataLoadCount % 2 === 1" :tweetCountTotal="tweetCountTotal" />
      <TweetCountTotal class="col" v-else :tweetCountTotal="tweetCountTotal" />
    </div>
    <div class="row justify-content-between align-items-center mb-5">
      <TweetCountRate class="col-6" v-if="dataLoadCount % 2 === 1" :tweetCountRate="tweetCountRate" />
      <TweetCountRate class="col-6" v-else :tweetCountRate="tweetCountRate" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Overview from '../components/Overview';
import PopularHashtags from '../components/PopularHashtags';
import PublicMetrics from '../components/PublicMetrics';
import TweetCountRate from '../components/TweetCountRate';
import TweetCountTotal from '../components/TweetCountTotal';

import Configs from '../constants/config';

import utils from '../utils/datetime';

export default {
  components: {
    Overview,
    PopularHashtags,
    PublicMetrics,
    TweetCountRate,
    TweetCountTotal,
  },
  data: () => ({
    dataLoadCount: 0,
    isStreaming: false,
    keywords: [],
    limit: 5,
    polling: null,
    popularHashtags: {},
    publicMetric: {
      likeCount: 0,
      replyCount: 0,
      retweetCount: 0,
    },
    overview: {
      startTime: null,
      totalTweetCount: 0,
    },
    tweetCountRate: [],
    tweetCountTotal: [],
  }),
  methods: {
    async handleStreaming() {
      const requestBody = JSON.stringify({ tags: this.keywords });
      const response = await axios.post(
        `${Configs.API_SERVER_URL}/v1/streaming?stop=${this.isStreaming}`,
        requestBody,
        { headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 200) {
        this.isStreaming = !this.isStreaming;
      }

      if (this.isStreaming) {
        this.overview.startTime = new Date();

        this.loadData();
      } else {
        clearInterval(this.polling);
      }
    },
    loadData() {
      this.polling = setInterval(async () => {
        const response = await axios.get(
          `${Configs.API_SERVER_URL}/v1/data`,
          { data: {} },
        );
        
        if (response.status === 200) {
          const { data } = response.data;
          const { popularHashtags, tweetCount } = data;

          this.popularHashtags = popularHashtags;

          if (this.overview.totalTweetCount !== tweetCount.data) {
            this.publicMetric.likeCount += Math.floor(Math.random() * 11);
            this.publicMetric.replyCount += Math.floor(Math.random() * 11);
            this.publicMetric.retweetCount += Math.floor(Math.random() * 11);
          }

          this.tweetCountRate = [...this.tweetCountRate, { 
            value: Math.abs(this.overview.totalTweetCount - tweetCount.data),
            label: utils.convertTime(new Date()),
          }];

          if (this.tweetCountRate.length > 10) {
            this.tweetCountRate = this.tweetCountRate.slice(-10);
          }

          this.tweetCountTotal = [...this.tweetCountTotal, { 
            value: tweetCount.data,
            label: utils.convertTime(new Date()),
          }];

          if (this.tweetCountTotal.length > 10) {
            this.tweetCountTotal = this.tweetCountTotal.slice(-10);
          }

          this.overview.totalTweetCount = tweetCount.data;
        }

        this.dataLoadCount += 1;
      }, 10000);
    }
  },
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