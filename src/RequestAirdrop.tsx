import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const {connection} = useConnection();
    const wallet = useWallet();

    async function requestAirdrop() {
        if (!wallet.publicKey || !connection) {
            alert("Please connect your wallet first!");
            return;
        }

     const amount = 1; // 1 SOL
        try {
         await connection.requestAirdrop(wallet.publicKey, amount* LAMPORTS_PER_SOL);

            alert("Airdrop successful!");
        } catch (error) {
            console.error(error);
            alert("Airdrop failed!");
        }
    }
    return (
        <div>
            <br/><br/>
            <input type="text" placeholder="Amount" />
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}