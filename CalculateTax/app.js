let response;

exports.lambdaHandler = async (event, context) => {
    try {
        const sales=event.sales;
        const taxRate=0.06;
        const total=sales+(sales*taxRate);
        response = {total: total};
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
