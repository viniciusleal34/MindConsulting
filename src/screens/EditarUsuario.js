import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet,Text, KeyboardAvoidingView, Image, View, Alert,AsyncStorage, TouchableOpacity,Modal,TextInput} from 'react-native';
import api from '../services/api'
import {FontAwesome} from '@expo/vector-icons'
import { set } from 'react-native-reanimated';



export default function EditarUsuarios({navigation}) {

  const [profile, setProfile] = useState('')
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] =useState('')
  const [password, setPassword] = useState(' ')
  const [error, setError] = useState(null)
  const [nivel, setNivel] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const lista = JSON.parse(await AsyncStorage.getItem('@CodeApi:listar'))
      const perfil = JSON.parse(await AsyncStorage.getItem('@CodeApi:perfil'))
  
      setProfile(perfil)
      setName(perfil.name)
      setCpf(perfil.cpf)
      setEmail(perfil.email)
      setNivel(perfil.nivel)
    })()
    
  },[]);


async function Atualizar(){
console.log(email)
console.log(name)
console.log(nivel)
console.log(cpf)
  const id = profile.id
  const dt = {
    "name":name,
    "email":email,
    "cpf":cpf
  }
if(cpf && name && email && nivel){

    if(password != ' '){
        if(nivel ==1 || nivel == 0 || nivel == 9999){
        const response = await api.put('/users/'+id,{

            "cpf":cpf,
            "password":password,
           "name":name,
            'email':email,

        }   )
        Alert.alert("Alterado")
        }
        else{
            Alert.alert("Nivel Invalido: Apenas permitido 1, 0 ou 9999")
    }
  
    }
    else{


        const response = await api.put('/users/'+id,{
          "cpf":cpf,
         "name":name,
          "email":email,
        })
        console.log(response)
        Alert.alert("Alterado")
        }
       
    }
    else{
        Alert.alert("Há informações inexistentes")
    }

}

async function AtualizarLista(){
    const resp = await api.get('/users/todos')
    const dado = resp.data.user

    await AsyncStorage.multiSet([
        ['@CodeApi:listar', JSON.stringify(dado)],
      ])
      navigation.navigate('EditarUsers')
}

return (
    
    <KeyboardAvoidingView style={styles.background}>
           
            
      <View style={styles.containerModal}> 
      <View style={styles.modelbody}>
     
         <TouchableOpacity> 
        <Image
        style={styles.logo}
        source={require('../../assets/profile.jpg') }
        /> 
        </TouchableOpacity>
      <TextInput style={styles.input}placeholder="Nome Completo"  onChangeText={(value)=>(setName(value))}>{profile.name}</TextInput>
      <TextInput style={styles.input}placeholder="CPF"  onChangeText={(value)=>(setCpf(value))}>{profile.cpf}</TextInput>
      <TextInput style={styles.input} placeholder="E-Mail"  onChangeText={(value)=>(setEmail(value))}>{profile.email}</TextInput>
      <TextInput  style={styles.input} keyboardType="number-pad" placeholder="Nivel de Acesso" onChangeText={(value)=>(setNivel(value))}>{profile.nivel}</TextInput>
      <TextInput  style={styles.input} placeholder="Nova Senha" onChangeText={(value)=>(setPassword(value))}></TextInput>
 
  <TouchableOpacity style={styles.btnSubmit} onPress={Atualizar}>
  <Text style={styles.btnText}>Acessar</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnSubmit} onPress={AtualizarLista }>
  <Text style={styles.btnText}>Cancelar</Text>
</TouchableOpacity>
      </View>
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
    backgroundColor:'#F95F62'
  },
  containerListagem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    backgroundColor:'#343F4B',

  },
  container:{
    flex:5,
    alignItems:'center',
    width:'100%',
    backgroundColor:'#F95F62',
  },
  btnLista:{
    backgroundColor:'#343F4B',
    width:'100%',
    height:150,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  btnListDesat:{
    backgroundColor:'#111111',
    width:'100%',
    height:150,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  logo:{
    margin:20,
    marginBottom:40,
    justifyContent:'flex-start',
    height:100,
    width:100,
    borderRadius:100

  },
  btnText:{
    color:'#fff',
    fontSize:13,
  },
  textProfile:{
    margin:20,
    flex:1,
    flexDirection:'column',
  },
  containerProfile:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    width:'90%',

  },
  btnTitulo:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:5,
  },
  btnemail:{
    color:'#fff',
    fontSize:11,
  },
  btnTitle:{
    marginTop:10,
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center'
  },

  modelbody: {
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
    justifyContent:'flex-start',
    backgroundColor: '#47525E',
    width: "90%",
    alignSelf: 'center',
    margin: 10,
    borderRadius:10
  },
  containerModal: {
    marginTop:30,
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#F95F62',
    width: "100%",

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
    margin: 5,
  },
});
