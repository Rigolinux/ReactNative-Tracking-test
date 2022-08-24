import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView,{Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Api_maps} from '@env';
import * as Location from 'expo-location';
const carImage = require('./assets/images/car.png');
export default function App() {

  const [origin,setorigin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination,setdestination] = useState({
    latitude: 37.73025,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocationPermision = async()=>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('No permission to access location');
      return
        }
    let location = await Location.getCurrentPositionAsync({});
    const current ={
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: location.coords.latitudeDelta,
      longitudeDelta: location.coords.longitudeDelta,
    }
    setorigin(current);
  }
  //use effect to get the current location of the user 
  useEffect(()=>{
    getLocationPermision();
  } ,[])
  
  return (
    <View style={styles.container}>
      <MapView
       initialRegion={origin}
      
       style={styles.Maps}
       >
      <Marker
      draggable
      image={carImage}
       coordinate={origin
        
       }
       onDragEnd={(direction)=>setorigin(direction.nativeEvent.coordinate)}/>
      <Marker 
      draggable
      coordinate={destination} 
      onDragEnd={(direction)=>setdestination(direction.nativeEvent.coordinate)}/>
      
    
     <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={Api_maps}
    strokeWidth={2} strokeColor="red"
    /> 

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Maps:{
    height: '100%',
    width: '100%',
  }
});
