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
                console.error('Hero has not been registered!')
                return
            }

            console.log('Hero registered successfully!')
        }

        if (Commander._optionValues.listar) {
            const result = await Database.listar()
            console.log(result)
            return
        }

        if(Commander._optionValues.remove) {

            const result = await Database.remove(hero.id)

            if(!result) {
                console.error('Unable to remove hero')
                return
            }

            console.log('Hero successfully removed!')

        }

        if(Commander._optionValues.update) {
            const idForUpdate = parseInt(Commander._optionValues.update)
            const data = JSON.stringify(hero)
            const updateHero = JSON.parse(data)
            const result = await Database.update(idForUpdate, updateHero)

            if(!result) {
                console.error('Unable to update hero')
                return
            }
            console.log('Hero successfully updated')

        }
        
    } catch (error) {
        console.error('it was bad', error)
    }
}

main()