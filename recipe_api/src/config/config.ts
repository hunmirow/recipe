// your config code
import algosdk from "algosdk";

const algodToken: string = "a".repeat(64);
const server: string = "http://localhost";
const port: string = "4001";

const mnemonic: string = "merit seed mandate soda wide lyrics scout help bus cram until deer victory robot enroll antenna possible hundred faith bread spin speed mixture abstract farm";

export function getClient(): algosdk.Algodv2 {
    let client = new algosdk.Algodv2(algodToken, server, port);
    return client;
}

export function getAccount(): algosdk.Account {
    let account = algosdk.mnemonicToSecretKey(mnemonic);
    return account;
}
