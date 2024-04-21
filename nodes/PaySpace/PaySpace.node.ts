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
	biographicalApiOptions,
	employeeAddressApiOptions,
	taxProfilesApiOptions,
} from './options/employee.options';
import * as PaySpaceUtils from './paySpace.utils';
import { /*axios, { AxiosResponse,*/ AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { companyEndpointCollectionsOptions } from './options/company.options';
import { properties } from './main.properties';

export class PaySpace implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PaySpace',
		name: 'paySpace',
		icon: 'file:ps.svg',
		group: ['input'],
		version: 1,
		subtitle: `={{$parameter["operation"] === "getToken" || $parameter["operation"] === "getMetadata" ? $parameter["operation"] : $parameter["api"]}}`,
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
						return [];
				}
			},

			async loadEndpointOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let endpointCollection = this.getCurrentNodeParameter('endpointCollection') as string;

				switch (endpointCollection) {
					case 'basicInformation':
						return basicInformationEndpointsCollectionOptions;
					case 'payrollProcessing':
						return payrollProcessingEndpointsCollectionOptions;
					default:
						return [];
				}
			},
			async getApiOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let endpoint = this.getCurrentNodeParameter('endpoint') as string;

				switch (endpoint) {
					case 'biographical':
						return biographicalApiOptions;
					case 'employeeAddress':
						return employeeAddressApiOptions;
					case 'taxProfiles':
						return taxProfilesApiOptions;
					default:
						// Handle default case (if needed)
						return [];
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
						? 'https://apistaging.payspace.com'
						: 'https://api.payspace.com';
				const authenticationUrl: string =
					environment === 'staging'
						? 'https://staging-identity.yourhcm.com/connect/token'
						: 'https://identity.yourhcm.com/connect/token';

				let config: AxiosRequestConfig = {
					method: 'post',
					maxBodyLength: Infinity,
					url: apiUrl,
					headers: {
						'Content-Type': 'application/json',
					},
				};
				let companyId;
				let paySpaceAccessToken;
				const getMetadataResponse = {
					json: {
						success: true,
						message: 'Successfully got data',
						config:
							'The response data is too large to display. Use Postman to view the response. https://www.postman.com/',
					},
				};

				if (operation === 'getToken') {
					// Get access token
					let scope = this.getNodeParameter('client_scope', i) as string;
					const client_id = credentials.client_id;
					const client_secret = credentials.client_secret;

					const data: string = qs.stringify({
						client_id: client_id,
						client_secret: client_secret,
						scope: scope,
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
					const api = this.getNodeParameter('api', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;
					companyId = this.getNodeParameter('companyId', i) as number;
					paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;
					let baseURL: string;

					switch (api) {
						case 'getACollectionOfEmployees':
							baseURL = apiUrl + '/odata/v1.1/' + companyId + '/Employee?';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'getACollectionOfEmployeesAsOfAnEffectiveDate':
							const effectiveDate = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee/effective/${effectiveDate}?`;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'getASingleEmployeeRecord':
							const EmployeeIdSingle = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee(${EmployeeIdSingle})`;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'createASingleEmployeeRecord':
							const dataCreate = this.getNodeParameter('bodyData', i) as IDataObject;
							const EmployeeIdCreate = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee(${EmployeeIdCreate})`;
							config.method = 'patch';
							config.data = dataCreate;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'UpdateASingleEmployeeRecord':
							const dataUpdate = this.getNodeParameter('bodyData', i) as IDataObject;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee`;
							config.method = 'patch';
							config.data = dataUpdate;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'downloadEmployeePhoto':
							const FormDataDownload = require('form-data');
							const EmployeeIdDownload = this.getNodeParameter('dynamicParameter', i) as string;
							const baseURLDownload = `${apiUrl}/odata/v1.1/${companyId}/Employee/${EmployeeIdDownload}/image/download`;
							const dataDownload = new FormDataDownload();
							config.url = baseURLDownload;
							config.data = dataDownload;
							config.headers = {
								Authorization: paySpaceAccessToken,
								...dataDownload.getHeaders(),
							};
							break;
						case 'uploadEmployeePhoto': //TODO: Implement upload logic
							const FormDataUpload = require('form-data');
							const EmployeeIdUpload = this.getNodeParameter('dynamicParameter', i) as string;
							const baseURLUpload = `${apiUrl}/odata/v1.1/${companyId}/Employee/${EmployeeIdUpload}/image/upload`;
							const dataUpload = new FormDataUpload();
							config.url = baseURLUpload;
							config.data = dataUpload;
							config.headers = {
								Authorization: paySpaceAccessToken,
								...dataUpload.getHeaders(),
							};
							break;
						case 'getAnEmployeeAddress':
							const EmployeeNumber = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeAddress/${EmployeeNumber}`;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params);
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'updateASingleEmployeeAddressRecord':
							const AddressId = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeAddress(${AddressId})`;
							const dataAddressUpdate = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params);
							config.method = 'patch';
							config.data = dataAddressUpdate; //see "EmployeeAddress" in metadata endpoint for available fields
							config.headers = {
								'Content-Type': 'application/json',
							};
							break;
						case 'getACollectionOfEmploymentStatus':
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus?`;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params);
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'getASingleEmploymentStatusRecord':
							const StatusId = this.getNodeParameter('dynamicParameter', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${StatusId})`; //
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate':
							const EffectiveDate = this.getNodeParameter('dynamicParameter', i) as string;
							config.url = PaySpaceUtils.appendUrl(
								`${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/effective/${EffectiveDate}`,
								additionalFields.params,
							); //
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'getACollectionOfAllEmploymentStatuses':
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/all?`;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params); //
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'createASingleEmploymentStatusRecord':
							const EmployeeEmploymentStatus = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus`;
							config.method = 'post';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							config.data = EmployeeEmploymentStatus; //see "EmployeeEmploymentStatus" in metadata endpoint for available fields
							break;
						case 'updateASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							const EmploymentStatusId = this.getNodeParameter('dynamicParameter', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${EmploymentStatusId})`;

							config.method = 'patch';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							//see "EmployeeEmploymentStatus" in metadata endpoint for available fields
							break;
						case 'employmentStatusEmployeeTermination':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							this.getNodeParameter('dynamicParameter', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;

							config.method = 'patch';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'employmentStatusReinstateSameRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;

							config.method = 'patch';
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							break;
						case 'employmentStatusReinstateWithNewTaxRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;

							config.method = 'patch';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						case 'deleteASingleEmploymentStatusRecord':
							config.method = 'delete';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'content-type': 'application/json',
							};
							break;
						default:
							// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
							throw new Error('Invalid Operation');
							break;
					}
				} else if (operation === 'company') {
				} else if (operation === 'lookUpValue') {
				} else if (operation === 'fileUpload') {
				} else if (operation === 'webhooks') {
				}

				const response = config; /*: AxiosResponse = await axios(config)*/
				responseData =
					operation === 'getMetadata' ? getMetadataResponse : [{ json: response.data }];

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
