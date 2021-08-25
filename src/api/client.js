
export function ClientBuilder(endpoint, {body,customHeaders}={}){

	this.setEndPoint(endpoint);
	this.setBodyAndHeaders({body,customHeaders})

}

ClientBuilder.prototype.setEndPoint = function(endpoint){

	if(endpoint){
		this.endpoint = endpoint;
	}
}

ClientBuilder.prototype.setBodyAndHeaders = function({body,customHeaders}={}){

	const headers = { 'Content-Type': 'application/json' }

	this.config = {
		method:body?'POST':'GET',
		headers:{
			...headers,
			...customHeaders
		}
	}

	if(body){
		this.config.body = JSON.stringify(body);
	}

}

ClientBuilder.prototype.fetchWithConfig = async function(endpoint, {body,customHeaders}={}){

	if(endpoint)
		this.setEndPoint(endpoint);
	if(body || customHeaders)
		this.setBodyAndHeaders({body,customHeaders})

	let fetchedData;
	try {
		const resp = await fetch(this.endpoint,this.config);
		fetchedData = await resp.json();
		if(resp.ok){
			return fetchedData;
		}
		throw new Error(resp.statusText)
	} catch (error) {
		return Promise.reject(error.message?error.message:fetchedData);
	}

}

ClientBuilder.prototype.get = function(endpoint, headers={}){
	return this.fetchWithConfig(endpoint,{customHeaders:headers})
}
ClientBuilder.prototype.post = function(endpoint,body, headers={}){
	return this.fetchWithConfig(endpoint,{body:body,customHeaders:headers})
}