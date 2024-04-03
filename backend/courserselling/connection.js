const mongoose = require ("mongoose")

async function connectiondb(url){
    await mongoose.connect(url);
}

module.exports = connectiondb;
