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
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			baseApiUrl += `&${key}=${value}`;
		}
	}
	// Remove the leading '&' if present
	// baseURL = baseURL.replace(/^\&/, '');

	return baseApiUrl;
};

