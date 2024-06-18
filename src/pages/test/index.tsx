import { RangePicker } from 'ant-design-vue';

export default defineComponent({
  render() {
    return (
      <div bg-red w-400px>
        <RangePicker important-w-50px allowClear style={{ width: '50px' }} />
      </div>
    );
  }
});
