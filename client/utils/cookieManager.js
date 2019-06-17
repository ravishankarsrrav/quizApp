let CookieManager = {
	set : (cookieName, cookieValue) => {
		sessionStorage.setItem(cookieName,cookieValue);
	},
	get : (cookieName) => {
		return sessionStorage.getItem(cookieName);
	}
}

export default CookieManager;