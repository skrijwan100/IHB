import hre from "hardhat"
async function main(){
    const Touristcontract= await hre.ethers.getContractFactory("AllTourist")
    const d_Touristcontract= await Touristcontract.deploy();
    await d_Touristcontract.waitForDeployment();
    console.log("AllTourist contract in deopoly address: ",await d_Touristcontract.getAddress())

}

main().then(()=> process.exit(0)).catch((error)=>{
console.log(error)
 process.exit(1)
})