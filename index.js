const express = require('express')
const fetch = require('node-fetch')

const app = express();

app.get('/', async (req, res) => {
    let apiURL = req.query.url
    let keys = req.query.keys
    if (!apiURL || !keys) {
        res.sendStatus(400)
        return
    }
    keys = keys.split(".")
    try{
        let resp = await fetch(apiURL)
        let ret = JSON.parse(await resp.text())
        keys.forEach(key => {
            // console.log(ret)
            ret = ret[key]
        });
        res.send(ret)
    } catch(err) {
        console.log(req)
        console.error(err)
        res.sendStatus(500)
    }
});

app.listen(80, () => {
    console.log('server started')
});