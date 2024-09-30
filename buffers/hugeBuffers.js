const {Buffer, constants} = require('buffer')

console.log(constants.MAX_LENGTH)

const hugeBuff = Buffer.alloc(1e9) // 1,000,000,000 (1GB)


setInterval(() => { // Repete o trecho de código a cada 5 segundos
 /*  for(let i = 0; i < hugeBuff.length; i++) {  
    hugeBuff[i] = 0x22
  } */

    hugeBuff.fill(0x22)
}, 5000) 