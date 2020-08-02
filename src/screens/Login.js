import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput,Text, KeyboardAvoidingView, Image, View, TouchableOpacity} from 'react-native';

export default function Login() {
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View styles={styles.containerLogo} >
        <Image
        source={require('./assets/logoMind.png')}
        />        
      </View>
    <View style={styles.container}>
    <TextInput
    style={styles.input}
    placeholder="Email ou CPF"
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
  <Text style={styles.btnText}>Acessar</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btnRegister}>
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
    borderRadius:5
  },
  btnRegister:{
    marginTop:10,
    
  },
  btnText:{
    color:"#fff",
    fontSize:18,
  },

});
