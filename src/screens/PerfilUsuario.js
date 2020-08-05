import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet,Text, KeyboardAvoidingView, Image, View, TouchableOpacity,AsyncStorage } from 'react-native';


export default function PerfilUser({navigation}) {
 const [user, setUser] = useState('')

useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
      setUser(user)
    })()
    
  });

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
    <View style={styles.container}>
    <TouchableOpacity style={styles.btnSubmit} onPress={()=>{navigation.navigate('User')}}>
  <Text style={styles.btnText}>Visualizar Perfil</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.btnSubmit}>
  <Text style={styles.btnText}>Editar Perfil</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnSubmit}onPress={()=>{navigation.navigate('Login')}}>
  <Text style={styles.btnText}>Sair</Text>
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