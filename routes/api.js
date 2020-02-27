const express = require('express');
const router = express.Router();
const Curso = require("../models/curso");
const Notification = require("../models/notification");
const axios = require("axios");

const fcmKey = "key=AAAA2c1iooI:APA91bFdZKq_aT1zeeBy6q2K-h5QvoDfOEPTQ-Kx_UJ17Qz6OcnjOk2joGd9lsy2SA-Lnqm-xBW_SSTw-1AkvioLlUqNtTZTiwMLfm8npI8qNeyzmj_0YXoFEYOP5YvqqlxPE9-4RFaE";
const fcmUrl = "https://fcm.googleapis.com/fcm/send";

router.get("/cursos", (req, res) => {
    Curso.find()
        .then(cursos => {
            setTimeout(() => {
                res.json(cursos);
            }, 3000);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post("/curso", (req, res) => {
    const curso = new Curso(req.body);
    curso.save();
    res.json("Curso Salvo com sucesso!");
});

router.post("/cursos", (req, res) => {
    console.log("Curso Id", req.body.cursoId);
    Curso.find({_id: req.body.cursoId})
        .then((cursos) => {
            const curso = cursos[0];
            const body = {
                "to": req.body.fcmToken,
                "notification": {
                    "title": "Curso Concluído com Sucesso",
                    "body": "Parabéns, você concluiu o curso " + curso.title + " com sucesso! Enviaremos por e-mail o certificado de conclusão.",
                    "icon": "fcm_push_icon",
                    "sound": "default",
                    "click_action": "FCM_PLUGIN_ACTIVITY"
                },
                "data": {
                    "title": "Curso Concluído com Sucesso",
                    "body": "Parabéns, você concluiu o curso " + curso.title + " com sucesso! Enviaremos por e-mail o certificado de conclusão.",
                }
            };
            const config = {
                headers: {
                    'Authorization': fcmKey,
                    "Content-Type": "application/json"
                }
            };

            const notification = new Notification({fcmToken: req.body.fcmToken, cursoId: req.body.cursoId});
            notification.save();

            axios.post(fcmUrl, body, config)
                .then(() => {
                    res.json("Notificação enviada com sucesso!");
                })
                .catch(axiosErr => {
                    console.log("Axios Error", axiosErr);
                });
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        });
});


module.exports = router;