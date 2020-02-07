let response;
console.log("lambda function loaded");

exports.lambdaHandler = async (event, context) => {
    try {
        console.log("lambda function invoked");
        console.log("Raw Event -> "+JSON.stringify(event))
        
        if(event.total){
            console.log("Tax already calculated");
            return event;
        }
        else{
            console.log("Adding 6% sales tax");
            let sales=event.sales;
            let taxRate=0.06;
            let total=sales+(sales*taxRate);
            response = {total: total};
        }
        console.log("lambda function done");

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
