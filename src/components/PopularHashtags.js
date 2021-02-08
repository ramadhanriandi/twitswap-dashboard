import { Bar } from 'vue-chartjs';
import _ from 'lodash';
 
export default {
  extends: Bar,
  props: ["popularHashtags"],
  mounted () {
    this.renderChart({
      labels: !_.isEmpty(this.popularHashtags) && this.popularHashtags.data.length
        ? _.map(this.popularHashtags.data, (hashtag) => hashtag.name)
        : [],
      datasets: [
        {
          label: 'Popular Hashtags in Last 1 Minute',
          backgroundColor: '#f87979',
          data: !_.isEmpty(this.popularHashtags) && this.popularHashtags.data.length
            ? _.map(this.popularHashtags.data, (hashtag) => hashtag.count)
            : []
        }
      ]
    })
  },
  watch: {
    popularHashtags(newValue, oldValue) {
      console.log(oldValue);
      this.renderChart({
        labels: !_.isEmpty(newValue) && newValue.data.length
          ? _.map(newValue.data, (hashtag) => hashtag.name)
          : [],
        datasets: [
          {
            label: 'Popular Hashtags in Last 1 Minute',
            backgroundColor: '#f87979',
            data: !_.isEmpty(newValue) && newValue.data.length
              ? _.map(newValue.data, (hashtag) => hashtag.count)
              : []
          }
        ]
      })
    },
  }
}