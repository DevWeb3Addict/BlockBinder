require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

async function getBalance(address) {
  const balanceWei = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balanceWei, 'ether');
}

async function sendEther(fromAddress, privateKey, toAddress, amountInEther) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  const tx = {
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei(amountInEther, 'ether'),
    gas: 2000000,
  };
  const receipt = await web3.eth.sendTransaction(tx);
  return receipt.transactionHash;
}

async function main() {
  const myAddress = process.env.MY_ADDRESS;
  const balance = await getBalance(myAddress);
  console.log(`Balance for ${myAddress} is ${balance} ETH`);

  // Example of Ether transfer operation (Left as a comment for security reasons)
  // const receipt = await sendEther(myAddress, process.env.PRIVATE_KEY, '0xRecipientAddress', '0.01');
  // console.log(`Transaction hash: ${receipt}`);
}

main().catch(console.error);
