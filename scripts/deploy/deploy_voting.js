require("dotenv").config()
const API_URL = process.env.API_URL

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

async function main() {
    Voting = await ethers.getContractFactory('Voting');

    const candidateNames = ['Rama', 'Nick', 'Jose'].map(name => ethers.utils.hexZeroPad(web3.utils.asciiToHex(name), 32))

    voting = await Voting.deploy(candidateNames);

    console.log("Voting contract deployed to address:", voting.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
