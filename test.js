const { deepStrictEqual, ok } = require('assert')

const database = require('./database')
const DEFAULT_OBJECT_RECORD = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}

describe('Suite de manipulação de Heróis', () => {

    before(async () => {
        await database.register(DEFAULT_OBJECT_RECORD)
    })

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_OBJECT_RECORD
        const [result] = await database.listar(expected.id)

        deepStrictEqual(result, expected)
    })

    it('deve cadastrar um herói, usando arquivos', async () => {

        const expected = DEFAULT_OBJECT_RECORD
        const result = await database.register(DEFAULT_OBJECT_RECORD)
        const [current] = await database.listar(DEFAULT_OBJECT_RECORD.id)
        deepStrictEqual(current, expected)
    })

    it('')

})