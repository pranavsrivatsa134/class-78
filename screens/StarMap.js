import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export default class StarMapScreen extends React.Component {
  constructor(){
    super();
    this.state={
      autoLocation:false,
      location:{
        lat:null,
        lon:null
      },
      path:"",
      inputDeactivator:true,
    }
  }

  autoGetLocation = async() =>{
    const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    let lat = await location.coords.latitude;
    let lon = await location.coords.longitude;

      if (status !== 'granted') {
        Alert.alert("Give permission to access your device location")
      }

     ToastAndroid.show("Going to your location . . .", ToastAndroid.SHORT);
      
      if(this.state.autoLocation === true && status === 'granted' && this.state.inputDeactivator === false){
        this.setState({
          location:{
            lat:lat,
            lon:lon
          }
        });
       ToastAndroid.show("You arrived to your location", ToastAndroid.SHORT);
        this.getConstellationsApi()
      }
  }

  getConstellationsApi = () =>{
    const path = "https://virtualsky.lco.global/embed/index.html?longitude="+ this.state.location.lon + "&latitude=" + this.state.location.lat +"&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true";
    this.setState({path:path})
  }


  launchAuto=(state)=>{
    this.setState({
      autoLocation:state,
      inputDeactivator:false
    })
    this.autoGetLocation()

  }
 
  render(){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.titleBar}>
          <Text style={styles.titleText}>Star Map</Text>
          </View>
          <WebView 
          scalesPageToFit={true}
          source={{uri : this.state.path}}
          style={{marginTop:20,marginBottom:20}}
          />

  <View style={styles.inputContainer} >
    <TextInput style={styles.input}
    editable={this.state.inputDeactivator}
            placeholder="Latitudes"
            keyboardType="numeric"
            placeholderTextColor="#ffff#000000"
            onChangeText={(lat)=>{
              this.setState({
                location:{
                  lat:lat
                }
              });
            }}
          />
          <TextInput 
            editable={this.state.inputDeactivator}
          style={styles.input}
            placeholder="Longitudes"
            keyboardType="numeric"
            placeholderTextColor="#ffff#000000"
            onChangeText={(lon)=>{
              this.setState({
                location:{
                  lon:lon
                }
              });
            }}
          />
          <TouchableOpacity style={styles.go}>
            <Text style={styles.goText}>Go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gps} onPress={()=>this.launchAuto(true)}>
            <Image 
            source={require("../assets/gps.png")}
            style={styles.gpsImg}
            />
          </TouchableOpacity>
  </View>

          


          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
},
  titleBar: {
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"black",
    width:"100%",
    height:50
},
titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
},
input:{
color:"white",
height:40,
borderColor:"grey",
borderWidth:1,
width:250,
borderRadius:20,
textAlign:"center",
marginTop:20
},
inputContainer:{
  backgroundColor:"black",
  alignItems:"center",
  height:190,
  marginTop:450
},
go:{
  backgroundColor:"white",
  width:100,
  height:30,
  borderRadius:20,
  marginTop:10,
  marginLeft:-100
},
goText:{
  fontSize:20,
  textAlign:"center"
},
gpsImg:{
  height:30,
  width:30,
  marginTop:5,
  borderRadius:20,
 
},
gps:{
  backgroundColor:"white",
  marginTop:-35,
  marginLeft:120,
  width:40,
  height:40,
  borderRadius:20,
  alignItems:"center"
}
});