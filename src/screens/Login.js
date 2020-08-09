import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../services/api';

export default function Login({navigation}) {
  const [email, setEmail] = useState('aaaa');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@CodeApi:token');
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
    })();
  });

  async function signIn() {
    try {
      const response = await api.post('/auth/authenticated', {
        email: email,
        password: password,
      });
      const {token, usuario} = response.data;
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(usuario)],
      ]);
      if (usuario.nivel === 9999) {
        navigation.navigate('Adm');
      } else if (usuario.nivel === 1) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Usuário desativado!');
      }
    } catch (err) {
      Alert.alert('Confira seu E-mail e Senha, e tente novamente!');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View styles={styles.containerLogo}>
        <Image source={require('../../assets/logoMind.png')} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email ou CPF"
          autoCorrect={false}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Senha"
          style={styles.input}
          autoCorrect={false}
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={signIn}>
          <Text style={styles.btnText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.btnText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" backgroundColor="black" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343F4B',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#F95F62',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnRegister: {
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
