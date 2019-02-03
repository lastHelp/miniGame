const user = "mute";
const pass = "17mute17";
const dbName = "minigame";

module.exports = {
    dbName,
    url:`mongodb://${user}:${pass}@ds243931.mlab.com:43931/${dbName}`
}

