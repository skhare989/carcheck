/**
 * Root navigator for CarCheck app
 * Defines the main navigation structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../constants';

// Import screens
import { HomeScreen } from '../screens/HomeScreen';
import { NewRentalScreen } from '../screens/NewRentalScreen';
import { ChecklistScreen } from '../screens/ChecklistScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'CarCheck',
          }}
        />
        <Stack.Screen
          name="NewRental"
          component={NewRentalScreen}
          options={{
            title: 'New Rental',
          }}
        />
        <Stack.Screen
          name="Checklist"
          component={ChecklistScreen}
          options={{
            title: 'Photo Checklist',
          }}
        />
        {/* TODO: Add more screens as we build them:
            - Camera
            - RentalDetail
            - Export
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
