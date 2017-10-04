
export default class Card {

	static async addNewCard(userId, type, cardNumber, holder, expire, csv) {
		try {
			var response = await fetch('http://localhost:31415',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Type: type,
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

	static async getCardsInfo(userId, type) {
		try {
			var response = await fetch('http://localhost:13432',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId,
					type,
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
