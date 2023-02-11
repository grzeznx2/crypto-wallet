import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import {generateMnemonic, mnemonicToEntropy} from 'ethereum-cryptography/bip39'
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english"
import { HDKey } from "ethereum-cryptography/hdkey"
import { getPublicKey } from "ethereum-cryptography/secp256k1"
import  { keccak256 } from "ethereum-cryptography/keccak"

export type Mnemonic = string
export type Entropy = Uint8Array
export type PrivateKey = Uint8Array
export type PublicKey = Uint8Array

function App() {

  const createMnemonic = (strength: number)=>{
    const mnemonic = generateMnemonic(wordlist, strength)
    const entropy = mnemonicToEntropy(mnemonic, wordlist)
    return {mnemonic, entropy}
  }

  const createHDRootKey = (entropy: Entropy) => {
    return HDKey.fromMasterSeed(entropy)
  }

  const createPrivateKey = (hdRootKey: HDKey, accountIndex: number) => {
    return hdRootKey.deriveChild(accountIndex).privateKey
  }

  const createPublicKey = (privateKey: PrivateKey) => {
    return getPublicKey(privateKey)
  }

  const createAddress = (publicKey: PublicKey) => {
    return keccak256(publicKey).slice(-20)
  }

  useEffect(()=>{
    const {mnemonic, entropy} = createMnemonic(256)
    const hdRootKey = createHDRootKey(entropy)
    const account0PrivateKey = createPrivateKey(hdRootKey, 0)
    console.log(mnemonic)
    console.log(entropy)
    console.log(hdRootKey)
    console.log(account0PrivateKey)
    if(account0PrivateKey){
      const account0PublicKey = createPublicKey(account0PrivateKey)
      const account0Address = createAddress(account0PublicKey)
      console.log(account0PublicKey)
      console.log(account0Address)
    }
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
