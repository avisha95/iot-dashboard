const brokerUrl = 'ws://broker.emqx.io:8083/mqtt';
const topicSensor = "tes/18945454521/topic/sensor";
const topicLampu = "tes/18945454521/topic/lampu";

const client = new MQTTClient(brokerUrl);
const options = { qos: 0, retain: true };

//Ketika Client Connect ke MQTT Broker
client.onConnect = () => {
    client.subscribe(topicSensor);
    client.subscribe(topicLampu);
};

//Ketika Client Menerima Pesan Dari ESP32
client.onMessage = (topic, message) => {
    console.log('Topic:', topic);
    console.log('Message:', message.toString());

    if (topic === topicSensor) {
        var suhu = message.toString();
        document.getElementById("suhu").innerHTML = suhu;
    }

    if (topic === topicLampu) {
        var statusLampu = message.toString();
        if (statusLampu == '0') statusLampu = "OFF";
        if (statusLampu == '1') statusLampu = "ON";
        document.getElementById("statusLampu").innerHTML = statusLampu;
    }

};

//Contoh Fungsi Publish
function publish_led(message) {
    client.publish(topicLampu, message, options);
}

client.connect();