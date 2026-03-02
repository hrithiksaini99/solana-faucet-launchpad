import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

export function RequestAirdrop() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState<number | null>(null);

    // Function to fetch balance
    async function getMyBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }
    }

    // Fetch balance on mount and when wallet changes
    useEffect(() => {
        getMyBalance();
    }, [wallet.publicKey, connection]);

    async function requestAirdrop() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            const amountInLamports = Number(amount) * LAMPORTS_PER_SOL;
            await connection.requestAirdrop(wallet.publicKey, amountInLamports);
            alert("Airdrop successful!");
            
            // Re-fetch balance after airdrop!
            getMyBalance(); 
        } catch (error) {
            console.error(error);
            alert("Airdrop failed!");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
            {wallet.publicKey && (
                <p>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
            )}
            <input 
                type="text" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}
