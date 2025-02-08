import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: './icon.svg',
    brandTitle: 'Sinan Aslam Components',
    brandUrl: 'https://sinan-code.com',
  },
});
