import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import api from '../services/api';
import {FontAwesome} from '@expo/vector-icons';
import {set} from 'react-native-reanimated';

export default function EditarUsuarios({navigation}) {
  const [profile, setProfile] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(' ');
  const [error, setError] = useState(null);
  const [nivel, setNivel] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const perfil = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
      setProfile(perfil);
      setName(perfil.name);
      setCpf(perfil.cpf);
      setEmail(perfil.email);
      setNivel(perfil.nivel);
    })();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerModal}>
        <View style={styles.modelbody}>
          <TouchableOpacity>
            <Image
              style={styles.logo}
              source={
                profile.url === ''
                  ? require('../../assets/profile.jpg')
                  : {uri: profile.url}
              }
            />
          </TouchableOpacity>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Nome Completo">
            {profile.name}
          </TextInput>
          <TextInput editable={false} style={styles.input} placeholder="CPF">
            {profile.cpf}
          </TextInput>
          <TextInput editable={false} style={styles.input} placeholder="E-Mail">
            {profile.email}
          </TextInput>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder="Nivel de Acesso">
            {profile.nivel}
          </TextInput>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={styles.btnText}>Voltar</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#F95F62',
  },

  logo: {
    margin: 20,
    marginBottom: 40,
    justifyContent: 'flex-start',
    height: 200,
    width: 200,
    borderRadius: 50,
  },

  modelbody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#47525E',
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10,
  },
  containerModal: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F95F62',
    width: '100%',
  },
  input: {
    backgroundColor: '#a0a0a0',
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
    margin: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
});
