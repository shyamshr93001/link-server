const Topics = require('../model/topic');

exports.createTopic = async (req, res) => {

    try {

        const { name, createdBy, visibility } = req.body;
        const checkTopic = await Topics.findOne({ name }).exec();

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
        res.status(500).send('Error getting topic:', err);
    }
};

exports.deleteTopic = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name)
        const topic = await Topics.findOneAndDelete({ name }).exec();
        if (topic == null)
            res.send("Topic does not exist")
        else
            res.send("Topic deleted from server")
    } catch (err) {
        console.error('Error deleting topic:', err);
        res.status(500).send('Error deleting topic');
    }
}

exports.updateTopic = async (req, res) => {
    try {
        const { name, visibility, newName } = req.body;
        const checkTopic = await Topics.findOne({ name: newName }).exec();

        if (checkTopic) {
            res.send("Topic Exists Already")
            return
        }

        const topic = await Topics.findOneAndUpdate
            ({ name }, { name: newName, visibility }).exec();
        if (topic == null)
            res.send("Topic does not exist")
        else
            res.send("Topic updated from server")
    }
    catch (err) {
        console.error('Error updating topic:', err);
        res.status(500).send('Error updating topic');
    }
}