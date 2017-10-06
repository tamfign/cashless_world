
const URL = 'http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:31415';

export default class Transfer {

	static async pay(userId, uuid, amount) {
		try {
			var response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Uuid: uuid,
					Amount: amount,
					Type: "TransferStart"
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

	static async accept(userId, uuid) {
		try {
			var response = await fetch('http://localhost:13432',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserId: userId,
					Uuid: uuid,
					Type: "TransferEnd"
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
