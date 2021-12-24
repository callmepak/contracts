async function main() {
    const YourCollectible = await ethers.getContractFactory("MyNFT")

    // Start deployment, returning a promise that resolves to a contract object
    const yourCollectible = await YourCollectible.deploy()
    console.log("NFT contract deployed to address:", yourCollectible.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
