import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput,Text, KeyboardAvoidingView, Image, View, TouchableOpacity, Button} from 'react-native';
import {ImagePicker, Permissions, Camera} from 'expo'
import { useState, useEffect } from 'react';

export default function App() {
  const [image, setImage] = useState(null)
  
  async function selectPicture() {
      let { status } = await CAMERA_ROLL.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        aspect: 1,
        allowsEditing: true,
      });
      if (!cancelled) setImage(uri) }
    

    
 


  return (
    <KeyboardAvoidingView style={styles.background}>
      <View styles={styles.containerLogo} >
        <Image
        style={styles.logo}
        source={require('./assets/logoMind.png') }
        />        
      </View>
    <View style={styles.container}>
    <TouchableOpacity>
    <Image
        style={styles.profile}
        source={require('./assets/profile.jpg') }
        />     
</TouchableOpacity>
    <TextInput
    style={styles.input}
    placeholder="Nome Completo"
    autoCorrect={false}
    onChargeText={()=>{}}
    >

    </TextInput>

    <TextInput
    placeholder="CPF"
    style={styles.input}
    autoCorrect={false}
    onChargeText={()=>{}}
    >

    </TextInput>
    <TextInput
    style={styles.input}
    placeholder="Email"
    autoCorrect={false}
    onChargeText={()=>{}}
    >

    </TextInput>

    <TextInput
    placeholder="Senha"
    style={styles.input}
    autoCorrect={false}
    onChargeText={()=>{}}
    >
 
    </TextInput>

<TouchableOpacity style={styles.btnSubmit}>
  <Text style={styles.btnText}>Criar Conta</Text>
</TouchableOpacity>
    </View>
    <StatusBar style="light" backgroundColor='black'/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#343F4B'
  },
  containerLogo:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    width:'90%'
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'90%'
  },
  input:{
    backgroundColor:'#fff',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize:17,
    borderRadius:7,
    padding:10,
  },
  btnSubmit:{
    backgroundColor:'#F95F62',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
  },
  logo:{
    height:100,
    width:100
  },
  btnText:{
    color:'#fff',
    fontSize:18,
  },
  profile:{
    height:150,
    width:150,
    marginBottom:20,
    
  },
});