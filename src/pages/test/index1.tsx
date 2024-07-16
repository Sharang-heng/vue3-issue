import { onMounted, ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';

export default defineComponent({
  setup() {
    const count = ref(0);
    function FakeCountRequest(num: number) {
      const min = 1000;
      const max = 2000;
      const time = Math.floor(Math.random() * (max - min + 1)) + min;
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = num * 10;
          resolve(result);
        }, time);
      });
    }
    function FakeRequest() {
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
        }, 1000);
      });
    }
    const { runAsync } = useRequest(FakeRequest, { manual: true });
    const { runAsync: getCount } = useRequest(FakeCountRequest, {
      manual: true
    });
    onMounted(() => {
      FakeRequest().then(() => {
        console.log('FakeRequest');
      });
      runAsync().then(() => {
        console.log('runAsync');
      });
    });
    return {
      count,
      getCount
    };
  },
  render() {
    return (
      <section py-20px w-full h-full>
        {this.count}
        <button
          onClick={() => {
            this.count++;
            this.getCount(this.count).then((res) => {
              console.log('res', res);
            });
          }}
        >
          发起请求
        </button>
      </section>
    );
  }
});
