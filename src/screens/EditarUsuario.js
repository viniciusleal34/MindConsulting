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
  TextInput,
} from 'react-native';
import api from '../services/api';
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
      const lista = JSON.parse(await AsyncStorage.getItem('@CodeApi:listar'));
      const perfil = JSON.parse(await AsyncStorage.getItem('@CodeApi:perfil'));
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
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }

  async function Atualizar() {
    if (cpfField.isValid()) {
      if (password === ' ') {
        const response = await api.put('/users/' + profile._id, {
          cpf,
          name,
          email,
          nivel,
        });
      } else {
        const response = await api.put('/users/' + profile._id, {
          cpf,
          name,
          email,
          nivel,
          password,
        });
        Alert.alert('Alterado com sucesso!');
      }
    } else {
      Alert.alert('CPF Invalido!');
    }
  }

  async function AtualizarLista() {
    const resp = await api.get('/users/todos');
    const dado = resp.data.user;
    await AsyncStorage.multiSet([['@CodeApi:listar', JSON.stringify(dado)]]);
    navigation.navigate('EditarUsers');
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
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Nivel de Acesso"
            onChangeText={(value) => setNivel(value)}>
            {profile.nivel}
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
          <TouchableOpacity style={styles.btnSubmit} onPress={AtualizarLista}>
            <Text style={styles.btnText}>Cancelar</Text>
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
  containerListagem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#343F4B',
  },
  container: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F95F62',
  },
  btnLista: {
    backgroundColor: '#343F4B',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnListDesat: {
    backgroundColor: '#111111',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    margin: 20,
    marginBottom: 40,
    justifyContent: 'flex-start',
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
  textProfile: {
    margin: 20,
    flex: 1,
    flexDirection: 'column',
  },
  containerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
  },
  btnTitulo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btnemail: {
    color: '#fff',
    fontSize: 11,
  },
  btnTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
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
