import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import './shim.js'
import React from 'react';
export default function App() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.getConnection();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  return (
    <View style={styles.container}>
      <Text>Tab One</Text>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
