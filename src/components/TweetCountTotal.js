import { Line } from 'vue-chartjs';
import _ from 'lodash';
 
export default {
  extends: Line,
  props: ["tweetCountTotal"],
  mounted () {
    this.renderChart({
      labels: this.tweetCountTotal.length
        ? _.map(this.tweetCountTotal, (tweetCount) => tweetCount.label)
        : [],
      datasets: [
        {
          label: 'Tweet Count Total',
          backgroundColor: '#7f51df',
          data: this.tweetCountTotal.length
            ? _.map(this.tweetCountTotal, (tweetCount) => tweetCount.value)
            : []
        }
      ]
    })
  },
  watch: {
    tweetCountTotal(newValue, oldValue) {
      console.log(oldValue);
      this.renderChart({
        labels: !_.isEmpty(newValue) && newValue.length
          ? _.map(newValue, (tweetCount) => tweetCount.label)
          : [],
        datasets: [
          {
            label: 'Tweet Count Total',
            backgroundColor: '#7f51df',
            data: !_.isEmpty(newValue) && newValue.length
              ? _.map(newValue, (tweetCount) => tweetCount.value)
              : []
          }
        ]
      })
    },
  }
}