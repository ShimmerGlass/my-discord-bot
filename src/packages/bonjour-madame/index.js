var $ = require('cheerio');
var request = require('request');

module.exports = function(options) {
	return function(bot) {
		bot
			.on(bot.triggers.cron, '0 12 * * *')
			.sink(options.sink)
			.do(function(bot, conf) {
				var that = this;

				request('http://www.bonjourmadame.fr/', function(err, res, body) {
					if (err)
						return;

					var url = $(body).find('.photo.post').first().find('img').first().attr('src');
					that.sink('Madam of the day : ' + url);
				});
			});
	}
};