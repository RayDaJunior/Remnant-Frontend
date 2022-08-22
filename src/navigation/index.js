import React from 'react';
import {Text, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './rootnavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

//ACTIONS
import {RETRIVE_TOKEN, LOGIN, LOGOUT, REGISTER} from '../store/actions/auth';
//ACTIONS

//Imports
//Imports
//Imports
import Splash from '../auth/splash';
import Login from '../auth/login';
import SignUp from '../auth/signup';
import Otp from '../auth/otp';
import Questions from '../auth/questions';
import Contact from '../components/contact';
import Dashboard from '../components/dashboard';
import DashboardTemp from '../components/DashboardTemp';
import Video from '../components/videos';
import VideoDetails from '../components/videos/videoDetails';
import Notification from '../components/notification';
import Tribes from '../components/Tribes';
import Chats from '../components/chats';
import Calendar from '../components/Calendar';
import Live from '../components/Live';
import EventDetails from '../components/Events/eventDetails';
import Website from '../components/webView';
//Imports
//Imports
//Imports

import {setCustomText} from 'react-native-global-props';
const Stack = createStackNavigator();

const customTextProps = {
  style: {
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
    color: 'black',
  },
};

const Main = () => {
  setCustomText(customTextProps);
  const screenOptionStyle = {
    headerShown: false,
    animationEnabled: false,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={screenOptionStyle}
        initialRouteName={'Splash'}>
        {/**Authentications */}
        {/**Authentications */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Questions" component={Questions} />
        {/**Authentications */}
        {/**Authentications */}
        {/**contact */}
        {/**contact */}
        <Stack.Screen name="Contact" component={Contact} />
        {/**contact */}
        {/**contact */}
        {/**dashboard */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            gestureEnabled: false,
            // headerShown: true,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="VideoDetails" component={VideoDetails} />
        {/**dashboard */}
        {/**Notification */}
        {/**Notification */}
        <Stack.Screen name="Notification" component={Notification} />
        {/**Notification */}
        {/**Notification */}
        {/**Tribe */}
        <Stack.Screen name="Tribes" component={Tribes} />
        {/**Tribe */}
        {/**Chats */}
        <Stack.Screen name="Chats" component={Chats} />
        {/**Chats */}
        {/**Calendar */}
        <Stack.Screen name="Calendar" component={Calendar} />
        {/**Calendar */}
        {/**Live */}
        <Stack.Screen name="Live" component={Live} />
        {/**Live */}
        {/**Event Details */}
        <Stack.Screen name="EventDetails" component={EventDetails} />
        {/**Event Details */}
        {/**Web View */}
        <Stack.Screen name="Website" component={Website} />
        {/**Web View */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
