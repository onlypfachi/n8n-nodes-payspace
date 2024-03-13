import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import axios from 'axios';
import qs from 'qs';

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
				if (operation === 'getToken') {
					const client_id = credentials.client_id;
					const client_secret = credentials.client_secret;
					const tokenUrl: string =
						environment === 'testing'
							? 'https://staging-identity.yourhcm.com'
							: 'https://identity.yourhcm.com/connect/token';

					const data: string = qs.stringify({
						client_id: client_id,
						client_secret: client_secret,
						scope: scope,
					});

					const config: any = {
						method: 'post',
						maxBodyLength: Infinity,
						url: tokenUrl,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						data: data,
					};

					const response: any = await axios(config);
					responseData = [{ json: response.data }];
					console.log(response.data);
				}

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
