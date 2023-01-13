import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

// verbindet das Backend mit der Datenbank von mongo
export function connect(){ 
    mongoose.connection.on("connecting", () => console.log("[DB] connecting"));
    mongoose.connection.on("connected", () => console.log("[DB] connected"));
    mongoose.connection.on("disconnecting", () =>console.log("[DB] disconnecting"));
    mongoose.connection.on("disconnected", () =>console.log("[DB] disconnected"));
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
app.get("",async (req,res)=>{
        res.send("Server has Responded") 
})


//ToDos: SCHEMA Erstellen
        // Endpunkte definieren
        //Frontend Requests schreiben



//app.listen(startet den Server)
app.listen(9000,()=>{
    console.log("Server listening to 9000");
})