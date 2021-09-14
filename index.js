const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')

async function main() {

    Commander
    .version('v1')
    .option('-n, --name [value]', "Hero's Name")
    .option('-p, --power [value]', "Hero's Power")
    .option('-i, --id [value]', "Hero's Id")

    .option('-c, --register', "Register a Hero")
    .option('-l, --listar', "Listar a Hero")
    .option('-r, --remove', "Remove a hero for id")
    .option('-u, --update [value]', "Update a hero for id")
    .parse(process.argv)

    const hero = new Hero(Commander._optionValues)

    try {

        if(Commander._optionValues.register) {
            delete hero.id
            const result = await Database.register(hero)
            if(!result) {
                console.error('Herói não foi cadastrado!')
                return
            }

            console.log('Herói cadastrado com sucesso!')
        }

        if (Commander._optionValues.listar) {
            const result = await Database.listar()
            console.log(result)
            return
        }

        if(Commander._optionValues.remove) {

            const result = await Database.remove(hero.id)

            if(!result) {
                console.error('Não foi possível remover o herói')
                return
            }

            console.log('Herói removido com sucesso!')

        }

        if(Commander._optionValues.update) {
            const idForUpdate = parseInt(Commander._optionValues.update)
            const data = JSON.stringify(hero)
            const updateHero = JSON.parse(data)
            const result = await Database.update(idForUpdate, updateHero)

            if(!result) {
                console.error('Não foi possível atualizar o herói')
                return
            }
            console.log('Herói Atualizado com sucesso')

        }
        
    } catch (error) {
        console.error('DEU RUIM ', error)
    }
}

main()