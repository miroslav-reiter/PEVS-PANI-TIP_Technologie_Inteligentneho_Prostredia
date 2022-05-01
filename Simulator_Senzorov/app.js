const uuid = require('uuid');
const mqtt = require('mqtt')

var express = require("express");
var app = express();
var delay = 0.1;

var tempUUID = uuid.v4();
var humUUID = uuid.v4();
var luminUUID = uuid.v4();

app.get("/temp", (req, res, next) => {
    // Chcem získať čas z dátumu
    var time = new Date().getHours();
    // Prípad, keď je deň
    if (time > 5 && time < 20) {
        // Vygeneruj náhodnú hodnotu medzi 18 a 21
        var temp = Math.floor(Math.random() * (21 - 18 + 1)) + 18;
        var datetime = new Date().toISOString();
        // Formát dátumu a času na YYYY-MM-DDTHH:mm:ss.sssZ
        datetime = datetime.replace(/T/, ' ').replace(/\..+/, '');
        // Vytvor json
        var json = {'deviceId': tempUUID, 'sensor': 'temperature', 'value': temp, 'date': timestamp};
        // Posli json
        res.send(json);
    }
    else{
    // Prípad, keď je noc

        // Vygeneruj náhodnú hodnotu medzi 21 a 24
        var temp = Math.floor(Math.random() * (24 - 21 + 1)) + 21;
        // Vytvor json
        var json = {'deviceId': tempUUID, 'sensor': 'temperature', 'value': temp, 'date': new Date().getTime()};
        // Posli json
        res.send(json);
    }
    
});
app.get("/hum", (req, res, next) => {
    // Chcem získať čas z dátumu
    var time = new Date().getHours();
    // Prípad, keď je deň
    if (time > 5 && time < 20) {
        // Vygeneruj náhodnú hodnotu medzi 40 aand 50
        var humidity = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
        var datetime = new Date().toISOString();
        // Formát dátumu a času na YYYY-MM-DDTHH:mm:ss.sssZ
        datetime = datetime.replace(/T/, ' ').replace(/\..+/, '');
        // Vytvor json
        var json = {'deviceId': humUUID, 'sensor': 'humidity', 'value': humidity, 'date': timestamp};
        // Posli json
        res.send(json);
    }
    else{
        // Prípad, keď je noc

        // Vygeneruj náhodnú hodnotu medzi 50 a 60
        var humidity = Math.floor(Math.random() * (60 - 50 + 1)) + 50;
        // Vytvor json
        var json = {'deviceId': humUUID, 'sensor': 'humidity', 'value': humidity, 'date': new Date().getTime()};
        // Posli json
        res.send(json);
    }
});
app.get("/lumin", (req, res, next) => {
    // Chcem získať čas z dátumu
    var time = new Date().getHours();
    // Prípad, keď je deň
    if (time > 5 && time < 20) {
        // Vygeneruj náhodnú hodnotu medzi 500 a 600
        var luminosity = Math.floor(Math.random() * (350 + 1));
        var datetime = new Date().toISOString();
        // Formát dátumu a času na YYYY-MM-DDTHH:mm:ss.sssZ
        datetime = datetime.replace(/T/, ' ').replace(/\..+/, '');
        // Vytvor json
        var json = {'deviceId': luminUUID, 'sensor': 'luminosity', 'value': luminosity, 'date': timestamp};
        // Posli json
        res.send(json);
    }
    else{
        // Prípad, keď je noc

        // Vygeneruj náhodnú hodnotu medzi 600 a 700
        var luminosity = Math.floor(Math.random() * (700 - 350 + 1)) + 350;
        // Vytvor json
        var json = {'deviceId': luminUUID, 'sensor': 'luminosity', 'value': luminosity, 'date': new Date().getTime()};
        // Posli json
        res.send(json);
    }
});

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds * 1000;
    while(new Date().getTime() < waitUntil){}
}

function publish() {
    setInterval(function(){
        var temp = 0;
        var hum = 0;
        var lumin = 0;
        var time = new Date().getHours();

        if (time > 5 && time < 20) {    // ak je deň
            temp = Math.floor(Math.random() * (21 - 18 + 1)) + 18;
            hum = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
            lumin = Math.floor(Math.random() * (350 + 1));
        }
        else {                          // ak je noc
            temp = Math.floor(Math.random() * (24 - 21 + 1)) + 21;
            hum = Math.floor(Math.random() * (60 - 50 + 1)) + 50;
            lumin = Math.floor(Math.random() * (700 - 350 + 1)) + 350;
        }
        
        var tempMsg = {'deviceId': tempUUID, 'sensor': 'temperature', 'value': temp, 'date': new Date().getTime()};
        var humMsg = {'deviceId': humUUID, 'sensor': 'humidity', 'value': hum, 'date': new Date().getTime()};
        var luminMsg = {'deviceId': luminUUID, 'sensor': 'luminosity', 'value': lumin, 'date': new Date().getTime()};
		
		// Prečítaj json súbor z outputs/temp.json
        fs.readFile('outputs/temp.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            }
            else{
                obj = JSON.parse(data); // Parsovanie na objekt
                obj.push(tempMsg); // Pridáme ďalšie údaje
                json = JSON.stringify(obj); // Skonvertuj ho späť na json
                fs.writeFileSync('outputs/temp.json', json); // Zapíš to naspäť
            }
        });
        // Prečítaj json súbor z outputs/hum.json
        fs.readFile('outputs/hum.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            }
            else{
                obj = JSON.parse(data); // Parsovanie na objekt
                obj.push(humMsg); // Pridáme ďalšie údaje
                json = JSON.stringify(obj); // Skonvertuj ho späť na json
                fs.writeFileSync('outputs/hum.json', json); // Zapíš to naspäť
            }
        });
        // Prečítaj json súbor z outputs/lumin.json
        fs.readFile('outputs/lumin.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            }
            else{
                obj = JSON.parse(data); // Parsovanie na objekt
                obj.push(luminMsg); // Pridáme ďalšie údaje
                json = JSON.stringify(obj); // Skonvertuj ho späť na json
                fs.writeFileSync('outputs/lumin.json', json); // Zapíš to naspäť
            }
        });
        
        var client = mqtt.connect('mqtt://localhost:1883');
        // Publikuj na MQTT opakovane každú 1 sekundu
        client.publish('sensor/temp', JSON.stringify(tempMsg));
        client.publish('sensor/hum', JSON.stringify(humMsg));
        client.publish('sensor/lumin', JSON.stringify(luminMsg));
        console.log("Published to MQTT");
    }
    , delay * 1000);
}

app.listen(5000, () => {
    console.log("Server running on port 5000");
    publish();
});