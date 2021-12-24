require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/staking/staking.sol/StakingRewards.json")
const contractAddress = "0x0a89b937ae752b6D0b4A3ef47BBd4c3Ce16f1dD8"
const stakingContract = new web3.eth.Contract(contract.abi, contractAddress)

async function earned() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // get latest nonce

    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 1000000,
        data: stakingContract.methods.earned().encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })

    console.log("receipt", receipt)

}

earned()