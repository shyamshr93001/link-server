const Topics = require('../model/topic');

exports.createTopic = async (req, res) => {

    try {

        const { name, createdBy, visibility } = req.body;
        const checkTopic = await Topics.findOne({name}).exec();

        console.log("Creating user");
        if (checkTopic) {
            res.status(500).send("Topic Exists Already")
            return
        }
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
        res.send(topic);
    } catch (err) {
        console.error('Error getting user:', err);
    }
};