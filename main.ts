import express, { Express } from "express"
import { Anketa, anketas, load, save } from "./data"
import { v4 } from "uuid"

const server: Express = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/anketa', (req, res) => {
    res
        .status(200)
        .send(anketas)
})
server.get('/anketa/:id', (req, res) => {
    const anketa = anketas.find(anketa => anketa.id == req.params.id)

    if (!anketa) {
        return res
            .status(404)
            .send("not found")
    }
    res
        .status(200)
        .send(anketas)
})
server.post('/anketa', (req, res) => {
    const newAnketa: Anketa = {
        id: v4(),
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        target: req.body.target
    }
    anketas.push(newAnketa)
    save()
    res
        .status(200)
        .send(anketas)
})
server.put('anketa/:id', (req, res) => {
    const index = anketas.findIndex(anketa => anketa.id === req.params.id)

    if (index == -1) {
        return res
            .status(200)
            .send('anketa not found')
    }
    const newAnketa: Anketa = {
        id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        target: req.body.target

    }
    anketas[index] = newAnketa
    save()
    res
        .status(200)
        .send('anketa update')
})

server.delete('/anketa/:id', (req, res) => {
    const index = anketas.findIndex(anketa => anketa.id == req.params.id)
    if (index == -1) {
        return res
            .status(404)
            .send('anketa not found')
    }
    anketas.splice(index, 1)
    save()
    res
        .status(200)
        .send('Anketa has deleted')
})

server.listen(3030, () => {
    load()
    console.log('Server is running on port: 3030');

})