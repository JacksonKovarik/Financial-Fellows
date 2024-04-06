
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// App Naivigation 
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// All pages for when user is signed out
import Get_Started from '../Screens/Get_Started';
import Sign_Up from '../Screens/Sign Up/Sign_Up';
import Sign_In from '../Screens/Sign In/Sign_In';
import NewPassword from '../Screens/Sign In/NewPassword';
import ConfirmEmail from '../Screens/Sign Up/ConfirmEmail';
import ForgotPassEmail from '../Screens/Sign In/ForgotPassEmail';

// All pages for when user is signed in
import Weekly from "../Screens/Tabs/Weekly"
import Years from "../Screens/Tabs/Years";
import Monthly from "../Screens/Tabs/Monthly"
import Budget from '../Screens/Tabs/Budget';


import { COLORS } from '../utils/COLORS';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user_information';


// Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

// FontAwesome images
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { faHome, faCalendarDays, faMoneyBillTrendUp, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'; 


// Creates the different app navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Navigation for when user is signed in
function Home () {
  const onLogOutPressed = async () => {
    await signOut(auth);
  }
  return (
    <NavigationContainer>
    <Drawer.Navigator
      //initialRouteName="Screen_A"
      screenOptions={{
        swipeEnabled: true,
        headerShown: false,
        drawerType: "front",
        drawerPosition: "left",
        swipeEdgeWidth: 150,
        drawerHideStatusBarOnOpen: false,
        
        drawerStyle: {
          backgroundColor: COLORS.lightPrime,
          width: 250,
        },
        
        headerTitleAlign: 'center',
        headerStyle: {
          height: 120,
          backgroundColor: COLORS.primary,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: 'bold',
        },
        headerLeftContainerStyle: {
          padding: 15
        },
        headerRightContainerStyle: {
          padding: 15
        },
        
      }}

      drawerContent={
        (props) => {
          return (
            <SafeAreaView style={{flex: 1, flexDirection: 'column', }}>
              <View style={{marginBottom: 35, marginTop: 20, alignItems: 'center'}}>
                <Text style={{color: 'black', fontSize: 30, fontFamily: 'Judson-Bold'}}>Financial Fellows</Text>
              </View>
              <DrawerItemList {...props}/>
              <View 
                style={{
                  height: 40,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 300
                }}
              >
                <TouchableOpacity
                  onPress={onLogOutPressed}
                  style={{
                    backgroundColor: '#fff',
                    width: 150,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 2, // Android
                    marginTop: 80
                  }}
                >
                  <Text style = {{fontSize: 20, color: '#00f'}}>
                    Log out
                  </Text>
                </TouchableOpacity>
              </View>
              
            </SafeAreaView>
          )
        }
      }
    >
    
      
          <Drawer.Screen 
            name="Monthly" 
            component={Monthly}
            options={{
              drawerIcon: ({ focused }) => (
                <View style = {{alignItems: 'center', justifyContent: 'center', }}>
                  <FontAwesomeIcon icon={faHome} size={30} color = {focused ? COLORS.secondary : COLORS.black}/>
                </View>
              ),
            }}
          />

          <Drawer.Screen 
            name="Weekly" 
            component={Weekly}
            
            options={{
              drawerIcon: ({ focused }) => (
                <View style = {{alignItems: 'center', justifyContent: 'center', }}>
                  <FontAwesomeIcon icon={faCalendarWeek} size={30} color = {focused ? COLORS.secondary : COLORS.black}/>
                </View>
              ),
            }}
          />
          
          <Drawer.Screen 
            name="Years" 
            component={Years}
            
            options={{
              drawerIcon: ({ focused }) => (
                <View style = {{alignItems: 'center', justifyContent: 'center', }}>
                  <FontAwesomeIcon icon={faCalendarDays} size={30} color = {focused ? COLORS.secondary : COLORS.black}/>
                </View>
              ),
            }}
          />

          <Drawer.Screen 
            name="Budget" 
            component={Budget}
          
            options={{
              drawerIcon:  ({ focused }) => (
                <View>
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} size={30} color = {focused ? COLORS.secondary : COLORS.black}/>
                  
                </View>
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      
  )
}

// Complete app navigation
function AppNavigation(){

    const {user} = useSelector(state => state.user)

    const dispatch = useDispatch()

    
    onAuthStateChanged(auth,u => {
      dispatch(setUser(u));
    }) 

    
    if (user) {
      return (
          <Home />
      )
        
    }else {
        return (  
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName='Get Started'
                screenOptions={{
                  headerShown: true,
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#0080ff'
                  },
                  headerTintColor: '#ffffff',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold'
                  }
                }}
              >
        
                <Stack.Screen 
                  name="Get Started"
                  component={Get_Started}
                  options={{
                    headerShown: false,
                  }}
                />
                
        
                <Stack.Screen 
                  name="Sign Up"
                  component={Sign_Up}
                  options = {{
                    headerShown: false,
                  }}
                />
        
                <Stack.Screen 
                  name="Sign In"
                  component={Sign_In}
                  options = {{
                    headerShown: false,
                  }}
                />
        
                <Stack.Screen 
                  name="Confirm Email"
                  component={ConfirmEmail}
                  options = {{
                    headerShown: false,
                  }}
                />  
        
                <Stack.Screen 
                  name="Monthly"
                  component={Monthly}
                  options = {{
                    headerShown: false,
                  }}
                />
        
                <Stack.Screen 
                  name="Forgot Password Email"
                  component={ForgotPassEmail}
                  options = {{
                    headerShown: false,
                  }}
                /> 
        
                <Stack.Screen 
                  name="Forgot Password"
                  component={NewPassword}
                  options = {{
                    headerShown: false,
                  }}
                />  
        
                <Stack.Screen 
                  name="Home"
                  component={Home}
                  options = {{
                    headerShown: false,
                  }}
                />  
        
                <Stack.Screen 
                  name="Years"
                  component={Years}
                  options = {{
                    headerShown: false,
                  }}
                />    
        
                
        
              </Stack.Navigator>
            </NavigationContainer>
          )
    }

  
}

export default AppNavigation;