import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import {
	employeeEndpointCollectionsOptions,
	basicInformationEndpointsCollectionOptions,
	payrollProcessingEndpointsCollectionOptions,
	performanceManagementEndpointsCollectionOptions,
	skillsEndpointsCollectionOptions,
	suspensionEndpointsCollectionOptions,
	payrollResultsEndpointsCollectionOptions,
	costingEndpointsCollectionOptions,
	leaveEndpointsCollectionOptions,
	otherEndpointsCollectionOptions,
} from './options/employee.options';
import { appendUrl, notEmpty, apiArray } from './paySpace.utils';
import { /*axios, { AxiosResponse,*/ AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { companyEndpointCollectionsOptions } from './options/company.options';
import { properties } from './main.properties';
import { lookUpValueApiOptions } from './options/lookupValues.options';
import { webhooksApiOptions } from './options/webhooks.options';

export class PaySpace implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PaySpace',
		name: 'paySpace',
		icon: 'file:ps.svg',
		group: ['input'],
		version: 1,
		subtitle: `={{$parameter["operation"] === "authorization" || $parameter["operation"] === "getMetadata" ? $parameter["operation"] : $parameter["api"]}}`,
		description: 'Use PaySpace API to manage your PaySpace account',
		defaults: {
			name: 'PaySpace',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clientCredentialApi',
				required: true,
			},
		],
		properties: properties,
	};

	methods = {
		loadOptions: {
			async loadEndpointCollectionOptions(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				let operation = this.getCurrentNodeParameter('operation') as string;

				switch (operation) {
					case 'employee':
						return employeeEndpointCollectionsOptions;
					case 'company':
						return companyEndpointCollectionsOptions;
					default:
						return []
				}
			},

			async loadEndpointOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let endpointCollection = this.getCurrentNodeParameter('endpointCollection') as string;

				switch (endpointCollection) {
					case 'basicInformation':
						return basicInformationEndpointsCollectionOptions;
					case 'payrollProcessing':
						return payrollProcessingEndpointsCollectionOptions;
					case 'Payroll Results':
						return payrollResultsEndpointsCollectionOptions;
					case 'performanceManagement':
						return performanceManagementEndpointsCollectionOptions;
					case 'skills':
						return skillsEndpointsCollectionOptions;
					case 'Suspension':
						return suspensionEndpointsCollectionOptions;
					case 'costing':
						return costingEndpointsCollectionOptions;
					case 'leave':
						return leaveEndpointsCollectionOptions;
					case 'other':
						return otherEndpointsCollectionOptions;
					default:
						return [];
				}
			},
			async getApiOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let operation = this.getCurrentNodeParameter('operation') as string;

				if (operation === 'lookupValue') {
					return lookUpValueApiOptions;
				} else if (operation === 'webhook') {
					return webhooksApiOptions;
				} else {
					let endpoint = this.getCurrentNodeParameter('endpoint') as string;
					return apiArray[endpoint];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('clientCredentialApi');
		let responseData: any;

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const environment = this.getNodeParameter('environment', i) as string;
				const apiUrl: string =
					environment === 'staging'
						? 'https://apistaging.payspace.com/odata/v1.1/'
						: 'https://api.payspace.com/odata/v1.1/';
				const authenticationUrl: string =
					environment === 'staging'
						? 'https://staging-identity.yourhcm.com/connect/token'
						: 'https://identity.yourhcm.com/connect/token';

				let config: AxiosRequestConfig = {};
				let companyId;
				let paySpaceAccessToken;
				let additionalFields;
				// const getMetadataResponse = {
				// 	json: {
				// 		success: true,
				// 		message: 'Successfully got data',
				// 		config:
				// 			'The response data is too large to display. Use Postman to view the response. https://www.postman.com/',
				// 	},
				// };

				if (operation === 'authorization') {
					// Get access token
					const data: string = qs.stringify({
						client_id: credentials.client_id,
						client_secret: credentials.client_secret,
						scope: this.getNodeParameter('client_scope', i) as string,
					});
					config = {
						method: 'post',
						url: authenticationUrl,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'User-Agent': 'payspace.com',
						},
						data: data,
					};
				} else if (operation === 'getMetadata') {
					// Get Meta Data
					companyId = this.getNodeParameter('companyId', i) as number;
					paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;

					config = {
						method: 'get',
						url: apiUrl + '/odata/v1.1/' + companyId + '/$metadata',
						headers: {
							Authorization: paySpaceAccessToken,
						},
					};
				} else if (operation === 'employee') {
					config = {
						maxBodyLength: Infinity,
						headers: {
							Authorization: paySpaceAccessToken,
							'Content-Type': 'application/json',
						},
					};
					const api = this.getNodeParameter('api', i) as string;
					companyId = this.getNodeParameter('companyId', i) as any;
					paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;
					let baseURL: string;

					let employeeId;
					let data;
					let effectiveDate;
					let statusId;
					let positionId;
					let bankDetailId;
					let dependantId;

					switch (
						api //TODO: ADD DESCRIPTIONS TO OPTIONS
					) {
						case 'getACollectionOfEmployees':
							baseURL = apiUrl + '/odata/v1.1/' + companyId + '/Employee?';
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							config.method = 'get';
							break;
						case 'getACollectionOfEmployeesAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as string;
							additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee/effective/${effectiveDate}?`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							config.method = 'get';
							break;
						case 'getASingleEmployeeRecord':
							employeeId = this.getNodeParameter('employeeId', i) as string;
							config.method = 'get';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/Employee(${employeeId})`;
							break;
						case 'createASingleEmployeeRecord':
							data = this.getNodeParameter('bodyData', i) as IDataObject;
							employeeId = this.getNodeParameter('employeeId', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee(${employeeId})`;
							config.method = 'patch';
							config.data = data;

							break;
						case 'UpdateASingleEmployeeRecord':
							data = this.getNodeParameter('bodyData', i) as IDataObject;
							employeeId = this.getNodeParameter('employeeId', i) as any;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/Employee(${employeeId})`;
							config.method = 'patch';
							config.data = data;

							break;
						case 'downloadEmployeePhoto':
							const FormDataDownload = require('form-data');
							employeeId = this.getNodeParameter('employeeId', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/Employee/${employeeId}/image/download`;
							data = new FormDataDownload();
							config.data = data;
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								...data.getHeaders(),
							};
							break;
						case 'uploadEmployeePhoto': //TODO: Implement upload logic
							const FormDataUpload = require('form-data');
							employeeId = this.getNodeParameter('employeeId', i) as string;
							const baseURLUpload = `${apiUrl}/odata/v1.1/${companyId}/Employee/${employeeId}/image/upload`;
							data = new FormDataUpload();
							config.url = baseURLUpload;
							config.method = 'post';
							config.data = data;
							config.headers = {
								Authorization: paySpaceAccessToken,
								...data.getHeaders(),
							};
							break;
						case 'getAnEmployeeAddress':
							const EmployeeNumber = this.getNodeParameter('employeeNumber', i) as string;
							config.method = 'get';
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeAddress/${EmployeeNumber}`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;

							break;
						case 'updateASingleEmployeeAddressRecord':
							const addressId = this.getNodeParameter('addressId', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeAddress(${addressId})`;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject; //see "EmployeeAddress" in metadata endpoint for available fields
							config.url = appendUrl(baseURL, additionalFields);
							config.method = 'patch';
							config.headers = {
								'Content-Type': 'application/json',
							};
							break;
						case 'getACollectionOfEmploymentStatus':
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus?`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							config.method = 'get';
							break;
						case 'getASingleEmploymentStatusRecord':
							statusId = this.getNodeParameter('statusId', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`; //
							config.method = 'get';

							break;
						case 'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as string;
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							config.url = notEmpty(additionalFields)
								? appendUrl(
										`${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/effective/${effectiveDate}`,
										additionalFields,
								  )
								: `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/effective/${effectiveDate}`; //
							config.method = 'get';

							break;
						case 'getACollectionOfAllEmploymentStatuses':
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/all`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL; //
							config.method = 'get';

							break;
						case 'createASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus`;
							config.method = 'post';

							break;
						case 'updateASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							statusId = this.getNodeParameter('statusId', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.method = 'patch';
							break;
						case 'employmentStatusEmployeeTermination':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							statusId = this.getNodeParameter('statusId', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.method = 'patch';
							break;
						case 'employmentStatusReinstateSameRecord':
							statusId = this.getNodeParameter('statusId', i) as string;
							config.method = 'patch';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							break;
						case 'employmentStatusReinstateWithNewTaxRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							statusId = this.getNodeParameter('statusId', i) as string;
							config.method = 'patch';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`;

							break;
						case 'deleteASingleEmploymentStatusRecord':
							config.method = 'delete';
							statusId = this.getNodeParameter('statusId', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${statusId})`;

							break;
						case 'getACollectionOfPositions': //Position
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							config.method = 'get';
							break;
						case 'getASinglePositionRecord':
							positionId = this.getNodeParameter('positionId', i) as any;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition(${positionId})`;
							config.method = 'get';
							break;
						case 'getACollectionOfPositionsAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as any;
							config.method = 'get';
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition/effective/${effectiveDate}`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							config.headers = {
								Authorization: paySpaceAccessToken,
							};
							break;
						case 'createASinglePositionRecord':
							positionId = this.getNodeParameter('positionId', i) as any;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition(${positionId})`;
							config.method = 'post';
							break;
						case 'updateASinglePositionRecord':
							positionId = this.getNodeParameter('positionId', i) as any;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition(${positionId})`;
							config.method = 'patch';
							break;
						case 'deleteASinglePositionRecord':
							positionId = this.getNodeParameter('positionId', i) as string;
							config.method = 'delete';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeePosition(${positionId})`;
							break;
						case 'getACollectionOfBankDetailRecords': //Bank Details
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeBankDetail?`;
							config.method = 'get';
							additionalFields = additionalFields = this.getNodeParameter(
								'additionalFields',
								i,
							) as any;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							break;
						case 'getASingleBankDetailRecord':
							bankDetailId = this.getNodeParameter('bankDetailId', i) as any;
							config.method = 'get';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeBankDetail(${bankDetailId})`;
							break;
						case 'createASingleBankDetailRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeBankDetail`;
							config.method = 'post';
							break;
						case 'updateASingleBankDetailRecord':
							bankDetailId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeBankDetail(${bankDetailId})`;
							config.method = 'patch';
							break;
						case 'deleteASingleBankDetailRecord':
							config.method = 'delete';
							bankDetailId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeBankDetail(${bankDetailId})`;
							break;
						case 'getACollectionOfDependants': //Dependants
							config.method = 'get';
							additionalFields = this.getNodeParameter('additionalFields', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeeDependant`;
							config.url = notEmpty(additionalFields)
								? appendUrl(baseURL, additionalFields)
								: baseURL;
							break;
						case 'getASingleDependantRecord':
							config.method = 'get';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'createASingleDependantRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}${companyId}/EmployeeDependant`;
							break;
						case 'updateASingleDependantRecord':
							config.method = 'patch';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'deleteASingleDependantRecord':
							config.method = 'delete';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'dependantQuickAdd':
							config.method = 'post';
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}${companyId}/EmployeeDependantQuickAdd`;
							break;

						default:
							// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
							throw new Error('Invalid Operation');
							break;
					}
				} else if (operation === 'company') {
				} else if (operation === 'lookUpValue') {
					let lookUpValueApi = this.getNodeParameter('api', i) as string;
					additionalFields = this.getNodeParameter('additionalFields', i) as any;
					config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: appendUrl(`${apiUrl}${companyId}${lookUpValueApi}?`, additionalFields),
						headers: {
							Authorization: paySpaceAccessToken,
							'Content-Type': 'application/json',
						},
					};
				} else if (operation === 'fileUpload') {
				} else if (operation === 'webhooks') {
					const entityType = this.getNodeParameter('entityType', i) as string;
					const fromDate = this.getNodeParameter('fromDate', i) as string;
					const toDate = this.getNodeParameter('toDate', i) as string;
					const pageNumber = this.getNodeParameter('pageNumber', i) as string;
					const pageSize = this.getNodeParameter('entityType', i) as string;
					config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: `${apiUrl}${companyId}/WebhookError/${entityType}?from=${fromDate}&to=${toDate}&pageNumber=${pageNumber}&pageSize=${pageSize} `,
						headers: {
							Authorization: paySpaceAccessToken,
							'content-type': 'application/json',
						},
					};
				}

				const response = config; /*: AxiosResponse = await axios(config)*/
				responseData = [{ response }];
				// operation === 'getMetadata' ? getMetadataResponse : [{ json: response.data }];

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
