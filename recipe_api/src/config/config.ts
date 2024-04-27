// your config code
import algosdk from "algosdk";

const algodToken: string = "a".repeat(64);
const server: string = "http://localhost";
const port: string = "4001";

const mnemonic: string = "cycle judge beef gesture carry library sauce steel dog zoo mango eternal taxi obtain bring talent gauge custom monitor lonely law morning rack absorb favorite";

export function getClient(): algosdk.Algodv2 {
    let client = new algosdk.Algodv2(algodToken, server, port);
    return client;
}

export function getAccount(): algosdk.Account {
    let account = algosdk.mnemonicToSecretKey(mnemonic);
    return account;
}
