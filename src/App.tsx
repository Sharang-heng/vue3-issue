import { ConfigProvider, StyleProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <StyleProvider hash-priority="high">
          <router-view></router-view>
        </StyleProvider>
      </ConfigProvider>
    );
  }
});
