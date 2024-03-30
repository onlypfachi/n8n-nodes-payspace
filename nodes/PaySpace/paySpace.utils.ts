import { IDataObject, INodeProperties } from 'n8n-workflow';
import { biographicalApiOptions, employeeAddressApiOptions, taxProfilesApiOptions } from './options/employeeOptions';

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

export const dynamicDisplayName = (api: string) => {
	let displayName = '';
	if (api === 'getASingleEmployeeRecord') {
			displayName = 'Employee ID';
	} else if (api === 'getACollectionOfEmployeesAsOfAnEffectiveDate') {
			displayName = 'Effective Date';
	}
	else if (api === 'getAnEmployeeAddress') {
			displayName = 'EmployeeNumber';
	}
	else if (api === 'updateASingleEmployeeAddress') {
			displayName = 'AddressId';
	}
	return displayName;
};


export const getApiOptions = (endpointCollectionsOptions: string): INodeProperties[] => {
	let options: any;

	switch (endpointCollectionsOptions) {
			case 'biographical':
					options = biographicalApiOptions;
					break;
			case 'employeeAddress':
					options = employeeAddressApiOptions;
					break;
			case 'taxProfiles':
					options = taxProfilesApiOptions;;
					break;
			default:
					options = [];
					break;
	}

	return options;
};

