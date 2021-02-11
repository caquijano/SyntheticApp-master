import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {listComplejosStyles} from '../styles/General';
import CanchasList from '../components/canchasAdmin/CanchasListAdmin';
import CanchasForm from '../components/canchasAdmin/CanchasForm';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import {Icon} from 'native-base';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

const widthScreen = Dimensions.get('window').width;

export default function Canchas(props) {
  const {navigation} = props;
  const {complejos} = props.route.params;
  const {id, Nombre, Descripcion} = complejos;
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [canchas, setCanchas] = useState([]);
  const [imaData, setImaData] = useState({
    imagePath: '',
  });

  useEffect(() => {
    setCanchas([]);
    db.collection('canchas')
      .where('ComplejosId', '==', id)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        setCanchas(itemsArray);
      });

    setReloadData(false);
  }, [reloadData]);

  return (
    <>
      <LinearGradient style={{height: '100%'}} colors={['#fff', '#0a414e']}>
        <ScrollView>
          <View style={[listComplejosStyles.content]}>
            <View style={[listComplejosStyles.containerlist]}>
              {form ? (
                <CanchasForm
                  navigation={navigation}
                  formData={formData}
                  setFormData={setFormData}
                  setReloadData={setReloadData}
                  reloadData={reloadData}
                  canchas={canchas}
                  setCanchas={setCanchas}
                  imaData={imaData}
                  setImaData={setImaData}
                  setForm={setForm}
                  form={form}
                  complejos={complejos}
                />
              ) : (
                <View>
                  {canchas.map((item, index) => (
                    <CanchasList
                      key={index}
                      canchas={item}
                      setForm={setForm}
                      navigation={navigation}
                      complejos={complejos}
                    />
                  ))}
                </View>
              )}
            </View>
            <View style={[listComplejosStyles.footer]}>
              <TouchableOpacity onPress={() => setForm(!form)}>
                {form ? (
                  <Icon
                    style={[listComplejosStyles.leftbtn]}
                    type="FontAwesome5"
                    name="chevron-circle-left"
                  />
                ) : (
                  <Icon
                    style={[listComplejosStyles.plusbtn]}
                    type="FontAwesome5"
                    name="plus-circle"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

/*

*/
