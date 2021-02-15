
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoutes from './main';

export default function LoggingRoutes() {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
}
