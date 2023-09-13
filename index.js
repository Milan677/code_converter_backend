const express = require('express');
const bodyParser = require('body-parser');
const { convertCode, debugCode, checkCodeQuality } = require('./chat');
require("dotenv").config();
const cors=require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors({origin:"*"}))

app.post('/api/process', async (req, res) => {
    const { code, service,language } = req.body;
    let result = '';

    try {
        if (service === 'convert') {
            result = await convertCode(code,language);
        } else if (service === 'debug') {
            result = await debugCode(code);
        } else if (service === 'quality') {
            result = await checkCodeQuality(code);
        } else {
            throw new Error('Invalid service selected');
        }

        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

const PORT=process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});
