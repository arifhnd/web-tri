const main = async () => {
    /**
     * Untuk mendeploy smart contract, kita memerlukan wallet address
     * Hardhat sudah dengan otomatis melakukan ini secara background
     * nah variable dibawah ini menampung alamat wallet dari owner contract yang kita deploy
     * untuk variable randomPerson, ini menampung alamat wallet random
     */
    const [owner, randomPerson] = await hre.ethers.getSigners();
    /**
     * hardhat will compile our contract and generate the necessary files
     * we need to do work with our contract under the artifacts folder
     * HRE is stand for Hardhat runtime environtment
     * kenapa hre nya ga diimpor? karena hardhat akan menjalankan import hre pada saat script dijalankan
     */
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    /** 
     * What's happening here is Hardhat will create a local Ethereum network for us, 
     * but just for this contract. Then, after the script completes it'll destroy that local network. 
     * So, every time you run the contract, it'll be a fresh blockchain. What's the point? 
     * It's kinda like refreshing your local server every time so you always 
     * start from a clean slate which makes it easy to debug errors.
    */
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log(`Deployed WavePortal at ${waveContract.address}`);
    console.log(`This smart contract deployed by : ${owner.address}`);

    let waveCount;
    let waveMessage;
    waveCount = await waveContract.getTotalWaves();

    /**
     * Menjalankan fungsi wave dari contract yang telah kita buat
     * fungsi ini dijalankan dengan alamat wallet owner
     */
    let waveTxn = await waveContract.wave("Waving from owner");
    await waveTxn.wait();
    waveMessage = await waveContract.getMessage();

    /**
     * coba menjalankan fungsi wave dengan alamat wallet random
     */
    waveTxn = await waveContract.connect(randomPerson).wave("Waving from random person");
    await waveTxn.wait();
    waveMessage = await waveContract.getMessage();

    waveCount = await waveContract.getTotalWaves();
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

runMain();