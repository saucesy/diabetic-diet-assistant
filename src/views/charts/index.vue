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
              <td>
                {{ new Date(item.date).getDate().toString().padStart(2, '0') }}
                <div style="width: 6px; height: 1px; background-color: #888888; margin: 0 auto"></div>
                {{ (new Date(item.date).getMonth() + 1).toString().padStart(2, '0') }}
              </td>

              <td class="block" v-for="(diet, index2) in item.diet" :key="index2">
                <div class="face-item" @click="onCellClick(item, diet)">
                  <b-img class="img" :src="faces[diet.rate].url"></b-img>
                  <span class="text" :style="{ 'font-size': $store.getters.device === 'mobile' ? '10px' : '' }">
                    {{ getCarbohydrate(diet.carbohydrate) }}
                  </span>
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
        <h3>{{ $t('charts.chartTitle', { time: options[current].label }) }}</h3>
        <!-- uses bootstrap button -->
        <b-button size="sm" variant="primary" @click="exportExcel">{{ $t('charts.export') }}</b-button>
      </div>
      <div class="bottom-chart" ref="chart"></div>
    </div>

    <!-- date ranger select modal -->
    <!-- uses bootstrap modal -->
    <b-modal id="modal" :title="$t('charts.select.title')">
      <div>
        <!-- uses bootstrap datepicker -->
        <label for="datepicker-1">{{ $t('charts.select.startTime') }}</label>
        <b-datepicker id="datepicker-1" class="mb-2" :locale="$store.getters.locale" v-model="timeFrom"></b-datepicker>
        <label for="datepicker-2">{{ $t('charts.select.endTime') }}</label>
        <b-datepicker id="datepicker-2" :locale="$store.getters.locale" v-model="timeTo"></b-datepicker>
      </div>

      <!-- uses bootstrap button -->
      <template v-slot:modal-footer>
        <b-button @click="closeModal">{{ $t('charts.select.cancel') }}</b-button>
        <b-button variant="primary" @click="selectDate">{{ $t('charts.select.confirm') }}</b-button>
      </template>
    </b-modal>

    <!-- uses element-ui backtop -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import {getList, getCustomList} from '@/api/analyse';
import {tabOptions, faces} from '@/views/charts/props';
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
import {i18n} from "@/i18n";

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
      // data list
      dataList: [],
      // show others data
      othersID: null,

      // showing data request params
      showingParams: {},
      // choose date range
      timeFrom: null,
      timeTo: null,

      // tabs
      current: 0,
      options: tabOptions,

      // show data
      display: {
        title: i18n.t('charts.title'),
        remark: i18n.t('charts.note'),
        rate: -1
      },
      defaultDisplay: null,

      // faces
      faces: faces,

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
     * get carbohydrate value
     *
     * @param val
     * @returns {string}
     */
    getCarbohydrate(val) {
      if (this.$store.getters.device === 'mobile') return val.toString().split('.')[0] + 'g';

      return val.toFixed(1).replace('.0', '') + 'g';
    },

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
      request
          .then(res => {
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

          })
          // uses element-ui message
          .catch(res => this.$message.error(res.msg));
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
        // uses element-ui message
        this.$message.error(i18n.t('message.selectDate'));
        return;
      }
      const today = new Date();
      today.setDate(today.getDate() + 1);
      if (+new Date(this.timeTo) > +today) {
        // uses element-ui message
        this.$message.error(i18n.t('message.endTimeGeToday'));
        return;
      }
      if (+new Date(this.timeFrom) >= +new Date(this.timeTo)) {
        // uses element-ui message
        this.$message.error(i18n.t('message.startTimeLeEndTime'));
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
      this.display.remark = diet.remark ? `${i18n.t('charts.remark')}${diet.remark}` : i18n.t('charts.noRemark');
      this.display.rate = diet.rate;
    },

    /**
     * export excel
     */
    exportExcel() {
      let str = '';
      if (this.showingParams.days !== 0) {
        str = this.showingParams.days;
      } else {
        str = `${this.showingParams.from}/${this.showingParams.to}`;
      }

      // open url
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

      // uses echarts
      let myChart = echarts.init(this.$refs.chart, null, {
        locale: this.$store.getters.locale.slice(0, 2)
      });
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
            name: i18n.t('charts.carbohydrate'),
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
            name: i18n.t('charts.satisfaction'),
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
            name: i18n.t('charts.carbohydrate'),
            type: 'line',
            data: carbohydrate
          },
          {
            name: i18n.t('charts.satisfaction'),
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
      // uses bootstrap modal
      this.$bvModal.hide('modal');
    },
    showModal() {
      // uses bootstrap modal
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
    background-color: #FFFFFF;
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
      width: 11.5%;
      word-break: break-all;
    }

    th:first-child,
    td:first-child {
      width: 8%;
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
    display: flex;
    align-items: center;

    h3 {
      flex-grow: 1;
    }
  }

  // bottom-chart
  .bottom-chart {
    width: 100%;
    padding: 1.5rem;
    height: calc(100vh - 150px)
  }
}
</style>