const { startLoading, stopLoading } = require("./loader");

const confirmReport = async (contract, Provider, id, address) => {
    try {
        console.log(`Performing RPC`);
        startLoading();
        let nonce = await Provider.eth.getTransactionCount(address);
        console.log(id);
        const _post = contract.methods.confirmReport(id);
        console.log(_post)
        _post.send({
        from:address,
        gas:10000000,
        nonce
        }).then((res)=>{
            alert("Report confirmed");
            console.log(res);
            stopLoading();
        });
    } catch (error) {
        console.error('Error in transferTokens >', error);
        stopLoading();
        return false;
    }
};

export default confirmReport