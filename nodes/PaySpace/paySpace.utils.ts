import { IDataObject, INodePropertyOptions } from 'n8n-workflow';
import {
	biographicalApiOptions,
	employeeAddressApiOptions,
	basicInformationEndpointsCollectionOptions,
	taxProfilesApiOptions,
} from './options/employeeOptions';

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
	if (api === 'getASingleEmployeeRecord') {
		return 'Employee ID';
	} else if (
		api === 'getACollectionOfEmployeesAsOfAnEffectiveDate' ||
		api === 'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate'
	) {
		return 'Effective Date';
	} else if (api === 'getAnEmployeeAddress') {
		return 'Employee Number';
	} else if (api === 'updateASingleEmployeeAddressRecord') {
		return 'Address ID';
	} else if (api === 'getASingleEmploymentStatusRecord') {
		return 'Status ID';
	} else if (
		api === 'updateASingleEmploymentStatusRecord' ||
		api === 'employmentStatusEmployeeTermination' ||
		api === 'employmentStatusReinstateWithNewTaxRecord' ||
		api === 'employmentStatusReinstateSameRecord'
	) {
		return 'Employment Status Id';
	} else {
		return 'Employment Status';
	}
};

export const getApiOptions = (endpoint: string):	INodePropertyOptions[] => {
	let options: any;

	switch (endpoint) {
		case 'biographical':
			options = biographicalApiOptions;
			break;
		case 'employeeAddress':
			options = employeeAddressApiOptions;
			break;
		case 'taxProfiles':
			options = taxProfilesApiOptions;
			break;
		default:
			options = [];
			break;
	}

	return options;
};

export const getBodyDataPlaceholder = (api: string): string => {
	let bodyDataPlaceholder: string = '';

	switch (api) {
		case 'createASingleEmployeeRecord':
			bodyDataPlaceholder = '{}';
			break;
		case 'employmentStatusReinstateSameRecord':
			bodyDataPlaceholder =
				'"EmploymentAction": "reinstate this employee resuming this tax record" //Required';
			break;
		case 'employmentStatusEmployeeTermination':
			bodyDataPlaceholder = `\n    "TerminationDate": "2019-01-01",\t\t\t\t\t// Required\n    "TerminationReason": "string",\t\t\t\t\t\t// Required\n    "EmploymentAction": "string",\t\t\t\t\t\t// Required\n    "TerminationCompanyRun": "string",\t\t\t\t\t// Optional\n    "EncashLeave": true \t\t\t\t\t\t\t\t// Required\n`;
			break;
		case 'employmentStatusReinstateWithNewTaxRecord':
			bodyDataPlaceholder = `\n    "EmploymentAction": "reinstate this employee starting a new tax record",\t//Required\n\t"EmploymentDate": "2019-01-01"\t\t\t\t\t\t\t\t\t\t\t\t//Required\n}`;
			break;
		case 'employmentStatusEmployeeTermination':
			bodyDataPlaceholder = `\n    "TerminationDate": "2019-01-01",\t\t\t\t\t// Required\n    "TerminationReason": "string",\t\t\t\t\t\t// Required\n    "EmploymentAction": "string",\t\t\t\t\t\t// Required\n    "TerminationCompanyRun": "string",\t\t\t\t\t// Optional\n    "EncashLeave": true \t\t\t\t\t\t\t\t// Required\n`;
			break;
		default:
			bodyDataPlaceholder = 'no preview body';
			break;
	}

	return bodyDataPlaceholder;
};

export const getEndpointOptions = (endpointCollection: string): INodePropertyOptions[] => {
	switch (endpointCollection) {
		case 'basicInformation':
			return basicInformationEndpointsCollectionOptions;
		case 'payrollProcessing':
			return basicInformationEndpointsCollectionOptions;
		default:
			return [];
	}
};
