import { Input } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const value = defineModel({
      required: true
    });
    return {
      value
    };
  },
  render() {
    return <Input v-model={this.value}></Input>;
  }
});
