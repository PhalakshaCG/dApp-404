const withdraw = async (contract, Provider, id, tag, address) => {
    try {
        console.log(`Performing RPC`);
        let nonce = await Provider.eth.getTransactionCount(address);
        console.log(id, tag);
        const _post = contract.methods.withdraw(id, parseInt(tag));
        console.log(_post)
        _post.send({
        from:address,
        gas:10000000,
        nonce
        }).then((res)=>{
            alert("Amount withdrawn");
            console.log(res);
        });
    } catch (error) {
        console.error('Error in transferTokens >', error);
        return false;
    }
};

module.exports = withdraw