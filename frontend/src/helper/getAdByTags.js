import { ownerWallet, adContractAddress as contractAddress, private_key } from '../utils/constants'
const rpcCallForTransaction = async ( contract, tags) => {
    try {
      console.log(`Performing Ad RPC`);
      let ad = await contract.methods.getRandAdByTag(tags).call();
      return ad;
    } catch (error) {
      console.error('Error in transferTokens >', error);
      return false;
    }
  };

const getAdByTag = async (Contract, tags, limit) => {
         
    tags = [0,1,2]
    return await rpcCallForTransaction(Contract, tags);
}

export default getAdByTag;