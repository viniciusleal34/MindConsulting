import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import api from '../services/api';
import {FontAwesome} from '@expo/vector-icons';

export default function EditarUsuarios({navigation}) {

  const [profile, setProfile] = useState('');
  const [people, setPeople] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const lista = JSON.parse(await AsyncStorage.getItem('@CodeApi:listar'));
      const perfil = JSON.parse(await AsyncStorage.getItem('@CodeApi:perfil'));
      setPeople(lista);
      setProfile(perfil);
    })();
  }, [profile]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => editarUser(item)}>
      <View
        style={[
          styles.text,
          item.nivel == 0 ? styles.btnListDesat : styles.btnLista,
        ]}>
        <View style={styles.containerProfile}>
          <Image
            style={styles.logo}
            source={
              item.url === ''
                ? require('../../assets/profile.jpg')
                : {uri: item.url}
            }
          />
          <View style={styles.textProfile}>
            <Text style={styles.btnTitulo}>{item.name}</Text>
            <Text style={styles.btnText}>CPF: {item.cpf}</Text>
            <Text style={styles.btnemail}>Email: {item.email}</Text>
            <Text style={styles.btnText}>Nivel de acesso: {item.nivel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  async function editarUser(item) {
    const id = item._id;
    const response = await api.get('/users/ativos/' + id);
    const usuario = response.data.user;
    await AsyncStorage.multiSet([['@CodeApi:perfil', JSON.stringify(usuario)]]);
    navigation.navigate('EditarOneUser');
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerListagem}>
        <Text style={styles.btnTitle}>Editar Perfil de Usuário</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.cpf}
          data={people}
          style={{marginTop: 30}}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
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
