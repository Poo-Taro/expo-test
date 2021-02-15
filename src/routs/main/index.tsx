
import React from 'react';
import {
  createStackNavigator,
  StackCardInterpolationProps
} from '@react-navigation/stack';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';

import {
  INITIAL,
  LOADING,
  HOME,
  CHOOSE_LOGIN,
  STATISTICS,
  USER_INFO,
  INPUT,
  SIGN_UP,
  SIGN_IN
} from '../../constants/path';
import {
  Initial,
  Loading,
  ChooseLogin,
  Input,
  SignUp,
  SignIn
} from '../../components/pages';
import Home from './Home';
import Statistics from './Statistics';
import UserInfo from './UserInfo';
import * as UiContext from '../../contexts/ui';

const stack = createStackNavigator();
const modalStack = createStackNavigator();
const chooseLoginStack = createStackNavigator();
const tab = createBottomTabNavigator();
const homeDrawer = createDrawerNavigator();
const statisticsDrawer = createDrawerNavigator();
const forFade = ({current}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress
  }
});

function homeWithDrawer() {
  return (
    <homeDrawer.Navigator initialRouteName={HOME}>
      <homeDrawer.Screen name={HOME} component={Home} />
      <homeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </homeDrawer.Navigator>
  );
}

function statisticsWithDrawer() {
  return (
    <statisticsDrawer.Navigator initialRouteName={STATISTICS}>
      <statisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <statisticsDrawer.Screen name={USER_INFO} component={UserInfo} />
    </statisticsDrawer.Navigator>
  );
}

function tabRoutes() {
  return (
    <tab.Navigator
      initialRouteName={HOME}
      screenOptions={(props: any) => {
        const routeName = getFocusedRouteNameFromRoute(props.route);
        return {
          tabBarVisible: routeName !== USER_INFO
        };
      }}
    >
      <tab.Screen name={HOME} component={homeWithDrawer} />
      <tab.Screen name={STATISTICS} component={statisticsWithDrawer} />
    </tab.Navigator>
  );
}

function tabWithModalRoutes() {
  return (
    <modalStack.Navigator mode="modal" headerMode="none">
      <stack.Screen name={HOME} component={tabRoutes} />
      <stack.Screen name={INPUT} component={Input} />
    </modalStack.Navigator>
  );
}

function chooseLoginNavigator() {
  return (
    <chooseLoginStack.Navigator initialRouteName={CHOOSE_LOGIN}>
      <chooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <chooseLoginStack.Screen name={SIGN_IN} component={SignIn} />
      <chooseLoginStack.Screen name={SIGN_UP} component={SignUp} />
    </chooseLoginStack.Navigator>
  );
}

function seitchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <stack.Screen name={CHOOSE_LOGIN} component={chooseLoginNavigator} />;
    case UiContext.Status.AUTHORIZED:
      return <stack.Screen name={HOME} component={tabWithModalRoutes} />;
    case UiContext.Status.FIRST_OPEN:
      // do nothing
      break;
    default:
      return <stack.Screen name={INITIAL} component={Initial} />;
  }
}

function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context);
  return (
    <stack.Navigator initialRouteName = {LOADING} headerMode="none" screenOptions={{
      cardStyleInterpolator: forFade
    }}>
      {uiContext.applicationState !== UiContext.Status.LOADING ?
        (seitchingAuthStatus(uiContext.applicationState))
        : (<stack.Screen name={LOADING} component={Loading} />)
      }
    </stack.Navigator>
  );

}

export default AuthWithRoutes;
