
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { USER_INFO } from '../../constants/path';
import { UserInfo } from '../../components/pages';
import { HeaderLeft } from '../header';

const stack = createStackNavigator();
function UserInfoNavigator() {
  return (
    <stack.Navigator initialRouteName={USER_INFO}>
      <stack.Screen
        name={USER_INFO}
        component={UserInfo}
        options={{
          headerLeft: () => <HeaderLeft />
        }}
      />
    </stack.Navigator>
  );
}

export default UserInfoNavigator;
