const os = require('os');
const ifaces = os.networkInterfaces();

function getIPs() {
    return Object.keys(ifaces).reduce(function (res,ifname) {

        const ii = ifaces[ifname].map(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            // this interface has only one ipv4 adress
            return iface.address;

        }).filter(x=>x);
        if (ii.length) {
            res[ifname] =ii;
        }
        return res;
    },{});
}

module.exports = {
    getIPs
};