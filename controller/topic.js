const Topics = require('../model/topic');

exports.createTopic = async (req, res) => {

    try {

        const { name, createdBy, visibility } = req.body;
        console.log("Creating user");
        const topic = new Topics({
            name: name,
            createdBy: createdBy,
            visibility: visibility,
        });
        console.log(topic);
        await topic.save();
        res.send("Topic created from server")
    } catch (err) {
        console.error('Error saving topic:', err);
        res.status(500).send('Error saving topic');
    }
};

exports.getTopics = async (req, res) => {

    try {
        const topic = await Topics.find();
        console.log(topic)
        res.send(topic);
    } catch (err) {
        console.error('Error getting user:', err);
    }
};