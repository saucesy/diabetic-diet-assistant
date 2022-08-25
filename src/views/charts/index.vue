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

              <td class="block" v-for="(meal, index2) in item.meal" :key="index2">
                <div class="face-item" @click="onCellClick(item, meal)">
                  <b-img class="img" :src="faces[meal.rate].url"></b-img>
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
  </div>
</template>

<script>
import {dataList} from '@/views/charts/data';
// import echarts
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent
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
  UniversalTransition
]);

export default {
  name: 'Charts',
  data() {
    return {
      // data
      dataList: dataList,

      // options
      current: 0,
      options: [
        {
          label: 'Last 7 days',
          days: 7
        },
        {
          label: 'Last 14 days',
          days: 7
        },
        {
          label: 'Last 3 months',
          days: 7
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
    this.defaultDisplay = Object.assign({}, this.display);
  },
  mounted() {
    const date = [];
    const carbohydrate = [];
    const average_rate = [];
    for (let i = this.dataList.length - 1; i >= 0; i--) {
      const item = this.dataList[i];
      date.push(item.date);
      carbohydrate.push(item.carbohydrate);
      average_rate.push(item.average_rate);
    }
    this.$nextTick(() => {
      this.initChart(date, carbohydrate, average_rate);
    });

    window.onresize = () => {
      if (this.mChart) this.mChart.resize();
    };
  },
  methods: {
    // choose option
    onOptionClick(index, item) {
      this.current = index;
    },

    // choose cell
    onCellClick(item, meal) {
      this.display.title = meal.meal_name ? `${meal.meal_name}(${item.date})` : item.date;
      this.display.remark = meal.remark ? `Remark: ${meal.remark}` : 'No Remark';
      this.display.rate = meal.rate;
    },

    // export excel
    exportExcel() {

    },

    // init chart
    initChart(xAxis, carbohydrate, average_rate) {
      let toolboxSettings = {};
      if (document.body.offsetWidth < 1000) {
        toolboxSettings = {
          left: '0',
          top: '20px'
        };
      }

      let myChart = echarts.init(this.$refs.chart);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: '0'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          },
          ...toolboxSettings
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'Carbohydrate',
            type: 'line',
            data: carbohydrate,
            markPoint: {
              data: [
                {type: 'max', name: 'Max'},
                {type: 'min', name: 'Min'}
              ]
            },
            markLine: {
              data: [{type: 'average', name: 'Avg'}]
            }
          },
          {
            name: 'Blood glucose satisfaction',
            type: 'line',
            data: average_rate,
            markPoint: {
              data: [{name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}]
            },
            markLine: {
              data: [
                {type: 'average', name: 'Avg'},
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: 'Max'
                    },
                    type: 'max',
                    name: '最高点'
                  }
                ]
              ]
            }
          }
        ]
      };

      this.mChart = option && myChart.setOption(option);
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
      height: 70vh;

      @media (min-width: 1000px) {
        min-height: calc(100vh - 30px);
        height: 100%;
      }
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D1D1D1;
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