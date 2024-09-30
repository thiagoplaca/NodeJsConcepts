const { Buffer } = require('buffer') 

const memoryContainer = Buffer.alloc(3) // 4 Bytes (32 bits)

memoryContainer[0] = 0x4D;
memoryContainer[1] = 0x39;
memoryContainer.writeInt8(-34, 2)

console.log(memoryContainer)
console.log(memoryContainer[1])
console.log(memoryContainer.readInt8(2))

console.log(memoryContainer.toString('hex'))