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
import {TextInputMask} from 'react-native-masked-text';
import * as firebase from 'firebase';
import ApiKeys from '../services/config';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function EditarUsuarios({navigation}) {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(' ');
  const [error, setError] = useState(null);
  const [nivel, setNivel] = useState('');
  const [cpfField, setCpfField] = useState(false);
  const [url, setUrl] = useState('');

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
  }

  useEffect(() => {
    (async () => {
      const perfil = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
      setProfile(perfil);
      setCpf(perfil.cpf);
      setName(perfil.name);
      setEmail(perfil.email);
      setNivel(perfil.nivel);
      setUrl(perfil.url);
    })();
  }, []);

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
        const send = await fetch(result.uri);
        const blob = await send.blob();
        let ref = firebase
          .storage()
          .ref()
          .child('users/' + cpfField.getRawValue() + '.jpg');
        ref.put(blob);
      }

    } catch (E) {
      console.log(E);
    }
  }

  async function Atualizar() {
    const url = await firebase
      .storage()
      .ref()
      .child('users/' + cpfField.getRawValue() + '.jpg')
      .getDownloadURL();
    setUrl(url)
    if (cpfField.isValid()) {
      if (password === ' ') {
        const resp = await api.put('/users/' + profile._id, {
          "cpf":cpfField.getRawValue(),
          name,
          email,
          url
        });

      } else {
        const response = await api.put('/users/' + profile._id, {
          "cpf":cpfField.getRawValue(),
          name,
          email,
          password,
          url
        });

      }
      profile.name= name
      profile.cpf = cpfField.getRawValue()
      profile.email= email
      profile.url = url
      await AsyncStorage.multiSet([['@CodeApi:user', JSON.stringify(profile)]]);
      Alert.alert('Alterado com sucesso!');
      navigation.navigate('Home');
    } else {
      Alert.alert('CPF Invalido!');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerModal}>
        <View style={styles.modelbody}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.logo}
              source={image == null ? {uri: url} : {uri: image.uri}}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={(value) => setName(value)}>
            {profile.name}
          </TextInput>
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
            placeholder="E-Mail"
            onChangeText={(value) => setEmail(value)}>
            {profile.email}
          </TextInput>

          <TextInput
            secureTextEntry={true}
            placeholder="Nova Senha"
            style={styles.input}
            autoCorrect={false}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity style={styles.btnSubmit} onPress={Atualizar}>
            <Text style={styles.btnText}>Salvar</Text>
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
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
  modelbody: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    margin: 5,
  },
});
