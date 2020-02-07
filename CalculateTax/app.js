let response;
console.log("lambda function loaded");

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("lambda function invoked");

        const sales=event.sales;
        const taxRate=0.06;
        const total=sales+(sales*taxRate);
        response = {total: total};
        console.log("lambda function done");

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
