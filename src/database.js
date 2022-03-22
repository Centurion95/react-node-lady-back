const mongoose = require('mongoose')

//rc95 21/02/2022 22:13 - asi conectamos a la base de datos. Si no existe, mongo la crea!!
URI = ('mongodb://localhost/mern_db')

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
    .then(db => console.log('base de de datos conectada..'))
    .catch(error => console.log(error))

module.exports = mongoose