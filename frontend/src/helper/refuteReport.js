const refuteReport = async (contract, Provider, id, address) => {
    try {
        console.log(`Performing RPC`);
        let nonce = await Provider.eth.getTransactionCount(address);
        console.log(nonce);
        const _post = contract.methods.refuteReport(id);
        _post.send({
        from:address,
        gas:10000000,
        nonce
        }).then((res)=>{
            alert("Report refuted");
            console.log(res);
        });
    } catch (error) {
        console.error('Error in transferTokens >', error);
        return false;
    }
};

module.exports = refuteReport