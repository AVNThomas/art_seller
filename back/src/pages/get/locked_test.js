const auth = require('../../middleware/auth');

module.exports = {
    name: 'locked_test',
    run: (req, res) => {

        const { token } = req.headers;

        if (!token || auth.function(req.headers) === false) {
            return res.status(401).send('access restricted');
        }
        res.send('Hello locked_test!');
    }
};