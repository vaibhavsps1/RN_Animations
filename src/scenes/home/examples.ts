import {Routes} from '../../navigation/Routes';

import {HomeItem} from './types';

const COLORS = [
  '#1d3557',
  '#e63946',
  '#2a9d8f',
  '#023e8a',
  '#264653',
  '#fca311',
  '#9d0208',
  '#6d597a',
  '#212529',
  '#007f5f',
  '#5f0f40',
  '#00509d',
  '#4a4e69',
  '#480ca8',
];

export const examples: HomeItem[] = [
  {
    backgroundStyle: {
      backgroundColor: COLORS[0 % COLORS.length],
    },
    route: Routes.RN2StartExample,
    subtitle: 'First animation example in Reanimated 2',
    title: 'Start Reanimated2',
  },
  {
    backgroundStyle: {
      backgroundColor: COLORS[1 % COLORS.length],
    },
    route: Routes.PanGesture,
    subtitle: 'Drag and Drop across the screen',
    title: 'Pan gesture',
  },
  {
    backgroundStyle: {
      backgroundColor: COLORS[2 % COLORS.length],
    },
    route: Routes.CircularProgress,
    subtitle: 'Circular progress changing color!',
    title: 'Toggl',
  },
  {
    backgroundStyle: {
      backgroundColor: COLORS[4 % COLORS.length],
    },
    route: Routes.CustomOnboarding,
    subtitle: 'A cool way to introduce your app',
    title: 'Custom onboarding',
  },
  {
    backgroundStyle: {
      backgroundColor: COLORS[5 % COLORS.length],
    },
    route: Routes.Login,
    subtitle: 'Animated login page is designed',
    title: 'Login Page',
  },
  {
    backgroundStyle: {
      backgroundColor: COLORS[7 % COLORS.length],
    },
    route: Routes.TabBarCustom,
    subtitle: 'A custom tab bar with cool UX',
    title: 'Custom tab bar',
  },
];
