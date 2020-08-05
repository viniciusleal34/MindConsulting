// import { StatusBar } from 'expo-status-bar';
// import React,{useState, useEffect} from 'react';
// import { StyleSheet,Text, KeyboardAvoidingView, Button, AsyncStorage} from 'react-native';
// import api from './src/services/api'

// export default function PerfilUser() {
// const [open,setOpen]=useState(false)
// const [user, setUser]=useState()
// const [token, setToken]=useState()


// async function signIn(){
//   const response = await api.post('/auth/authenticated',{
//     email:"viniciusleal34@gmail.com",
//     password:"123456789",
//   }
//   ) <TouchableOpacity style={{margin:10}} onPress={ ()=> setOpen(false)}>
            //   <FontAwesome name="window-close" size={50} color="#FF0000" />
            //   </TouchableOpacity>

//   const {token, usuario} = response.data


//   await AsyncStorage.multiSet([
//     ['@CodeApi:token', token],
//     ['@CodeApi:user',JSON.stringify(usuario)],
//   ])
// }


// useEffect(() => {
//   (async () => {
//     const token = await AsyncStorage.getItem('@CodeApi:token');
//     const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
//     setUser(user)
//     setToken(token)
//   })()
  
// });

//   return (
    
//     <KeyboardAvoidingView style={styles.background}>
      


//       <Button onPress={signIn} title="Entrar"></Button>
//   <Text>{JSON.stringify(user)}</Text>
//     <StatusBar style="light" backgroundColor='black'/>
//     </KeyboardAvoidingView>
    
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     alignItems:'center',
//     justifyContent:'center',
//     backgroundColor:'#F95F62'
//   },
//   containerListagem:{
//     flex:1,
//     alignItems:'center',
//     justifyContent:'center',
//     width:'100%',
//     backgroundColor:'#343F4B',

//   },
//   container:{
//     flex:5,
//     alignItems:'center',
//     width:'100%',
//     backgroundColor:'#F95F62',
//   },
//   btnLista:{
//     backgroundColor:'#343F4B',
//     width:'100%',
//     height:150,
//     alignItems:'center',
//     justifyContent:'center',
//     marginBottom:20,
//     borderRadius:10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
    
//     elevation: 5,
//   },
//   logo:{
//     marginLeft:10,
//     justifyContent:'flex-start',
//     height:100,
//     width:100
//   },
//   btnText:{
//     color:'#fff',
//     fontSize:13,
//   },
//   textProfile:{
//     margin:20,
//     flex:1,
//     flexDirection:'column',
//   },
//   containerProfile:{
//     flex:1,
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'flex-end',
//     width:'90%',

//   },
//   btnTitulo:{
//     color:'#fff',
//     fontSize:18,
//     fontWeight:'bold',
//     marginBottom:5,
//   },
//   btnemail:{
//     color:'#fff',
//     fontSize:11,
//   },
//   btnTitle:{
//     marginTop:10,
//     color:'#fff',
//     fontSize:25,
//     fontWeight:'bold',
//     alignSelf:'center'
//   }
// });
