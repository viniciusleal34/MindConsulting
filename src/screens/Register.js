import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../services/config';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {useState, useEffect} from 'react';
import {TextInputMask, getRawValue, isValid} from 'react-native-masked-text';
import api from '../services/api';

export default function Register({navigation}) {
  const [image, setImage] = useState(null);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cpfField, setCpfField] = useState(false);

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
  }



  //Função usada para escolher foto da galeria
  async function pickImage() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('A permissão para acessar a galeria não foi permitida!');
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        //pegando o caminho da imagem
        setImage(result);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }

  //Função para registrar Usuarios
  async function RegisterUser() {
    try {
      if (cpfField.isValid()) {
        if (image) {
          const send = await fetch(image.uri);
          const blob = await send.blob();
          let ref = firebase
            .storage()
            .ref()
            .child('users/' + cpfField.getRawValue() + '.jpg');
          ref.put(blob);
        }
        const url = await firebase
          .storage()
          .ref()
          .child('users/' + cpfField.getRawValue() + '.jpg')
          .getDownloadURL();
        const response = await api.post('/auth/register', {
          name,
          email,
          cpf: cpfField.getRawValue(),
          nivel: 1,
          password,
          url,
        });
        navigation.navigate('Login');
      } else {
        Alert.alert('CPF INVALIDO!');
      }
    } catch (response) {
      setError(response.data.error);
      Alert.alert(error);
      navigation.navigate('Register');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View styles={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require('../../assets/logoMind.png')}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.profile}
            source={
              image == null
                ? require('../../assets/profile.jpg')
                : {uri: image.uri}
            }
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          autoCorrect={false}
          onChangeText={(value) => setName(value)}
        />

        <TextInputMask
          placeholder="CPF"
          type={'cpf'}
          value={cpf}
          style={styles.input}
          onChangeText={(text, ref = null) => {
            setCpf(text);
          }}
          ref={(ref) => {
            setCpfField(ref);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
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
  logo: {
    height: 100,
    width: 100,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  profile: {
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 5,
  },
});
