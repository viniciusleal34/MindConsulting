import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput,Text, KeyboardAvoidingView, Image, View, TouchableOpacity, Button, Alert} from 'react-native';
import {ImagePicker, Permissions, Camera} from 'expo'
import { useState, useEffect } from 'react';
import api from '../services/api'

export default function Register({navigation}) {
  const [image, setImage] = useState(null)
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] =useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function selectPicture() {
      let { status } = await CAMERA_ROLL.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        aspect: 1,
        allowsEditing: true,
      });
      if (!cancelled) setImage(uri) }
async function RegisterUser(){
  try{
    const response = await api.post('/auth/register',{
       name,
       email,
       cpf,
      "nivel": 1,
      password
    }
    )
    navigation.navigate('Login')
  }
  catch(response){
      setError(response.data.error)
      Alert.alert(error)
      navigation.navigate('Register')
  }
}



  return (
    <KeyboardAvoidingView style={styles.background}>
      <View styles={styles.containerLogo} >
        <Image
        style={styles.logo}
        source={require('../../assets/logoMind.png') }
        />        
      </View>
    <View style={styles.container}>
    <TouchableOpacity>
    <Image
        style={styles.profile}
        source={require('../../assets/profile.jpg') }
        />     
</TouchableOpacity>
    <TextInput
    style={styles.input}
    placeholder="Nome Completo"
    autoCorrect={false}
    onChangeText={(value)=>(setName(value))}
    >

    </TextInput>

    <TextInput
    placeholder="CPF"
    style={styles.input}
    autoCorrect={false}
    onChangeText={(value)=>(setCpf(value))}
    >

    </TextInput>
    <TextInput
    style={styles.input}
    placeholder="Email"
    autoCorrect={false}
    onChangeText={(value)=>(setEmail(value))}>

    </TextInput>

    <TextInput
    secureTextEntry={true}
    placeholder="Senha"
    style={styles.input}
    autoCorrect={false}
    onChangeText={(value)=>(setPassword(value))}
    >
 
    </TextInput>

<TouchableOpacity style={styles.btnSubmit} onPress={RegisterUser}>
  <Text style={styles.btnText}>Criar Conta</Text>
</TouchableOpacity>
    </View>
   
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