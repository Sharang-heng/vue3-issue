import router from '@/router';
import {
  Layout,
  LayoutContent,
  LayoutSider,
  Menu,
  MenuItem
} from 'ant-design-vue';
import { ref } from 'vue';

export default defineComponent({
  setup() {
    const selectedKeys = ref(['test1']);
    const select = (info: { selectedKeys: (string | number)[] }) => {
      const key = info.selectedKeys[0];
      router.push(`${key}`);
    };
    return {
      selectedKeys,
      select
    };
  },
  render() {
    const renderMenuItem = (item) => {
      return (
        <MenuItem key={item.key}>
          {{
            icon: () => item.icon,
            default: () => item.name
          }}
        </MenuItem>
      );
    };
    return (
      <Layout class="h-100vh">
        <LayoutSider>
          <Menu v-model:selectedKeys={this.selectedKeys} onSelect={this.select}>
            {[
              {
                key: 'test1',
                name: '测试1'
              },
              {
                key: 'test2',
                name: '测试2'
              }
            ].map((item) => {
              return renderMenuItem(item);
            })}
          </Menu>
        </LayoutSider>
        <Layout>
          <LayoutContent>
            <router-view />
          </LayoutContent>
        </Layout>
      </Layout>
    );
  }
});
