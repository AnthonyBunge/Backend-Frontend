import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import User from "./Userschema.js"
import Todos from "./TodoSchema.js"

// verbindet das Backend mit der Datenbank von mongo
export function connect() {
    mongoose.connection.on("connecting", () => console.log("[DB] connecting"));
    mongoose.connection.on("connected", () => console.log("[DB] connected"));
    mongoose.connection.on("disconnecting", () => console.log("[DB] disconnecting"));
    mongoose.connection.on("disconnected", () => console.log("[DB] disconnected"));
    mongoose.connection.on("reconnected", () => console.log("[DB] reconnected"));
    mongoose.connection.on("error", (er) => console.log("[DB] error", er));

    mongoose.connect(process.env.CONNECTIONSTRING);
}

// dotenv wird konfiguriert (persönliche(sensible) daten werden in .env gespeichert und nicht zu GitHub synchronisiert)
dotenv.config();
// Express app wird gestartet (Backend helper)
const app = express()
// cors erlaubt die Sicherheitsausnahm damit browser und backend miteinander kommunizieren können
app.use(cors());
// helfer damit json und Javascript automatisch übersetzt werden
app.use(express.json());
// ruft die funktion connect auf
connect();
// .get n. (server antwortet auf die get request (n.))
app.get("", async (req, res) => {
    res.send("Server has Responded")

})
// Es wird geguckt ob Username + Passwort richtig sind -> Einloggen     
app.post("/Login", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log(user);
        if (user.password == req.body.password) (
            res.send(user)
        )
        else { res.send("Inkorrekte Einloggdaten!") }
    } catch (error) {
        next({ status: 400, message: error.message })
    }

})
// Es wird ein neuer User angelegt
app.post("/CreateUser", async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        next({ status: 400, message: error.message })
    }
})

app.get("/gettodos", async (req, res, next) => {
    try {
        const todos = await Todos.find()
        res.send(todos)
    } catch (error) {
        next({ status: 400, message: error.message })
    }
})

app.post("/CreateTodos", async (req, res, next) => {
    try{
        const todos = await Todos.create(req.body)
        res.send(todos)
    } catch (error) {
        next({status: 400, meassage: error.message})

    }

})
//ToDos: SCHEMA Erstellen
// Endpunkte definieren
//Frontend Requests schreiben


// comment global error handler 
app.use((error, req, res, next) => {
    console.log("globalError", error)
    res.status(error.status).send({ error: error.message })
})
//app.listen(startet den Server)
app.listen(9000, () => {
    console.log("Server listening to 9000");
})