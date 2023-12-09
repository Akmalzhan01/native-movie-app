import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Detailed from "../screens/Detailed";
import IonIcons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          }else if (route.name === "Detailes"){
            iconName =  focused ? "settings" : "settings-outline"
          }
          return (
            <IonIcons name={iconName} size={size} color={color} />
          )
        },
        tabBarActiveTintColor: "crimson",
        tabBarInactiveTintColor: "black"
      })}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Tab.Screen name="Detailes" component={Detailed} options={{headerShown: false, tabBarBadge: "+99"}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
