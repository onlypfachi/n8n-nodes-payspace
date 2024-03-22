import { IDataObject } from 'n8n-workflow';

/**
 * Appends query parameters to a base URL.
 *
 * Accepts a base URL and an object of key/value pairs representing
 * query parameters. Iterates through the query params object, appending
 * each key/value pair to the URL as a query string.
 *
 * Returns the base URL with the query string appended.
 */
export const appendUrl = (baseApiUrl: string, params: IDataObject) => {
	let urlParams = '';
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== '') {
			urlParams += `&$${key}=${value}`;
		}
	}
	// Remove the leading '&'
	urlParams = urlParams.replace(/^\&/, '');

	// Append the parameters to the base URL
	const updatedUrl = baseApiUrl.includes('?')
		? `${baseApiUrl}${urlParams}`
		: `${baseApiUrl}?${urlParams}`;

	return updatedUrl;
};

export const notEmpty = (obj: IDataObject) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			return true; // Object has at least one property
		}
	}
	return false; // Object is empty
};
