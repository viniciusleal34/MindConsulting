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
} from 'react-native';
import api from '../services/api';

export default function Ativar() {

  const [people, setPeople] = useState([]);

  useEffect(() => {
    (async () => {
      const lista = JSON.parse(await AsyncStorage.getItem('@CodeApi:listar'));
      setPeople(lista);
    })();
  });

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onOffUser(item)}>
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

  async function onOffUser(item) {
    const id = item._id;
    if (item.nivel == 0) {
      const response = await api.put('/users/' + id, {
        nivel: 1,
      });
    } else {
      const response = await api.put('/users/' + id, {
        nivel: 0,
      });
    }
    const resp = await api.get('/users/todos');
    const dado = resp.data.user;

    setPeople(dado);
    await AsyncStorage.multiSet([['@CodeApi:listar', JSON.stringify(dado)]]);
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerListagem}>
        <Text style={styles.btnTitle}>Ativando e Desativando Usuários</Text>
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
    marginLeft: 10,
    justifyContent: 'flex-start',
    height: 100,
    width: 100,
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
});
