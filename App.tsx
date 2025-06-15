import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import CustomCanvaScreen from './src/screens/CustomCanva/CustomCanvaScreen';
import PanBoxScreen from './src/screens/PanBox/PanBoxScreen';
import PinchZoomScreen from './src/screens/PinchZoom/PinchZoomScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 24 }}>•</Text>
);

const screenOptions = {
  tabBarActiveTintColor: '#0000FF',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

const tabScreenOptions = {
  PinchZoom: {
    title: 'Pinch Zoom',
    tabBarLabel: 'Pinch Zoom',
    tabBarIcon: ({ color }: { color: string }) => <TabIcon color={color} />,
  },
  PanBox: {
    title: 'Pan Box',
    tabBarLabel: 'Pan Box',
    tabBarIcon: ({ color }: { color: string }) => <TabIcon color={color} />,
  },
  CustomCanva: {
    title: 'Custom Canva',
    tabBarLabel: 'Custom Canva',
    tabBarIcon: ({ color }: { color: string }) => <TabIcon color={color} />,
  },
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="PanBox"
            component={PanBoxScreen}
            options={tabScreenOptions.PanBox}
          />
          <Tab.Screen
            name="PinchZoom"
            component={PinchZoomScreen}
            options={tabScreenOptions.PinchZoom}
          />
          <Tab.Screen
            name="CustomCanva"
            component={CustomCanvaScreen}
            options={tabScreenOptions.CustomCanva}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
