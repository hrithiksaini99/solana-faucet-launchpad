import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { RequestAirdrop } from './RequestAirdrop';  
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'

const network = WalletAdapterNetwork.Devnet;

function App() {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <RequestAirdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
