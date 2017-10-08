/**
 * Module to connect to server to handle add new card and fetching all cards' information.
 */

const URL = 'http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:31415';

export default class Card {

	// API to add new card using HTTP
	static async addNewCard(userId, cardNumber, holder, expire, csv) {
		var ret = false;

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
				// Covert to JSON and get the result.
				ret = JSON.parse(Card.format(res))['Result'];
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
		return ret;
	}

	// API to get all cards Info back through HTTP.
	static async getCardsInfo(userId) {
		var ret;

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
				// Return with JSON format.
				ret = JSON.parse(Card.format(res));
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
		return ret;
	}

	// To format the HTTP response to format we need.
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
