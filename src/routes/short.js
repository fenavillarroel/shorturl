const Urls = require("../models/urls");
const moment = require("moment");

const express = require("express");
const router = express.Router();

router.get("/:id", async (req,res,next) => {


    
    const id = req.params.id;
    const reg = await Urls.findOne({id:id});
    if (!reg) res.status(404).json({"Error":"URL No Encontrada "});

    reg.visits+=1;
    const ip = req.ip;
    //console.log(ip);
    let myDate = new Date();
    fecha = moment(myDate).format("YYYY-MM-DD HH:mm:ss");
    reg.from.push({ip:ip,date: fecha})
    await reg.save();

    res.redirect(reg.longUrl);
    


});

module.exports = router;
