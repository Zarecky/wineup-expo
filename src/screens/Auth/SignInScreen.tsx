import React, { ReactElement, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from '@expo-google-fonts/merriweather'
import { AppLoading } from 'expo'
import LabeledInput from '../../molecules/LabeledInput'
import { isPhone, isAllowedPassword } from '../../helpers'

function SignInScreen(): ReactElement {
  const [userPhone, getUserPhone] = useState('')
  const [userPassword, getUserPassword] = useState('')

  const [isSignInEnabled, setIsSignInEnabled] = useState(false)
  const buttonOpacity = isSignInEnabled ? 1 : 0.4
  const isValidPassword = isAllowedPassword(userPassword)
  const isValidPhone = isPhone(userPhone)
  const errorMessagePassword =
    'Пароль должен содержать минимум 8 символов, хотя бы 1 букву и 1 цифру'
  const errorMessagePhone = 'Некорректный номер телефона'

  useEffect(() => {
    setIsSignInEnabled(isValidPassword && isValidPhone)
  }, [userPhone, userPassword, isValidPassword, isValidPhone])

  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const onSubmit = () => {
    console.log(userPhone, userPassword)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Вход</Text>
      <LabeledInput
        label='Телефон'
        onChangeText={getUserPhone}
        isValid={isValidPhone}
        errorMessage={errorMessagePhone}
        maxLength={11}
        keyBoardType='numeric'
      />
      <LabeledInput
        label='Пароль'
        onChangeText={getUserPassword}
        secureTextEntry
        isValid={isValidPassword}
        errorMessage={errorMessagePassword}
      />
      <Text
        style={styles.helper}
        onPress={() => Linking.openURL('https://vk.com/asuhovitskiy')}
      >
        Проблемы со входом?
      </Text>
      <TouchableOpacity
        onPress={onSubmit}
        style={[styles.buttonStyle, { opacity: buttonOpacity }]}
        disabled={!isSignInEnabled}
      >
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontFamily: 'Merriweather_700Bold',
    color: '#C23232',
  },
  helper: {
    paddingTop: 38,
    marginRight: 136,
    fontSize: 16,
    color: '#4A7DFF',
    fontFamily: 'Merriweather_400Regular',
  },
  container: {
    paddingTop: 136,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: 320,
    maxHeight: 56,
    backgroundColor: '#C23232',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Merriweather_400Regular',
  },
})