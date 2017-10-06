
export default class Card {
	const URL = 'http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:31415';

	static async addNewCard(userId, type, cardNumber, holder, expire, csv) {
		try {
			var response = await fetch(URL, {
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
			var res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+res);
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
	}

	static async getCardsInfo(userId) {
		try {
			var response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Type: "",
				})
			});
			var res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+res);
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
	}
}
