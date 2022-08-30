<template>
  <div class="charts">
    <!-- date -->
    <div class="charts-card top">
      <!-- header -->
      <div class="top-header">
        <span v-for="(item, index) in options"
              :key="item.label"
              :class="{ active: index === current }"
              @click="onOptionClick(index, item)">
          {{ item.label }}
        </span>
      </div>

      <!-- info -->
      <div class="top-info">
        <div class="title">{{ display.title }}</div>
        <div class="remark">{{ display.remark }}</div>

        <div class="faces">
          <!-- default -->
          <template v-if="display.rate === -1">
            <div v-for="(item, index) in faces" :key="index" class="face-item">
              <b-img class="img" :src="faces[4 - index].url"></b-img>
              <span class="text">{{ faces[4 - index].text }}</span>
            </div>
          </template>

          <!-- rate -->
          <template v-else>
            <div class="face-item line">
              <b-img class="img" :src="faces[display.rate].url"></b-img>
              <span class="text">{{ faces[display.rate].text }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- top-tables -->
      <div class="top-tables">
        <table>
          <tr>
            <th></th>
            <th>M</th>
            <th>B</th>
            <th>B2</th>
            <th>L</th>
            <th>L2</th>
            <th>S</th>
            <th>S2</th>
            <th>N</th>
          </tr>
          <template v-for="(item, index) in dataList">
            <tr class="child" :key="item.date">
              <td>{{ item.date.substring(5) }}</td>

              <td class="block" v-for="(diet, index2) in item.diet" :key="index2">
                <div class="face-item" @click="onCellClick(item, diet)">
                  <b-img class="img" :src="faces[diet.rate].url"></b-img>
                  <span class="text">{{ diet.carbohydrate }}</span>
                </div>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>

    <!-- charts -->
    <div class="charts-card bottom">
      <div class="bottom-header">
        <h3>Chart for {{ options[current].label }}</h3>
        <b-button size="sm" variant="primary" @click="exportExcel">Export</b-button>
      </div>
      <div class="bottom-chart" ref="chart"></div>
    </div>

    <!-- date modal -->
    <b-modal id="modal" title="Select Date">
      <div>
        <label for="datepicker-1">Select start time</label>
        <b-form-datepicker id="datepicker-1" class="mb-2" v-model="timeFrom"></b-form-datepicker>
        <label for="datepicker-2">Select end time</label>
        <b-form-datepicker id="datepicker-2" v-model="timeTo"></b-form-datepicker>
      </div>

      <template v-slot:modal-footer>
        <b-button @click="closeModal">Cancel</b-button>
        <b-button variant="primary" @click="selectDate">OK</b-button>
      </template>
    </b-modal>

    <el-backtop></el-backtop>
  </div>
</template>

<script>
import {getList, getCustomList} from '@/api/analyse';
// import echarts
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent
} from 'echarts/components';
import {LineChart, BarChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent
]);

export default {
  name: 'Charts',
  data() {
    return {
      // data
      dataList: [],
      othersID: null,

      // time
      showingParams: {},
      timeFrom: null,
      timeTo: null,

      // options
      current: 0,
      options: [
        {
          label: 'Recent 7 days',
          days: 7
        },
        {
          label: 'Recent 14 days',
          days: 14
        },
        {
          label: 'Recent 1 month',
          days: 30
        },
        {
          label: 'Recent 3 months',
          days: 90
        },
        {
          label: 'Custom',
          days: 0
        }
      ],

      // show data
      display: {
        title: 'Blood glucose evaluation',
        remark: 'Note: Please add the diet in detail before displaying the data.',
        rate: -1
      },
      defaultDisplay: null,

      // faces
      faces: {
        '4': {
          url: require('@/assets/images/face-4.svg'),
          text: 'great'
        },
        '3': {
          url: require('@/assets/images/face-3.svg'),
          text: 'good'
        },
        '2': {
          url: require('@/assets/images/face-2.svg'),
          text: 'normal'
        },
        '1': {
          url: require('@/assets/images/face-1.svg'),
          text: 'worse'
        },
        '0': {
          url: require('@/assets/images/face-0.svg'),
          text: 'unknown'
        }
      },

      // echart
      mChart: null
    };
  },
  created() {
    // get specified user id
    this.othersID = this.$route.params.othersID ?? null;
    // set display data
    this.defaultDisplay = Object.assign({}, this.display);

    // get data
    this.getData(this.options[0].days);

    // resize echarts
    window.onresize = () => {
      if (this.mChart) this.mChart.resize();
    };
  },
  methods: {
    /**
     * get analyse data
     *
     * @param days
     * @param date_from
     * @param date_to
     */
    getData(days = 0, date_from = null, date_to = null) {
      const userID = this.othersID || this.$store.getters.token;
      this.showingParams = {
        user: userID,
        days: days,
        from: date_from,
        to: date_to
      };

      let request;
      // get by days
      if (days !== 0) request = getList(userID, days);
      // get by date range
      else if (date_from && date_to) request = getCustomList(userID, date_from, date_to);
      request.then(res => {
        this.dataList = res.data;

        // process charts data
        const date = [];
        const carbohydrate = [];
        const average_rate = [];
        for (let i = this.dataList.length - 1; i >= 0; i--) {
          const item = this.dataList[i];
          date.push(item.date);
          carbohydrate.push(item.carbohydrate.toFixed(2));
          average_rate.push(item.average_rate.toFixed(2));
        }
        this.$nextTick(() => {
          this.initChart(date, carbohydrate, average_rate);
        });

      }).catch(res => this.$message.error(res.msg));
    },

    /**
     * choose option
     *
     * @param index
     * @param item
     */
    onOptionClick(index, item) {
      this.current = index;

      // get by days
      if (item.days > 0) this.getData(item.days);
      // get by custom date
      else this.showModal();
    },

    /**
     * custom date range
     */
    selectDate() {
      console.log(+new Date(this.timeFrom), +new Date(this.timeTo), +new Date());
      if (this.timeFrom === null || this.timeTo === null) {
        this.$message.error('Please select date!');
        return;
      }
      const today = new Date();
      today.setDate(today.getDate() + 1);
      if (+new Date(this.timeTo) > +today) {
        this.$message.error('End time cannot be greater than today!');
        return;
      }
      if (+new Date(this.timeFrom) >= +new Date(this.timeTo)) {
        this.$message.error('Start time needs to be less than end time!');
        return;
      }

      this.getData(0, this.timeFrom, this.timeTo);
      this.closeModal();
    },

    /**
     * choose cell
     *
     * @param item
     * @param diet
     */
    onCellClick(item, diet) {
      this.display.title = `${diet.name ?? ''}(${diet.date}${diet.time ? ' ' + diet.time : ''})`;
      this.display.remark = diet.remark ? `Remark: ${diet.remark}` : 'No Remark';
      this.display.rate = diet.rate;
    },

    /**
     * export excel
     */
    exportExcel() {
      let str = '';
      if (this.showingParams.days !== 0) {
        str = this.showingParams.days;
      }
      else {
        str = `${this.showingParams.from}/${this.showingParams.to}`;
      }

      window.open(`${process.env['VUE_APP_BASE_URL']}/analyse/export/${this.showingParams.user}/${str}/${+new Date()}`);
    },

    /**
     * init chart
     *
     * @param xAxis
     * @param carbohydrate
     * @param average_rate
     */
    initChart(xAxis, carbohydrate, average_rate) {
      let toolboxSettings = {};
      let dataZoomEnd = 100;
      if (document.body.offsetWidth < 1000) {
        toolboxSettings = {
          left: '0',
          top: '20px'
        };
      }
      if (carbohydrate.length < 14) dataZoomEnd = 100;
      else if (carbohydrate.length < 21) dataZoomEnd = 80;
      else if (carbohydrate.length < 28) dataZoomEnd = 60;
      else if (carbohydrate.length < 35) dataZoomEnd = 40;
      else dataZoomEnd = 20;

      let myChart = echarts.init(this.$refs.chart);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          left: '0'
        },
        grid: {
          top: '85px'
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            magicType: {type: ['line', 'bar']},
            // restore: {},
            saveAsImage: {}
          },
          ...toolboxSettings
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: dataZoomEnd
          },
          {
            start: 0,
            end: dataZoomEnd
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Carbohydrate',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Blood glucose satisfaction',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Carbohydrate',
            type: 'line',
            data: carbohydrate
          },
          {
            name: 'Blood glucose satisfaction',
            type: 'line',
            data: average_rate,
            yAxisIndex: 1
          }
        ]
      };

      this.mChart = option && myChart.setOption(option);
    },

    /**
     * close modal
     */
    closeModal() {
      this.$bvModal.hide('modal');
    },
    showModal() {
      this.$bvModal.show('modal');
    }
  }
};
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }

  .charts-card {
    background-color: #FFF;
    width: 100%;
    height: 100%;

    &.top {
      @media (min-width: 1000px) {
        min-height: calc(100vh - 30px);
      }
    }

    &.bottom {
      height: 100%;
      min-height: calc(100vh - 30px);

      /*@media (min-width: 1000px) {
        min-height: calc(100vh - 30px);
        height: 100%;
      }*/
    }
  }

  // top-header
  .top-header {
    background-color: #5EC8A4;
    padding: 1.5rem 1.5rem 0.5rem;

    @media (min-width: 1000px) {
      padding: 2rem 2rem 1rem;
    }

    span {
      margin: 0 1rem 1rem 0;
      display: inline-block;
      background-color: #59BC9F;
      color: #E3FEF6;
      cursor: pointer;
      border-radius: 2rem;
      padding: .25rem .75rem;
      user-select: none;

      @media (min-width: 1000px) {
        padding: .5rem 1rem;
      }

      &.active {
        background-color: #3F8B71;
      }
    }
  }

  // top-info
  .top-info {
    padding: 1.5rem;

    .title {
      font-size: 1.5rem;
    }

    .remark {
      margin-top: 1.5rem;
      color: #494949;
    }

    .faces {
      display: flex;
      margin-top: .75rem;
    }
  }

  // face-item
  .face-item {
    user-select: none;
    flex: 1;
    flex-shrink: 0;
    text-align: center;

    .img {
      width: 24px;
      height: 24px;
      display: inline-block;
    }

    .text {
      display: block;
      margin-top: .25rem;
    }

    // show one face
    &.line {
      text-align: left;

      .text {
        display: inline-block;
        margin-left: .75rem;
        margin-top: 0;
      }
    }
  }

  // top-tables
  .top-tables {
    padding: 0 .5rem 1rem;

    @media (min-width: 1000px) {
      padding: .25rem 1rem 1.5rem;
    }

    table {
      width: 100%;
    }

    tr {
    }

    th,
    td {
      text-align: center;
      width: 10.5%;
      word-break: break-all;
    }

    th:first-child,
    td:first-child {
      width: 16%;
    }

    td.block {
      cursor: pointer;
      padding: .25rem;

      .face-item {
        border-radius: 2px;
        min-width: 28px;
        min-height: 32px;
        padding: .35rem .1rem .1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #D1D1D1;
        height: 60px;

        .text {
          color: #595959;
          margin-top: 0;
          font-size: 14px;
        }
      }
    }
  }

  // bottom-header
  .bottom-header {
    padding: 1.5rem 1.5rem 0;
  }

  // bottom-chart
  .bottom-chart {
    width: 100%;
    padding: 1.5rem;
    height: calc(100vh - 150px)
  }
}
</style>