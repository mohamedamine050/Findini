import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screnn/login"
import MainTabNavigator from "./navigation/MainTabNavigator";
import RegisterScreen from "./screnn/register";
import adminscreen from "./screenadmin/layout";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Historiquedonation from "./screnn/Sousprofile/donationHistorque";
import SupportScreen from "./screnn/Sousprofile/SupportScreen";
import TermsScreen from "./screnn/Sousprofile/Term";
import PrivacyScreen from "./screnn/Sousprofile/Privacy";
import Addcategorie from "./screenadmin/addcategories";
import CategorieDetail from "./screenadmin/Categoriesdetail";
import Userlist from "./screenadmin/userall";
import projectsall from "./screenadmin/projectsall";
import ProjectsStautus from "./screenadmin/ProjectsStautus";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
           
            <Stack.Screen name="Historiquedonation" component={Historiquedonation} />
            <Stack.Screen name="SupportScreen" component={SupportScreen} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} />
            <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
            
          </>
        ) : (
          <>
         
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="adminscreen" component={adminscreen} />
            <Stack.Screen name="Addcategorie" component={Addcategorie} />
            <Stack.Screen name="CategorieDetail" component={CategorieDetail} />
            <Stack.Screen name="Userlist" component={Userlist} />
            <Stack.Screen name="projectsall" component={projectsall} />
            <Stack.Screen name="ProjectsStautus" component={ProjectsStautus} />
          </>
        )}


        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
