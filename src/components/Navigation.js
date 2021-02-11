import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, ImageBackground } from 'react-native'
import { navigationRef } from '../components/RootNavigation';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { DrawerStyles } from '../styles/General'
import { Icon } from 'native-base'
import Splash from '../screens/Splash'
import Auth from '../screens/Auth'
import firebase from '../utils/firebase'
import Perfil from '../screens/Perfil'
import Chat from '../screens/Chat'
import Stripe from '../screens/Stripe'
import Reservas from '../screens/Reservas'
import MisReservas from '../screens/MisReservas'
import Chats from '../screens/Chats'
import Complejos from '../screens/Complejos'
import Logout from '../screens/Logout'
import Canchas from '../screens/Canchas'
import CanchasList from '../screens/CanchasList'
import ComplejosList from '../screens/ComplejosList'
import UserInfo from '../screens/UserInfo'
import Search from '../screens/Search'
import 'react-native-gesture-handler';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const btnDrawer = (props) => {

  return (
    <TouchableOpacity style={{ paddingLeft: 20 }}>
      <Icon type="FontAwesome" name="bars" style={{color: "#fff"}} onPress={() => props.navigation.openDrawer()} />
    </TouchableOpacity>
  )
}
const btnSearch = (props) => {

  return (
    <TouchableOpacity style={{ paddingRight: 20 }}  onPress={() => props.navigation.navigate("Search")}>
      <Icon type="FontAwesome" name="search" style={{color: "#fff"}} />
    </TouchableOpacity>
  )
}

function StackNavigatorPerfil(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen  options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props), headerRight: () => btnSearch(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'  }} name="Perfil" component={Perfil} />
      <Stack.Screen options={{ title: 'Buscar Usuario', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="Search" component={Search} />
      <Stack.Screen options={{ title: 'Informacion del contacto', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="UserInfo" component={UserInfo} />
      <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props) }} name="Logout" component={Logout} />
    </Stack.Navigator>
  );
}

function StackNavigatorChats(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ title: 'Chats' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Chats" component={Chats} />
    <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
function StackNavigatorComplejosList(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ title: 'Complejos', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="ComplejosList" component={ComplejosList} />
      <Stack.Screen options={{ title: 'Canchas', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="CanchasList" component={CanchasList} />
      <Stack.Screen options={{ title: 'Reservas', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="Reservas" component={Reservas} />
      <Stack.Screen options={{ title: 'Detalle pago', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Stripe" component={Stripe} />
    </Stack.Navigator>
  );
}

function StackNavigatorMisReservas(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ title: 'Mis Reservas', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="MisReservas" component={MisReservas} />
    </Stack.Navigator>
  );
}
function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={[DrawerStyles.menuContainer]}>
        <View style={[DrawerStyles.iconoContainer]}>
          <Icon type="FontAwesome" name={props.iconName} />
        </View>
        <View style={[DrawerStyles.tituloContainer]}>
          <Text style={[DrawerStyles.tituloTxt]}>{props.titleName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Menu(props) {
  const { user, isEnabled, setIsEnabled, navigation } = props;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//console.log(auth().signOut())
  return (

    <View style={[DrawerStyles.container]}>
      <ImageBackground
        source={require('../images/banner.jpg')}
        style={{ width: undefined, }}
      >
        <View style={[DrawerStyles.bgContainer]} >
          <TouchableOpacity>
            <View style={[DrawerStyles.userContainer]}>
              <Image style={[DrawerStyles.userImagen]} source={{ uri: (user.photoURL) }} />
              <View style={[DrawerStyles.camaraContainer]}>
                <Image style={[DrawerStyles.camaraIcon]} source={require('../images/photo-camera.png')} />
              </View>
            </View>
            <View style={[DrawerStyles.userNombre]}>
              <Text style={[DrawerStyles.userTitulo]}>{user.displayName}</Text>
              <Text style={[DrawerStyles.userEmail]}>{user.email}</Text>
              <Text style={[DrawerStyles.userSubTitulo]}>Ver Perfil</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={[DrawerStyles.aja]}>
        <View>
          <Text>Modo oscuro</Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#fff" : "#3cb08d"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <DrawerMenu iconName='user' titleName='Perfil' navigation={() => props.navigation.navigate('Perfil')} />
      <DrawerMenu iconName='inbox' titleName='Chats' navigation={() => props.navigation.navigate('Chats')} />
      <DrawerMenu iconName='futbol-o' titleName='Complejos' navigation={() => props.navigation.navigate('ComplejosList')} />
      <DrawerMenu iconName='calendar-check-o' titleName='Reservas' navigation={() => props.navigation.navigate('MisReservas')} />
      <DrawerMenu iconName='power-off' titleName='Cerrar sesión' navigation={() => props.navigation.navigate('Logout')} />

    </View>
  )
}


export default function Navigation(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={isEnabled ? DarkTheme : DefaultTheme} >
      <Drawer.Navigator drawerContent={(props) => <Menu user={user} isEnabled={isEnabled} setIsEnabled={setIsEnabled} {...props} />}>
      <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="Perfil" component={StackNavigatorPerfil}  />
        <Drawer.Screen name="Chats" component={StackNavigatorChats} /> 
        <Drawer.Screen name="ComplejosList" component={StackNavigatorComplejosList} />
        <Drawer.Screen name="MisReservas" component={StackNavigatorMisReservas} />    
        <Drawer.Screen name="logout" component={Logout} />  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

