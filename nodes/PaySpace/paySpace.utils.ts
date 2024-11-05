import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IDataObject, INode, INodePropertyOptions, NodeOperationError } from 'n8n-workflow';
import qs from 'qs';
import {
	adjustmentsApiOptions,
	applicationApiOptions,
	assetApiOptions,
	attachmentsApiOptions,
	bankingDetailsApiOptions,
	biographicalApiOptions,
	claimEmployeeWorkflowApiOptions,
	claimsApiOptions,
	dependantsApiOptions,
	editPayslipApiOptions,
	employeeAddressApiOptions,
	employeeCustomFormsApiOptions,
	employeeInboxApiOptions,
	employeeQualificationsApiOptions,
	employeeReviewHeaderApiOptions,
	employeeReviewKPAApiOptions,
	employeeReviewTemplateApiOptions,
	employeeSkillsApiOptions,
	employeeTrainingApiOptions,
	incidentManagementApiOptions,
	notesApiOptions,
	outOfOfficeApiOptions,
	payRateDetailsApiOptions,
	payslipsApiOptions,
	positionsApiOptions,
	projectDetailsApiOptions,
	recurringComponentsNestedOptions,
	recurringCostingSplitApiOptions,
	recurringTemplatesApiOptions,
	setupApiOptions,
	suspensionApiOptions,
	takeOnYearToDateFiguresApiOptions,
	taxCertificatesApiOptions,
	taxProfilesApiOptions,
} from './options/employee.options';
import {
	billingEndpointsApiOptions,
	budgetArchiveReportApiOptions,
	companyCustomFormOptions,
	companyReviewProcessApiOptions,
	costingProjectActivityEndpointsApiOptions,
	currencyExchangeRatesApiOptions,
	eftOutboxApiOptions,
	generalLedgerApiOptions,
	jobManagementApiOptions,
	jobManagementBudgetCostApiOptions,
	organizationHierarchyUnitsApiOptions,
	organizationPositionDetailsApiOptions,
	regionApiOptions,
	regionHistoryApiOptions,
	trainingCourseApiOptions,
	workdayApiOptions,
} from './options/company.options';

/**
 * Appends query parameters to a base URL.
 *
 * Accepts a base URL and an object of key/value pairs representing
 * query parameters. Iterates through the query params object, appending
 * each key/value pair to the URL as a query string.
 *
 * Returns the base URL with the query string appended.
 */
export const appendUrl = (baseApiUrl: string, params: IDataObject): AxiosRequestConfig['url'] => {
	let urlParams = '';
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== '' && value !== null && value !== 0) {
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
			bodyDataPlaceholder = `\n    "TerminationDate": "2019-01-01",\t\t\t\t\t\n    "TerminationReason": "string",\t\t\t\t\t\t\n    "EmploymentAction": "string",\t\t\t\t\t\t\n    "TerminationCompanyRun": "string",\t\t\t\t\t// Optional\n    "EncashLeave": true \t\t\t\t\t\t\t\t\n`;
			break;
		case 'employmentStatusReinstateWithNewTaxRecord':
			bodyDataPlaceholder = `\n    "EmploymentAction": "reinstate this employee starting a new tax record",\t//Required\n\t"EmploymentDate": "2019-01-01"\t\t\t\t\t\t\t\t\t\t\t\t//Required\n}`;
			break;
		case 'employmentStatusEmployeeTermination':
			bodyDataPlaceholder = `\n    "TerminationDate": "2019-01-01",\t\t\t\t\t\n    "TerminationReason": "string",\t\t\t\t\t\t\n    "EmploymentAction": "string",\t\t\t\t\t\t\n    "TerminationCompanyRun": "string",\t\t\t\t\t// Optional\n    "EncashLeave": true \t\t\t\t\t\t\t\t\n`;
			break;
		default:
			bodyDataPlaceholder = 'no preview body';
			break;
	}

	return bodyDataPlaceholder;
};

// this maps through the apis and match them with the endpoint -----crazy IKR🤯---
export const mapApiArray: Record<string, INodePropertyOptions[]> = {
	biographical: biographicalApiOptions,
	employeeAddress: employeeAddressApiOptions,
	taxProfiles: taxProfilesApiOptions,
	projectDetails: projectDetailsApiOptions,
	positions: positionsApiOptions,
	incidentManagement: incidentManagementApiOptions,
	employeeInbox: employeeInboxApiOptions,
	employeeCustomForms: employeeCustomFormsApiOptions,
	dependants: dependantsApiOptions,
	assets: assetApiOptions,
	attachments: attachmentsApiOptions,
	bankingDetails: bankingDetailsApiOptions,
	payRateDetails: payRateDetailsApiOptions,
	recurringComponents: recurringComponentsNestedOptions, // TODO: check
	takeOnYearToDateFigures: takeOnYearToDateFiguresApiOptions,
	recurringTemplates: recurringTemplatesApiOptions,
	claims: claimsApiOptions,
	claimEmployeeWorkflow: claimEmployeeWorkflowApiOptions,
	payslip: payslipsApiOptions,
	editPayslip: editPayslipApiOptions,
	taxCertificates: taxCertificatesApiOptions,
	adjustments: adjustmentsApiOptions,
	setup: setupApiOptions,
	application: applicationApiOptions,
	suspensionEndpoint: suspensionApiOptions,
	outOfOffice: outOfOfficeApiOptions,
	notes: notesApiOptions,
	employeeTraining: employeeTrainingApiOptions,
	employeeQualifications: employeeQualificationsApiOptions,
	employeeSkills: employeeSkillsApiOptions,
	recurringCostingSplit: recurringCostingSplitApiOptions,
	employeeReviewHeader: employeeReviewHeaderApiOptions,
	employeeReviewKPA: employeeReviewKPAApiOptions,
	employeeReviewTemplate: employeeReviewTemplateApiOptions,
	//conmpany: concmpanyApiOptions
	generalLedger: generalLedgerApiOptions,
	eftOutbox: eftOutboxApiOptions,
	organizationPositionDetails: organizationPositionDetailsApiOptions,
	organizationHierarchyUnits: organizationHierarchyUnitsApiOptions,
	jobManagement: jobManagementApiOptions,
	jobManagementBudgetCost: jobManagementBudgetCostApiOptions,
	budgetArchiveReport: budgetArchiveReportApiOptions,
	currencyExchangeRates: currencyExchangeRatesApiOptions,
	workday: workdayApiOptions,
	trainingCourse: trainingCourseApiOptions,
	companyReviewProcess: companyReviewProcessApiOptions,
	companyCustomFormOptions: companyCustomFormOptions,
	billingEndpoints: billingEndpointsApiOptions,
	costingProjectActivityEndpoints: costingProjectActivityEndpointsApiOptions, // TODO: check
	region: regionApiOptions,
	regionHistory: regionHistoryApiOptions,
};

export const requestData = {
	method: 'get',
	maxBodyLength: Infinity,
	url: 'https://api.payspace.com/odata/v1.1/',
	headers: {
		Authorization: 'Bearer {{payspace-access-token}}',
		'content-type': 'application/json',
	},
	data: {},
};

export const extractData = (data: {
	assignments: { name: string; value: string }[];
}): Record<string, string> => {
	const result: Record<string, string> = {};
	data.assignments.forEach((assignment) => {
		result[assignment.name] = assignment.value;
	});
	return result;
};
export interface Company {
	company_id: number;
	company_name: string;
	company_code: string;
}

interface GroupCompany {
	group_id: number;
	group_description: string;
	companies: Company[];
}
export interface AuthResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	group_companies: GroupCompany[];
}
interface AuthParams {
	client_id: string;
	client_secret: string;
	url: string;
	client_scope: string;
	identifier: string;
	identifier_field: keyof Company;
	node: INode;
}
export interface ExecutionAuth {
	token: string;
	company?: Company;
}

export const getTokenAndCompany = async ({
	client_id,
	client_secret,
	url,
	client_scope,
	identifier,
	identifier_field,
	node,
}: AuthParams): Promise<ExecutionAuth> => {
	const authdata: string = qs.stringify({
		client_id: client_id,
		client_secret: client_secret,
		scope: client_scope,
	});

	const authconfig: AxiosRequestConfig = {
		method: 'post',
		url: url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'payspace.com',
		},
		data: authdata,
	};
	try {
		const response: AxiosResponse = await axios(authconfig);
		const r: AuthResponse = response.data;

		if (!r.group_companies || !r.group_companies[0].companies) {
			throw new NodeOperationError(node, `group_companies or companies data is missing from the response: ${JSON.stringify(r)} `);
		}
		const selectedCompany = r.group_companies.map((group) => {
			const foundCompany = group.companies.find((company) => {
				if (identifier_field === 'company_id') {
					return isNaN(Number(identifier))
						? false
						: company.company_id === Number(identifier);
				} else {
					return company[identifier_field] === identifier;
				}
			});

			return {
				group_description: group.group_description,
				company: foundCompany || undefined,
			};
		});

		const foundCompanies = selectedCompany.filter((group) => group.company !== undefined);

		return {
			token: r.access_token,
			company: foundCompanies.length > 0 ? foundCompanies[0].company : undefined,
		};

	} catch (error) {
		throw new NodeOperationError(node, `Auth Error Trying To Get Token: ${error}`);
	}
};
