import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewMissionScreen from './src/screens/NewMissionScreen';
import MissionDetailsScreen from './src/screens/MissionDetailsScreen';
import MissionTrackingScreen from './src/screens/MissionTrackingScreen';
import MissionCompletedScreen from './src/screens/MissionCompletedScreen';
import VolunteersScreen from './src/screens/VolunteersScreen';
import AdminScreen from './src/screens/AdminScreen';
import VolunteerHomeScreen from './src/screens/VolunteerHomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Stack = createNativeStackNavigator();
const OPTS = { headerShown: false, animation: 'slide_from_right', gestureEnabled: false };

export default function App() {
  const [auth, setAuth] = useState({ role: null, user: null });

  const authContext = {
    auth,
    login: (role, user) => setAuth({ role, user }),
    logout: () => setAuth({ role: null, user: null }),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={OPTS}>
            {auth.role === null ? (
              <>
                <Stack.Screen name="Login"    component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            ) : auth.role === 'admin' ? (
              <>
                <Stack.Screen name="Home"             component={HomeScreen} />
                <Stack.Screen name="NewMission"       component={NewMissionScreen} />
                <Stack.Screen name="MissionDetails"   component={MissionDetailsScreen} />
                <Stack.Screen name="MissionTracking"  component={MissionTrackingScreen} />
                <Stack.Screen name="MissionCompleted" component={MissionCompletedScreen} />
                <Stack.Screen name="Volunteers"       component={VolunteersScreen} />
                <Stack.Screen name="Admin"            component={AdminScreen} />
                <Stack.Screen name="Reports"          component={ReportsScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="VolunteerHome"  component={VolunteerHomeScreen} />
                <Stack.Screen name="MissionDetails" component={MissionDetailsScreen} />
                <Stack.Screen name="Profile"        component={ProfileScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
