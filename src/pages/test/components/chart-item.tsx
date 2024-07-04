import { nextTick, onUnmounted, ref, watch, type PropType } from 'vue';
import { Chart } from '@antv/g2';

export default defineComponent({
  props: {
    // 图id，唯一
    chartId: {
      type: String,
      required: true
    },
    // 图例名称映射
    typeObj: {
      type: Object as PropType<{ [key: string]: string }>,
      required: true
    },
    // 具体请求
    requestFun: {
      type: Function as PropType<() => Promise<any>>,
      required: true
    },
    // 图配置
    renderChart: {
      type: Function as PropType<(chart: Chart, chartData) => void>,
      required: true
    }
  },
  setup(props) {
    let chart: Chart;
    const appId = ref('');
    const chartData = ref([]);
    const stop = watch(
      appId,
      async () => {
        try {
          const result = await props.requestFun();
          const list = [];
          const total = Object.values(result).reduce((pre: number, cur) => {
            if (typeof cur === 'number') {
              return pre + cur;
            }
            return pre;
          }, 0);
          Object.keys(result).forEach((ele) => {
            const value = result[ele as keyof typeof result] as number;
            const name = props.typeObj[ele as keyof typeof props.typeObj];
            if (name) {
              list.push({
                name,
                value,
                percent: Number((value / (total as number)).toFixed(4))
              });
            }
          });
          chartData.value = list;
          await nextTick();
          chart = new Chart({
            container: props.chartId,
            height: 300,
            autoFit: true
          });
          props.renderChart(chart, chartData.value);
          chart.render();
        } catch (error) {
          chartData.value = [];
          chart && chart.destroy();
        }
      },
      {
        immediate: true
      }
    );
    onUnmounted(() => {
      chart.destroy();
      stop();
    });

    return { chartData };
  },
  render() {
    return (
      <div bg-white b-rd-8px>
        <div px-24px p-y-12px p-b-24px>
          {this.chartData.length > 0 ? (
            <div id={this.chartId} />
          ) : (
            <div h-300px flex-xy-center>
              <a-empty />
            </div>
          )}
        </div>
      </div>
    );
  }
});
