import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { /*axios,*/ /*AxiosResponse,*/ AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
	apiOptions,
	endpointCollectionsOptions,
	endpointsOptions,
	operationsOptions,
	paramsOptions,
	scopeOptions,
} from './paySpaceOptions';
import { appendUrl } from './paySpaceUtilis';

export class PaySpace implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PaySpace',

		name: 'paySpace',
		icon: 'file:ps.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
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
						name: 'Testing',
						value: 'testing',
					},
					{
						name: 'Production',
						value: 'production',
					},
				],
				default: 'testing',
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
				description: 'Your company ID',
			},
			{
				displayName: 'Endpoint Collection',
				name: 'endpointCollection',
				type: 'options',
				options: endpointCollectionsOptions,
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
				options: endpointsOptions,
				default: 'biographical',
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
				options: apiOptions,
				default: 'getACollectionOfEmployees',
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				placeholder: 'yourTokenType',
				description: 'Api related to operation',
			},
			{
				displayName: 'ADD PARAMS',
				name: 'addOptionalParams',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: ['employee'],
					},
				},
				placeholder: 'yourTokenType',
				description: 'Whether to add optional params?',
			},
			{
				displayName: 'PARAMS',
				name: 'params',
				type: 'collection',
				placeholder: 'Optional parameters',
				default: {},
				displayOptions: {
					show: {
						operation: ['employee'],
						addOptionalParams: [true],
					},
				},
				options: paramsOptions,
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
				displayName: 'PaySpace Access Token',
				name: 'paySpaceAccessToken',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getMetadata', 'employee'],
					},
				},
				placeholder: 'y0urP4y5p4c34cc355T0k3nFr0mG3tT0k3nN0d3...',
				description: 'The Authorization bearer token',
			},
		],
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
					environment === 'testing'
						? 'https://apistaging.payspace.com'
						: 'https://api.payspace.com';
				const authenticationUrl: string =
					environment === 'testing'
						? 'https://staging-identity.yourhcm.com/connect/token'
						: 'https://identity.yourhcm.com/connect/token';

				let config: AxiosRequestConfig = {};
				let companyId;
				let paySpaceAccessToken;
				let tokenType;

				switch (operation) {
					case 'getToken':
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
						break;
					case 'getMetadata':
						// Get Meta Data
						companyId = this.getNodeParameter('companyId', i) as number;
						paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;
						tokenType = this.getNodeParameter('tokenType', i) as string;

						config = {
							method: 'get',
							maxBodyLength: Infinity,
							url: apiUrl + '/odata/v1.1/' + companyId + '/$metadata',
							headers: {
								Authorization: tokenType + ' ' + paySpaceAccessToken,
							},
						};
						break;
					case 'employee':
						const endpointCollection = this.getNodeParameter('endpointCollection', i) as string;
						const endpoint = this.getNodeParameter('endpoint', i) as string;
						const api = this.getNodeParameter('api', i) as string;
						const addOptionalParams = this.getNodeParameter('addOptionalParams', i) as boolean;
						companyId = this.getNodeParameter('companyId', i) as number;
						paySpaceAccessToken = this.getNodeParameter('paySpaceAccessToken', i) as string;
						tokenType = this.getNodeParameter('tokenType', i) as string;
						//  universal parameters
						const orderBy = addOptionalParams? this.getNodeParameter('orderBy', i) as string: undefined;
						const top = addOptionalParams? this.getNodeParameter('top', i) as number: undefined;
						const skip = addOptionalParams? this.getNodeParameter('skip', i) as number: undefined;
						const count = addOptionalParams? this.getNodeParameter('count', i) as boolean: undefined;
						const filter = addOptionalParams? this.getNodeParameter('filter', i) as string: undefined;

						let baseURL: string;

						// Employee \ Basic Information \ Biographical \ Get a collection of employees
						if (
							endpointCollection === 'basicInformation' &&
							endpoint === 'biographical' &&
							api === 'getACollectionOfEmployees'
						) {

							const select = addOptionalParams? this.getNodeParameter('select', i) as string: undefined;
							baseURL = apiUrl + '/odata/v1.1/' + companyId + '/Employee?';

							config = {
								method: 'get',
								maxBodyLength: Infinity,
								url: addOptionalParams
									? appendUrl(baseURL, {
											orderBy: orderBy,
											top: top,
											skip: skip,
											count: count,
											filter: filter,
											select: select,
									  })
									: baseURL,
								headers: {
									Authorization: `${tokenType} ${paySpaceAccessToken}`,
									'Content-Type': 'application/json',
									'User-Agent': 'payspace.com',
								},
							};
						} else if (
							// Employee \ Basic Information \ Biographical \ Get a collection of employees as of an effective date
							endpointCollection === 'basicInformation' &&
							endpoint === 'biographical' &&
							api === 'getACollectionOfEmployeesAsOfAnEffectiveDate'
						) {

							const effectiveDate = this.getNodeParameter('effectiveDate', i) as string;

							// Construct the base URL
							baseURL = `${apiUrl}/odata/v1.1/${companyId}/Employee/effective/${effectiveDate}?`;

							console.log(baseURL);

							config = {
								method: 'get',
								maxBodyLength: Infinity,
								url: addOptionalParams
									? appendUrl(baseURL, {
											orderBy: orderBy,
											top: top,
											skip: skip,
											count: count,
											filter: filter,
									  })
									: baseURL,
								headers: {
									Authorization: `${tokenType} ${paySpaceAccessToken}`,
									'Content-Type': 'application/json',
									'User-Agent': 'payspace.com',
								},
							};
						}
						break;
					default:
						responseData = [{ json: 'Unexpected operation:', operation }];
						break;
				}

				responseData = [
					{
						json: {
							success: true,
							message: 'Successfully got data',
							config: config,
							url: config.url,
							dataS: apiUrl,
						},
					},
				];
				// const response: AxiosResponse = await axios(config);
				// responseData = [{ json: response.data }];
				// console.log(JSON.stringify(response.data));

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
