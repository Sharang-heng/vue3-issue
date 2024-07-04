import layout from '@/pages/layout';
import test from '@/pages/test/index1';
import test2 from '@/pages/test/index2';

const routes = [
  {
    path: '',
    component: layout,
    children: [
      {
        path: '/test1',
        component: test
      },
      {
        path: '/test2',
        component: test2
      }
    ]
  }
];

export default routes;
