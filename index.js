const {
	send
} = require('micro')
const doYouLift = require('do-you-even-lift')
module.exports = async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	let statusCode, data;
	const moduleName = req.url.replace("/", "");
	if (!moduleName) {
		return send(res, 200, "Please enter the module name in the URL path, for example dyel.now.sh/yo")
	}
	try {
		data = await doYouLift(moduleName)
		statusCode = 200
	} catch (err) {
		data = err.code;
		statusCode = 404
	}
	send(res, statusCode, data)
}
