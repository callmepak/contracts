async function main() {
    const Staker = await ethers.getContractFactory("StakingRewards")

    const PhotonTokenAddress = "0x00819E780C6e96c50Ed70eFFf5B73569c15d0bd7"

    // Start deployment, returning a promise that resolves to a contract object
    const staker = await Staker.deploy(PhotonTokenAddress, PhotonTokenAddress)
    console.log("Staking contract deployed to address:", staker.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
