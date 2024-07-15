import { onMounted } from 'vue';
import { useRequest } from 'vue-hooks-plus';

export default defineComponent({
  setup() {
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
    onMounted(() => {
      FakeRequest().then(() => {
        console.log('FakeRequest');
      });
      runAsync().then(() => {
        console.log('runAsync');
      });
    });
  },
  render() {
    return (
      <section py-20px w-full h-full>
        111
      </section>
    );
  }
});
