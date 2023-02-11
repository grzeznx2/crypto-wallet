import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import {generateMnemonic, mnemonicToEntropy} from 'ethereum-cryptography/bip39'
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english"
import { HDKey } from "ethereum-cryptography/hdkey"

export type Mnemonic = string
export type Entropy = Uint8Array

function App() {

  const createMnemonic = (strength: number)=>{
    const mnemonic = generateMnemonic(wordlist, strength)
    const entropy = mnemonicToEntropy(mnemonic, wordlist)
    return {mnemonic, entropy}
  }

  const createHDRootKey = (entropy: Entropy) => {
    return HDKey.fromMasterSeed(entropy)
  }

  useEffect(()=>{
    const {mnemonic, entropy} = createMnemonic(256)
    const hdRootKey = createHDRootKey(entropy)
    console.log(mnemonic)
    console.log(entropy)
    console.log(hdRootKey)
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
