import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	// INodePropertyOptions,
} from 'n8n-workflow';
import {
	operationsOptions,
	scopeOptions,
} from './options/paySpaceOptions';
import { employeeEndpointCollectionsOptions } from './options/employeeOptions';
import { PaySpaceUtils } from './paySpace.utils';
import { /*axios, { AxiosResponse,*/ AxiosRequestConfig } from 'axios';
import qs from 'qs';

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
		properties: [
			{
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Staging',
						value: 'staging',
					},
					{
						name: 'Production',
						value: 'production',
					},
				],
				default: 'staging',
				description: 'Which environment do you want to query in?',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: operationsOptions,
				default: 'getToken',
				description: 'Which operation to use?',
			},
			{
				displayName: 'Scope',
				name: 'client_scope',
				type: 'options',
				options: scopeOptions,
				default: 'api.full_access',
				displayOptions: {
					show: {
						operation: ['getToken'],
					},
				},
			},
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'number',
				default: '',
				displayOptions: {
					show: {
						operation: ['getMetadata', 'employee'],
					},
				},
				placeholder: '123456789',
			},
			{
				displayName: 'Endpoint Collection',
				name: 'endpointCollection',
				type: 'options',
				options: employeeEndpointCollectionsOptions,
				default: 'basicInformation',
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				placeholder: '123456789',
				description: 'Collection of endpoints related to operation',
			},
			{
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'options',
				options: PaySpaceUtils.getEndpointOption('{{ $parameter["endpointCollection"] }}'),
				default: '',
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				description: 'Endpoints related to operation',
			},
			{
				displayName: 'Api',
				name: 'api',
				type: 'options',
				options: PaySpaceUtils.getApiOptions('{{ $parameter["endpoint"] }}'),
				default: '',
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				placeholder: 'yourTokenType',
				description: 'Api related to operation',
			},
			{
				displayName: 'Token Type',
				name: 'tokenType',
				type: 'string',
				default: 'Bearer',
				displayOptions: {
					show: {
						operation: ['getMetadata', 'employee'],
					},
				},
				placeholder: 'yourTokenType',
				description: 'The Authorization bearer token type',
			},
			{
				displayName: PaySpaceUtils.dynamicDisplayName('{{ $parameter["api"] }}'),
				name: 'dynamicParameter',
				type: 'string',
				default: 'this.api.parameter',
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				placeholder: '',
			},
			{
				displayName: 'Data (JSON)',
				name: 'bodyData',
				type: 'json',
				default: '',
				placeholder: PaySpaceUtils.getBodyDataPlaceholder('{{ $parameter["api"] }}'),
				description: 'Body data that needs to be passed in the URL as body JSON',
				displayOptions: {
					// the resources and operations to display this element with
					show: {
						api: [
							'updateASingleEmployeeAddressRecord',
							'createASingleEmployeeRecord',
							'employmentStatusReinstateSameRecord',
						],
					},
				},
			},
			{
				displayName: 'Additional Optional Params',
				name: 'additionalFields',
				placeholder: 'Add optional params',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				description: 'Optional query parameters',
				options: [
					{
						name: 'params',
						displayName: 'Parameters',
						values: [],
					},
				],
			},
		],
	};



	// 	async updateProperties(
	//     this: IExecuteFunctions,
	//     description: INodeTypeDescription,
	// ): Promise<INodeProperties[]> {
	//     const operation = this.getNodeParameter('operation', 0) as string;

	//     // Get the properties array from the description
	//     const properties = description.properties as INodeProperties[];

	//     // Update display options for each property based on the operation
	//     for (const property of properties) {
	//         if (property.displayOptions?.show) {
	//             property.displayOptions.show.operation = [operation];
	//         }
	//     }

	//     // If the operation is 'employee', update specific properties
	//     if (operation === 'employee') {
	//         const endpointCollection = this.getNodeParameter('endpointCollection', 0) as string;
	//         const endpoint = this.getNodeParameter('endpoint', 0) as string;
	//         const api = this.getNodeParameter('api', 0) as string;

	//         // Update the options for the 'Endpoint' property
	//         const endpointProperty = properties.find(property => property.name === 'endpoint');
	//         if (endpointProperty) {
	//             endpointProperty.options = getEndpointOptions(endpointCollection) as INodePropertyOptions[];
	//         }

	//         // Update the options for the 'Api' property
	//         const apiProperty = properties.find(property => property.name === 'api');
	//         if (apiProperty) {
	//             apiProperty.options = getApiOptions(endpoint) as INodePropertyOptions[];
	//         }

	//         // Update the options for the 'Dynamic Parameter' property
	//         const dynamicParameterProperty = properties.find(property => property.name === 'dynamicParameter');
	//         if (dynamicParameterProperty) {
	//             dynamicParameterProperty.displayName = dynamicDisplayName(api) as string;
	//         }

	// // Update the options for the 'Body Data' property
	//         const bodyDataProperty = properties.find(property => property.name === 'bodyData');
	// 				if (bodyDataProperty) {
	//             bodyDataProperty.placeholder = getBodyDataPlaceholder(api) as string;
	//         }
	//     }

	//     return properties;
	// }

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
				let tokenType;
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
						maxBodyLength: Infinity,
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
					tokenType = this.getNodeParameter('tokenType', i) as string;

					config = {
						method: 'get',
						url: apiUrl + '/odata/v1.1/' + companyId + '/$metadata',
						headers: {
							Authorization: tokenType + ' ' + paySpaceAccessToken,
						},
					};
				} else if (operation === 'employee') {
					const api = this.getNodeParameter('api', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as any;
					companyId = this.getNodeParameter('companyId', i) as number;
					paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;
					tokenType = this.getNodeParameter('tokenType', i) as string;
					let baseURL: string;

					switch (api) {
						case 'getACollectionOfEmployees':
							baseURL = apiUrl + '/odata/v1.1/' + companyId + '/Employee?';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'getACollectionOfEmployeesAsOfAnEffectiveDate':
							const effectiveDate = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee/effective/${effectiveDate}?`;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'getASingleEmployeeRecord':
							const EmployeeIdSingle = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee(${EmployeeIdSingle})`;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'UpdateASingleEmployeeRecord':
							const dataUpdate = this.getNodeParameter('bodyData', i) as IDataObject;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee`;
							config.method = 'patch';
							config.data = dataUpdate;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
								Authorization: `Bearer ${paySpaceAccessToken}`,
								...dataDownload.getHeaders(),
							};
							break;
						case 'uploadEmployeePhoto':
							const FormDataUpload = require('form-data');
							const EmployeeIdUpload = this.getNodeParameter('dynamicParameter', i) as string;
							const baseURLUpload = `${apiUrl}/odata/v1.1/${companyId}/Employee/${EmployeeIdUpload}/image/upload`;
							const dataUpload = new FormDataUpload();
							config.url = baseURLUpload;
							config.data = dataUpload;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								...dataUpload.getHeaders(),
							};
							break;
						case 'getAnEmployeeAddress':
							const EmployeeNumber = this.getNodeParameter('dynamicParameter', i) as string;
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeAddress/${EmployeeNumber}`;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params);
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'getASingleEmploymentStatusRecord':
							const StatusId = this.getNodeParameter('dynamicParameter', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${StatusId})`; //
							config.method = 'get';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'getACollectionOfAllEmploymentStatuses':
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus/all?`;
							config.url = PaySpaceUtils.appendUrl(baseURL, additionalFields.params); //
							config.method = 'get';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'createASingleEmploymentStatusRecord':
							const EmployeeEmploymentStatus = this.getNodeParameter('bodyData', i) as IDataObject;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus`;
							config.method = 'post';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							config.data = EmployeeEmploymentStatus; //see "EmployeeEmploymentStatus" in metadata endpoint for available fields
							break;
						case 'updateASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							const EmploymentStatusId = this.getNodeParameter('dynamicParameter', i) as string;
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${EmploymentStatusId})`;
							config.maxBodyLength = Infinity;
							config.method = 'patch';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
							config.maxBodyLength = Infinity;
							config.method = 'patch';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'employmentStatusReinstateSameRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;

							config.maxBodyLength = Infinity;
							config.method = 'patch';
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							break;
						case 'employmentStatusReinstateWithNewTaxRecord':
							config.data = this.getNodeParameter('bodyData', i) as IDataObject;
							config.maxBodyLength = Infinity;
							config.method = 'patch';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
								'content-type': 'application/json',
							};
							break;
						case 'deleteASingleEmploymentStatusRecord':
							config.maxBodyLength = Infinity;
							config.method = 'delete';
							config.url = `${apiUrl}/odata/v1.1/${companyId}/EmployeeEmploymentStatus(${
								this.getNodeParameter('dynamicParameter', i) as string
							})`;
							config.headers = {
								Authorization: `Bearer ${paySpaceAccessToken}`,
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
