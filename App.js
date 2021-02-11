import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, LogBox, Text} from 'react-native';
import {decode, encode} from 'base-64';
import Auth from './src/screens/Auth';
import Rol from './src/components/Rol';
import Offline from './src/screens/Offline';
import firebase from './src/utils/firebase';
import {mainStyles} from './src/styles/General';
import NetInfo from '@react-native-community/netinfo';
import firebasef from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

firebasef.firestore().settings({experimentalForceLongPolling: true});
const db = firebasef.firestore(firebasef);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

LogBox.ignoreAllLogs();

export default function App() {
  
  const [user, setUser] = useState(undefined);
  const [conexion, setConexion] = useState(false);
 
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConexion(state.isInternetReachable);
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response)
    });
    
  }, []);


  if (user === undefined) return null;
  return (
    <>
      <SafeAreaView style={[mainStyles.container]}>
        {conexion ? (
          user ? (
            <Rol user={user}/>
          ) : (
            <Auth />
          )
        ) : (
          <Offline />
        )}
      </SafeAreaView>
    </>
  );
}
