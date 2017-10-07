
const URL = 'http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:31415';

export default class Card {

	static async addNewCard(userId, cardNumber, holder, expire, csv) {
		try {
			let response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Type: "CardRegister",
					CardInfo: {
						CardNumber: cardNumber,
						HolderName: holder,
						ExpireDate: expire,
						CSV: csv
					}
				})
			});
			let res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+ JSON.parse(Card.format(res)));
				return JSON.parse(Card.format(res))['Result'];
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
	}

	static async getCardsInfo(userId) {
		try {
			let response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Type: "GetCardInfo",
				})
			});
			let res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+ Card.format(res));
				return JSON.parse(Card.format(res));
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
	}

	static format(str) {
		var ret;
		var tokens = str.split('\n');
		for (var key in tokens) {
			if (tokens[key] == "URL\r") {
				ret = tokens[parseInt(key) + 1];
			}
		}
		return ret;
	}
}
