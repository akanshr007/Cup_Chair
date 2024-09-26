import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

import {
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-sdk";

import cogoToast from "cogo-toast";

let walletAddress = "";
let balanceWallet = 0;
let walletName = "";
let GdltBlockNft = null;
const preferredNetwork = "mainnet";
const options = {
  name: "Cupchairs",
  iconUrl: "https://stage-cupchair.s3.amazonaws.com/nft_images/ea16c2b1-540d-4287-8314-e7c30aaa81a8.svg",
  preferredNetwork: preferredNetwork,
  eventHandlers: {
    [BeaconEvent.PAIR_INIT]: {
      // Every BeaconEvent can be overriden by passing a handler here.
      // The default will not be executed anymore. To keep the default,
      // you will have to call it again.
      handler: async (data) => {
        // If you want to attach your own "on alert closed" handler
        // eslint-disable-next-line @typescript-eslint/unbound-method
        // console.log("getExtensionList",getExtensionList())
        // console.log("getiOSList",getiOSList())
        const oldHandler = data.abortedHandler;
        // setDesktopList([]);
        // const extension = getExtensionList();
        // console.log("inside INIT extension LIST", extension);

        // const Iosextension =getiOSList();
        // console.log("Ios extension  LIST", Iosextension);
        // const newExtension = extension.filter(
        //   (extension) => extension.key === "temple_chrome"
        // );

        // setExtensionList([...newExtension]);
        const newHandler = () => {
          if (oldHandler) {
            // Make sure to call the internal abortedHandler
            oldHandler();
          }
          // Add your own logic here
          //  dltBlockNft();
          if (window.location.pathname != '/wallet') {
            GdltBlockNft();
          }
          return;
        };
        data.abortedHandler = newHandler; // Replace the internal abortedHandler with the new one
        await defaultEventCallbacks.PAIR_INIT(data); // Add this if you want to keep the default behaviour.
      },
    },
    [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: {
      handler: async (data) => {
        walletName = data.walletInfo.name;
      },
    },
  },
};


const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
// const Tezos = new TezosToolkit("https://rpc.ghostnet.teztnets.com/");
const wallet = new BeaconWallet(options);
console.log(wallet,"jeiwfjei11111", Tezos)
Tezos.setWalletProvider(wallet);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};
// const location = useLocation();

// wallet.client.subscribeToEvent(BeaconEvent.PAIR_SUCCESS, (data) => {
//   console.log(`${BeaconEvent.PAIR_SUCCESS} triggered: `, data);
// });

const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  walletAddress = account.address;

  try {
    const balance = await Tezos.tz.getBalance(walletAddress);
    console.log(`${balance.toNumber() / 1000000} ꜩ`,"balancetezos");
    const stdBalance = balance.toNumber() / 1000000;
    console.log("stdBalance", stdBalance);
    // localStorage.setItem("stdBalance",stdBalance)
    return { success: true, wallet: account.address, stdBalance: stdBalance };
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};


// const connectWallet = async () => {
//   let account = await wallet.client.getActiveAccount();
//   console.log(account,"jeiwfjei")
//   try {
//     if (!account) {
//       console.log("jeiwfjei22222")
//       const res = await wallet.requestPermissions({
//         network: { type: preferredNetwork },
//       });
//       // account = await wallet.client.getActiveAccount();
//       console.log(res,account,"jeiwfjei333333")
//     }
//     walletAddress = account.address;
//     // accountId=account.origin.id;
//     // const Iosextension =getiOSList();
//     // // const newId=Iosextension.filter(
//     // //   (extension) => extension.id === accountId
//     // // );

//     // console.log(Iosextension,"extensionid")
//     // console.log(account,"id")
//   }

//   catch (error) {
//     if (window.location.pathname != '/wallet') {
//       GdltBlockNft();
//     }
//   }
//   try {
//     const balance = await Tezos.tz.getBalance(walletAddress);
//     const stdBalance = balance.toNumber() / 1000000;
//     balanceWallet = balance.toNumber() / 1000000;
//     // localStorage.setItem("stdBalance",stdBalance)
//     return { success: true, wallet: account.address, stdBalance: stdBalance, };
//   } catch (error) {
//     console.log(JSON.stringify(error));
//   }
// };


const getWalletBalance = async () => {
  let account = await wallet.client.getActiveAccount();
  if (account != undefined) {
    walletAddress = account.address;
    const balance = await Tezos.tz.getBalance(walletAddress);
    const stdBalance = balance.toNumber() / 1000000;
    // console.log("stdBalance", stdBalance);
    return { success: true, wallet: account.address, stdBalance: stdBalance };
  }
  else {

    return { success: true, wallet: 0, stdBalance: 0 };
  }

};

const disconnectWallet = async () => {
  window.location.reload();
  // localStorage.removeItem("stdBalance");
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {

  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
const sendTransaction = async (toAddress, amount, dltBlockNft) => {

  GdltBlockNft = dltBlockNft;
  let transactionComp = false;
  await wallet.clearActiveAccount();
  await connectWallet().then(async (res) => {
    if (balanceWallet < amount) {
      GdltBlockNft();
      cogoToast.error("Insuffient Balance");
    }
    else {
      await Tezos.wallet
        .transfer({ to: toAddress, amount: amount })
        .send()
        .then((op) => {
          console.log(`Waiting for ${op.opHash} to be confirmed...`);

        })
        .then((hash) => {

          console.log(`Operation injected: https://jakarta.tzstats.com/${hash}`);
          transactionComp = true;
        })

        .catch((error) => {
          if (window.location.pathname != '/wallet') {
            GdltBlockNft();
          }
          console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`);
        }
        );
    }
  });
  return transactionComp
    ? { fromAddress: walletAddress, toAddress, amount, name: walletName }
    : null;
};

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
  sendTransaction,
  getWalletBalance
};



// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { TezosToolkit } from "@taquito/taquito";
// import {
//   BeaconEvent,
//   defaultEventCallbacks,
// } from "@airgap/beacon-sdk";
// import cogoToast from "cogo-toast";

// let walletAddress = "";
// let balanceWallet = 0;
// let walletName = "";
// let GdltBlockNft = null;
// const preferredNetwork = "testnet";
// const options = {
//   name: "Cupchairs",
//   iconUrl: "https://stage-cupchair.s3.amazonaws.com/nft_images/ea16c2b1-540d-4287-8314-e7c30aaa81a8.svg",
//   preferredNetwork: preferredNetwork,
//   eventHandlers: {
//     [BeaconEvent.PAIR_INIT]: {
//       handler: async (data) => {
//         const oldHandler = data.abortedHandler;
//         const newHandler = () => {
//           if (oldHandler) {
//             oldHandler();
//           }
//           if (window.location.pathname !== '/wallet') {
//             GdltBlockNft();
//           }
//         };
//         data.abortedHandler = newHandler;
//         await defaultEventCallbacks.PAIR_INIT(data);
//       },
//     },
//     [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: {
//       handler: async (data) => {
//         walletName = data.walletInfo.name;
//       },
//     },
//   },
// };

// const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");
// const wallet = new BeaconWallet(options);
// console.log(Tezos,"jiurjjru55555555555")
// console.log(wallet,"jiurjjru")
// Tezos.setWalletProvider(wallet);

// const getActiveAccount = async () => {
//   return await wallet.client.getActiveAccount();
// };

// const connectWallet = async () => {
//   let account = await wallet.client.getActiveAccount();
//   try {
//     if (!account) {
//       const res = await wallet.requestPermissions({
//         network: { type: preferredNetwork },
//       });
//       console.log(res,"jiurjjru11111")
//       account = await wallet.client.getActiveAccount();
//     }
//     walletAddress = account.address;
//   } catch (error) {
//     console.error('Error during wallet connection:', error);
//     if (window.location.pathname !== '/wallet') {
//       GdltBlockNft();
//     }
//   }
//   try {
//     const balance = await Tezos.tz.getBalance(walletAddress);
//     const stdBalance = balance.toNumber() / 1000000;
//     balanceWallet = stdBalance;
//     return { success: true, wallet: walletAddress, stdBalance: stdBalance };
//   } catch (error) {
//     console.error('Error fetching wallet balance:', error);
//   }
// };

// const getWalletBalance = async () => {
//   let account = await wallet.client.getActiveAccount();
//   if (account) {
//     walletAddress = account.address;
//     const balance = await Tezos.tz.getBalance(walletAddress);
//     const stdBalance = balance.toNumber() / 1000000;
//     return { success: true, wallet: walletAddress, stdBalance: stdBalance };
//   } else {
//     return { success: true, wallet: 0, stdBalance: 0 };
//   }
// };

// const disconnectWallet = async () => {
//   window.location.reload();
//   await wallet.disconnect();
//   return { success: true, wallet: null };
// };

// const checkIfWalletConnected = async () => {
//   try {
//     const activeAccount = await wallet.client.getActiveAccount();
//     if (!activeAccount) {
//       await wallet.client.requestPermissions({
//         type: { network: preferredNetwork },
//       });
//     }
//     return { success: true };
//   } catch (error) {
//     return { success: false, error };
//   }
// };

// const sendTransaction = async (toAddress, amount, dltBlockNft) => {
//   GdltBlockNft = dltBlockNft;
//   let transactionComp = false;
//   await wallet.clearActiveAccount();
//   await connectWallet().then(async (res) => {
//     if (balanceWallet < amount) {
//       GdltBlockNft();
//       cogoToast.error("Insufficient Balance");
//     } else {
//       try {
//         const op = await Tezos.wallet.transfer({ to: toAddress, amount: amount }).send();
//         console.log(`Waiting for ${op.opHash} to be confirmed...`);
//         await op.confirmation();
//         console.log(`Operation injected: https://jakarta.tzstats.com/${op.opHash}`);
//         transactionComp = true;
//       } catch (error) {
//         console.error('Transaction error:', error);
//         if (window.location.pathname !== '/wallet') {
//           GdltBlockNft();
//         }
//       }
//     }
//   });
//   return transactionComp ? { fromAddress: walletAddress, toAddress, amount, name: walletName } : null;
// };

// export {
//   connectWallet,
//   disconnectWallet,
//   getActiveAccount,
//   checkIfWalletConnected,
//   sendTransaction,
//   getWalletBalance
// };
