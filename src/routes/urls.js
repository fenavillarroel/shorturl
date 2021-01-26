const { nanoid } = require("nanoid");
const os = require("os");
const Urls = require("../models/urls");
const { check, validationResult } = require('express-validator');

const express = require("express");
//const { application } = require("express");
//const { route } = require("../app");
const router = express.Router();
//const domain = os.hostname() + ':' + 8000
const domain = "localhost:" + 8000
//const domain = process.env.DOMAIN
console.log(domain);

router.get("/", async (req,res,next) => {

    const { url } = req.body
    const reg = await Urls.findOne({shortUrl:url});
    if (!reg) res.status(404).json({"Error":"URL No Encontrada"});

    res.status(200).json({"URL Origina": reg.longUrl});
});

router.post("/",[check("url").isURL()], async (req,res,next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { url } = req.body
    const ok = await Urls.findOne({longUrl:url});
    if (ok) {
        res.status(200).json({"error":"URL ya existe"})
    }
    const id = nanoid(7);
    const shortUrl = domain + "/" + id;
    const idUrl = new Urls({
        longUrl: url,
        shortUrl: shortUrl,
        id:id
    })
    await idUrl.save();
    console.log(shortUrl);
    res.status(200).json({"shortURL":shortUrl});
});

router.delete("/", async (req,res,next) => {

    const { url } = req.body
    const reg = await Urls.remove({shortUrl:url});
    if (!reg) res.status(404).json({"Error":"URL No Encontrada no se puede Borrar!!!"});
    
    res.status(200).json({"URL Eliminada": url});
});

router.delete("/:id", async (req,res,next) => {

    const id = req.params.id
    const reg = await Urls.remove({id:id});
    if (!reg) res.status(404).json({"Error":"Id No Encontrado no se puede Borrar!!!"});
    
    res.status(200).json({"URL Eliminada": reg.shortURL});
});

router.get("/stats/:id", async (req,res,next) => {

    const id = req.params.id
    const reg = await Urls.findOne({id:id});
    if (!reg) res.status(404).json({"Error":"Id No Encontrado....!!!"});
    
    res.status(200).json({"Stats": reg});
});

module.exports = router;
