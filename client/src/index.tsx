import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider, Wallet } from "@aptos-labs/wallet-adapter-react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const wallets = [new PetraWallet()] as readonly Wallet[];

root.render(
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
);

reportWebVitals();
