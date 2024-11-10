// 0100 1000 0110 1001 0010 0001

const { Buffer } = require('buffer')

const memory = Buffer.alloc(7)
memory[0] = 0x4D
memory[1] = 0x41
memory[2] = 0x4E
memory[3] = 0x5A
memory[4] = 0x49
memory[5] = 0x54
memory[6] = 0x4F

console.log(memory)
console.log(memory.toString('utf-8'))


const buff = Buffer.from([0x48, 0x69, 0x21])
console.log(buff.toString('utf-8'))

const buffTwo = Buffer.from('4D414E5A49544F', 'hex')
console.log(buffTwo.toString('utf-8'))

const buffThree = Buffer.from("MANZITO", 'utf-8')
console.log(buffThree)

const buffFour = Buffer.from('F09F8EB8', 'hex')
console.log(buffFour.toString('utf-8'))