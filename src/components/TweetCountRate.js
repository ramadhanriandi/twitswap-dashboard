import { Line } from 'vue-chartjs';
import _ from 'lodash';
 
export default {
  extends: Line,
  props: ["tweetCountRate"],
  mounted () {
    this.renderChart({
      labels: this.tweetCountRate.length
        ? _.map(this.tweetCountRate, (tweetCount) => tweetCount.label)
        : [],
      datasets: [
        {
          label: 'Tweet Count Rate',
          backgroundColor: '#71c87d',
          data: this.tweetCountRate.length
            ? _.map(this.tweetCountRate, (tweetCount) => tweetCount.value)
            : []
        }
      ]
    })
  },
  watch: {
    tweetCountRate(newValue, oldValue) {
      console.log(oldValue);
      this.renderChart({
        labels: !_.isEmpty(newValue) && newValue.length
          ? _.map(newValue, (tweetCount) => tweetCount.label)
          : [],
        datasets: [
          {
            label: 'Tweet Count Rate',
            backgroundColor: '#71c87d',
            data: !_.isEmpty(newValue) && newValue.length
              ? _.map(newValue, (tweetCount) => tweetCount.value)
              : []
          }
        ]
      })
    },
  }
}