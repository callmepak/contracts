require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/dao/voting.sol/Voting.json")
const contractAddress = "0xe7E80A0E3800f42F558A09c08dF8e26C1131044C"
const votingContract = new web3.eth.Contract(contract.abi, contractAddress)

async function vote(candidateName) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // get latest nonce

    var name = ethers.utils.hexZeroPad(web3.utils.asciiToHex(candidateName), 32)

    const vote = await votingContract.methods.voteForCandidate(name)

    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 1000000,
        data: vote.encodeABI(),
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
}

// choose name from this list:
// 'Rama', 'Nick', 'Jose'
vote('Rama')
