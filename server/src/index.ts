import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("app is listening on port " + 8080);
})

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
    ws.on("error", () => {
        console.log("Error occured");
    });

    ws.on("message", () => {
        ws.send("hello from ther server");
    })

    ws.on("close", () => {
        console.log("connection closed");
    })
})