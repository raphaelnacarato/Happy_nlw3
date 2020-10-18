import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import api from '../services/api'
import mapMarker from '../images/map-marker.png'

import styles from '../styles/OrphanagesMap'

interface OrphanageItem {
   id: number;
   name: string;
   latitude: number;
   longitude: number;
}


export default function OrphanagesMap() {
   const [orphanages, setOrphanages] = useState<OrphanageItem[]>([])

   const { navigate } = useNavigation()

   useFocusEffect(() => {
      api.get('orphanages').then(res => {
         setOrphanages(res.data)
      })
   })

   function navigationOrphanagesDetails(id: number) {
      navigate('OrphanageDetails', { id })
   }

   function navigateToCreateOrphanage() {
      navigate('SelectMapPosition')
   }

   return (
      <View style={styles.container}>
         <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
               latitude: -23.6477446,
               longitude: - 46.5644216,
               latitudeDelta: 0.008,
               longitudeDelta: 0.008,
            }}
         >
            {orphanages.map(orphanage => {
               return (
                  <Marker
                     key={orphanage.id}
                     icon={mapMarker}
                     calloutAnchor={{
                        x: 2.7,
                        y: 0.9
                     }}
                     coordinate={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude,
                     }}
                  >
                     <Callout tooltip onPress={() => navigationOrphanagesDetails(orphanage.id)}>
                        <View style={styles.calloutContainer}>
                           <Text style={styles.calloutText}>{orphanage.name}</Text>
                        </View>
                     </Callout>

                  </Marker>
               )
            })}
         </MapView>

         <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

            <RectButton style={styles.createOrphanageButton} onPress={navigateToCreateOrphanage}>
               <Feather name='plus' size={20} color='#FFF' />
            </RectButton>
         </View>
      </View>
   );
}
