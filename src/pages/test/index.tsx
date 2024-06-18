import { RangePicker } from 'ant-design-vue';

export default defineComponent({
  render() {
    return (
      <div bg-red w-400px>
        <RangePicker
          // style={{ width: '260px' }}
          w-260px
          allowClear
        />
      </div>
    );
  }
});
