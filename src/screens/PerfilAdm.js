import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet,Text, KeyboardAvoidingView, Image, View, TouchableOpacity,AsyncStorage} from 'react-native';
import api from '../services/api'

export default function PerfilUser({navigation}) {
  const [user, setUser] = useState('')

  useEffect(() => {
      (async () => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
        setUser(user)
      })()
      
    });

    async function Listar(){
      const response = await api.get('/users/todos')
      const usuarios = response.data.user
      await AsyncStorage.multiSet([
        ['@CodeApi:listar', JSON.stringify(usuarios)],
      ])
      navigation.navigate('Listar')
    }
    
    async function AtivarUser(){
      const response = await api.get('/users/todos')
      const usuarios = response.data.user
      await AsyncStorage.multiSet([
        ['@CodeApi:listar', JSON.stringify(usuarios)],
      ])
      navigation.navigate('Ativar')
    }

    async function EditaUser(){
      const response = await api.get('/users/todos')
      const usuarios = response.data.user
      await AsyncStorage.multiSet([
        ['@CodeApi:listar', JSON.stringify(usuarios)],
      ])
      navigation.navigate('EditarUsers')
    }
  return (
    <KeyboardAvoidingView style={styles.background}>
    <View style={styles.containerProfile}>
      <Image
        style={styles.logo}
        source={require('../../assets/profile.jpg') }
        />    
      <View style={styles.textProfile}>
      <Text style={styles.btnText}>{user.name}</Text>
      <Text style={styles.btnText}>Nivel de acesso: {user.nivel}</Text>
      </View>
      </View>
    <View style={styles.container} >
    <TouchableOpacity style={styles.btnSubmit} onPress={Listar}>
  <Text style={styles.btnText}>Listar todos os usuários</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.btnSubmit} onPress={EditaUser}>
  <Text style={styles.btnText}>Editar um perfil</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnSubmit} onPress={AtivarUser}>
  <Text style={styles.btnText}>Ativar/desativar usuário</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnSubmit} onPress={()=>navigation.navigate('Login')}>
  <Text style={styles.btnText} >Sair</Text>
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
  containerProfile:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    width:'90%',

  },
  container:{
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    backgroundColor:'#F95F62',
  },
  btnSubmit:{
    backgroundColor:'#343F4B',
    width:'80%',
    height:60,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    borderRadius:50,
  },
  logo:{
    justifyContent:'flex-start',
    height:100,
    width:100
  },
  btnText:{
    color:'#fff',
    fontSize:18,
  },
  textProfile:{
    margin:20,
    flex:1,
    flexDirection:'column',
  },
});
