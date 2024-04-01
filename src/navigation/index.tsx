import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Routes} from './Routes';

import {Home} from '../scenes/home/index';
import {AnimatedStyleUpdateExample} from '../scenes/start/AnimatedStyleUpdateExample';
import {PanGesture} from '../scenes/panGesture';
import {CircularProgress} from '../scenes/circularProgress';
import CustomOnboarding from '../scenes/customOnboarding';
import Login from '../scenes/login';
import TabBarCustom from '../scenes/tabBarCustom';

const Stack = createStackNavigator();

export const AppContainer: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.RN2StartExample}
        component={AnimatedStyleUpdateExample}
      />
      <Stack.Screen name={Routes.PanGesture} component={PanGesture} />
      <Stack.Screen
        name={Routes.CircularProgress}
        component={CircularProgress}
      />
      <Stack.Screen
        name={Routes.CustomOnboarding}
        component={CustomOnboarding}
        
      />
      <Stack.Screen
        name={Routes.TabBarCustom}
        component={TabBarCustom}
        options={{headerShown: false}}
      />
      <Stack.Screen name={Routes.Login} component={Login} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
};
