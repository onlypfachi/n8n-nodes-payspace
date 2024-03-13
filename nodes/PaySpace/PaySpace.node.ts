import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import fetch from 'node-fetch';

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
				name: 'paySpaceApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Token',
						value: 'getToken',
					},
					{
						name: 'Get Metadata',
						value: 'getMetadata',
					},
				],
				default: 'getToken',
				description: 'Which operation to use?',
			},
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
				displayName: 'Scope',
				name: 'client_scope',
				type: 'options',
				options: [
					{
						name: 'Full Access',
						value: 'api.full_access',
					},
					{
						name: 'Read Only',
						value: 'api.read_only',
					},
					{
						name: 'Update',
						value: 'api.update',
					},
					{
						name: 'Create',
						value: 'api.create',
					},
				],
				default: 'api.full_access',
				displayOptions: {
					show: {
						operation: ['getToken'],
					},
				},
			},
			{
				displayName: 'Company ID',
				name: 'company_id',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getMetadata'],
					},
				},
			},
			{
				displayName: 'PaySpace Access Token',
				name: 'payspace_access_token',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['getMetadata'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0);
		const credentials = await this.getCredentials('paySpaceApi');
		let responseData: any;

		for (let i = 0; i < items.length; i++) {
			const environment = this.getNodeParameter('environment', i) as string;
			const scope = this.getNodeParameter('scope', 0) as string;
			try {
				async function getToken() {
					if (operation === 'getToken') {
						const client_id = credentials.client_id as string;
						const client_secret = credentials.client_secret as string;

						const tokenUrl =
							environment === 'testing'
								? 'https://staging-identity.yourhcm.com'
								: 'https://identity.yourhcm.com/connect/token';

						const myHeaders = new Headers();
						myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

						const urlencoded = new URLSearchParams();
						urlencoded.append('client_id', client_id);
						urlencoded.append('client_secret', client_secret);
						urlencoded.append('scope', scope);

						const requestOptions: any = {
							method: 'POST',
							headers: myHeaders,
							body: urlencoded,
							redirect: 'follow',
						};

						try {
							const response = await fetch(tokenUrl, requestOptions);
							const result = await response.json();
							responseData = [{ json: result }];
							console.log(result); // Logging the result for debugging
						} catch (error) {
							console.log('error', error);
						}
					}
				}

				getToken();

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
