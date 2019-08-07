const Clarifai = require('clarifai');

export default class ClarifaiClient {
    public app;

    constructor() {
        console.info("CLARIFAI_KEY", process.env.CLARIFAI_KEY, process.env.__DEV__);
        this.app = new Clarifai.App({
            apiKey: process.env.CLARIFAI_KEY
        });
    }

    getFaceBoundingBox(base64) {
        return new Promise((resolve, reject) => {
            const base64result = base64.split(',')[1];
            this.app.models.predict("d02b4508df58432fbb84e800597b8959", { base64: base64result }).then(
                function(response) {
                    console.info(response, response.rawData.outputs[0].data.regions);
                    resolve(response.rawData.outputs[0].data.regions);
                },
                function(err) {
                    console.error(err);
                    reject(err);
                }
            );
        });
    }

    test() {
        return new Promise((resolve, reject) => {
            this.app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
            .then(generalModel => {
                return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
            })
            .then(response => {
                var concepts = response['outputs'][0]['data']['concepts']
                console.info(response, concepts, response.rawData.outputs[0].data.regions);
                resolve(response.rawData.outputs[0].data.regions);
            })
        });
    }
}