
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, HOME } from '../../constants/path';
import { Detail, Home } from '../../components/pages';
import { HeaderLeft } from '../header';

const stack = createStackNavigator();

function HomeNavigator() {
  return (
    <stack.Navigator initialRouteName={HOME}>
      <stack.Screen 
        name={HOME}
        component={Home}
        options={{
          headerLeft: () => <HeaderLeft />
        }}
      />
      <stack.Screen name={DETAIL} component={Detail} />
    </stack.Navigator>
  );
}

export default HomeNavigator;
