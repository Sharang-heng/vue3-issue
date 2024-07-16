import ChartItem from './components/chart-item';
import { Col, Row } from 'ant-design-vue';
import type { Chart } from '@antv/g2';

export default defineComponent({
  setup() {
    const ChartId1 = 'chart1';
    const ChartId2 = 'chart2';
    const TypeObj1 = {
      high: '偏高',
      low: '偏低',
      over: '过高',
      standard: '标准'
    };
    const TypeObj2 = {
      lte18: '小于18',
      lte30: '18-30',
      lte40: '30-40',
      lte50: '40-50',
      lte60: '50-60',
      gt60: '大于60'
    };
    const RenderChart1 = (chart: Chart, chartData: any) => {
      chart
        .interval()
        .data(chartData)
        .coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 }) // 改变坐标系实现柱状图转成饼图
        .encode('y', 'value')
        .encode('color', 'name')
        .transform({ type: 'stackY' })
        .legend('color', {
          position: 'bottom',
          layout: { justifyContent: 'center' }
        })
        .label({
          position: 'outside',
          text: (data) => `${(data.percent * 100).toFixed(2)}%`
        })
        .tooltip((data) => ({
          name: data.name,
          value: data.value
        }));
    };
    const RenderChart2 = (chart: Chart, chartData: any) => {
      chart
        .interval()
        .data(chartData)
        .coordinate({ type: 'polar', innerRadius: 0.4 })
        .encode('x', 'value')
        .encode('y', 'percent')
        .axis(false)
        .encode('color', 'name')
        .scale('color', {
          range: [
            '#42cdff',
            '#1ec1b0',
            '#22cc6e',
            '#7638ff',
            '#fda600',
            '#ef3737'
          ]
        })
        .legend('color', {
          position: 'bottom',
          layout: { justifyContent: 'center' }
        })
        .label({
          position: 'outside',
          text: (data) => `${(data.percent * 100).toFixed(2)}%`
        })
        .tooltip((data) => ({
          title: null,
          name: data.name,
          value: data.value
        }))
        .animate('enter', { type: 'waveIn' });
    };
    function FakeRequest1() {
      // 返回一个新的Promise
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeData = {
            dayDate: '2024-07-01',
            high: 40226,
            low: 5880,
            over: 21276,
            standard: 62549
          };
          resolve(fakeData);
        }, 500);
      });
    }
    function FakeRequest2() {
      // 返回一个新的Promise
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeData = {
            dayDate: '2024-07-01',
            lte18: 4948,
            lte30: 59274,
            lte40: 61391,
            lte50: 28726,
            lte60: 9741,
            gt60: 3093
          };
          resolve(fakeData);
        }, 500);
      });
    }
    return {
      ChartId1,
      ChartId2,
      TypeObj1,
      TypeObj2,
      RenderChart1,
      RenderChart2,
      FakeRequest1,
      FakeRequest2
    };
  },
  render() {
    return (
      <section py-20px w-full h-full>
        <div px-20px h-full overflow-auto>
          <Row gutter={16}>
            <Col span={8}>
              <ChartItem
                chartId={this.ChartId1}
                typeObj={this.TypeObj1}
                requestFun={this.FakeRequest1}
                renderChart={this.RenderChart1}
              />
            </Col>
            <Col span={8}>
              <ChartItem
                chartId={this.ChartId2}
                typeObj={this.TypeObj2}
                requestFun={this.FakeRequest2}
                renderChart={this.RenderChart2}
              />
            </Col>
          </Row>
        </div>
      </section>
    );
  }
});
