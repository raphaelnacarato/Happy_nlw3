import React from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import styles from '../styles/components/Header'

interface HeaderProps {
   title: string;
   showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: HeaderProps) {
   const { navigate, goBack } = useNavigation()

   function goBackToAppHomepage() {
      navigate('OrphanagesMap')
   }

   return (
      <View style={styles.container}>
         <BorderlessButton onPress={goBack}>
            <Feather name='arrow-left' size={24} color='#15b6d6' />
         </BorderlessButton>

         <Text style={styles.title}>{title}</Text>

         {showCancel ? (
            <BorderlessButton onPress={goBackToAppHomepage}>
               <Feather name='x' size={24} color='#ff669c' />
            </BorderlessButton>
         ) : (
               <View />
            )}
      </View>
   )
}

