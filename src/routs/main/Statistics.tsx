import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, STATISTICS } from '../../constants/path';
import { Detail, Statistics } from '../../components/pages';
import { HeaderLeft } from '../header';

const stack = createStackNavigator();

function StatisticsNavigator() {
  return (
    <stack.Navigator initialRouteName={STATISTICS}>
      <stack.Screen
        name={STATISTICS}
        component={Statistics}
        options={{
          headerLeft: () => <HeaderLeft />
        }}
      />
      <stack.Screen name={DETAIL} component={Detail} />
    </stack.Navigator>
  );
}

export default StatisticsNavigator;
