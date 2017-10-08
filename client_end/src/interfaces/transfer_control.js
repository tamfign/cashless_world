/**
 * Module to perform pay and accept transaction connected to server.
 */

const URL = 'http://ec2-52-36-241-1.us-west-2.compute.amazonaws.com:31415';

export default class Transfer {

	// API to send payment message to server through HTTP.
	static async pay(userId, uuid, amount) {
		try {
			let response = await fetch(URL, {
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
			let res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+res);
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
	}

	// API to send accept payment message to server through HTTP.
	static async accept(userId, uuid) {
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
					Uuid: uuid,
					Type: "TransferEnd"
				})
			});
			let res = await response.text();
			if(response.status>=200 && response.status<300) {
				console.log("res success is:"+res);
				ret = JSON.parse(Transfer.format(res));
			} else {
				throw res;
			}
		} catch(errors) {
			console.log("error is:"+errors);
		}
		return ret;
	}

	// Covert HTTP response to format we need.
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
