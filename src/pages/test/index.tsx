import { ref } from 'vue';
import Child from './component/child';

export default defineComponent({
  setup() {
    const value = ref('');
    return {
      value
    };
  },
  render() {
    return <Child v-model={this.value} />;
  }
});
