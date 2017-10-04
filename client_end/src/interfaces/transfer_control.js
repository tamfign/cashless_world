
export default class Transfer {

	static async pay(userId, type, amount) {
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
					amount
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

	static async accept(userId, type) {
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
