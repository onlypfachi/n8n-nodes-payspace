import { INodeProperties } from 'n8n-workflow';
import { displayBodyRaw, dynamicIdDisplayArray, operationsOptions, paramsOptions, scopeOptions } from './options/main.options';

export const properties: INodeProperties[] = [
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
		default: 'authorization',
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
		displayName: 'Endpoint Collection Name or ID',
		name: 'endpointCollection',
		type: 'options',
		default: '',
		displayOptions: {
			show: {
				operation: ['employee', 'company'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'loadEndpointCollectionOptions', // This method must be defined in loadOptions
			loadOptionsDependsOn: ['operation'], // Depends on
		},
		description:
			'Collection of endpoints related to operation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	}, // TODO: Find a way to refresh and load the following properties that depend on this property
	{
		displayName: 'Endpoint Name or ID',
		name: 'endpoint',
		type: 'options',
		default: '',
		displayOptions: {
			show: {
				operation: ['employee', 'company', ],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'loadEndpointOptions', // This method must be defined in loadOptions
			loadOptionsDependsOn: ['endpointCollection'], // Depends on
		},
		description:
			'Endpoints related to operation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Api Name',
		name: 'api',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getApiOptions', // This method must be defined in loadOptions
			loadOptionsDependsOn: ['operation', 'endpoint'], // Depends on
		},
		default: '',
		displayOptions: {
			hide: {
				operation: ['authentication',]
			}
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
		description:
			'Api related to operation. Choose from the <a href="https://developer.payspace.com/">, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName:
			'This node is still in development: If any of the above options or property is not loaded please save the workflow and reopen the node',
		name: 'notice',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Token',
		name: 'paySpaceAccessToken',
		type: 'string',
		default: 'Bearer: <your token here>',
		displayOptions: {
			show: {
				operation: ['getMetadata', 'employee'],
			},
		},
		description: 'The Authorization bearer token type',
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: ['getMetadata', 'employee', 'company'],
			},
		},
		placeholder: 'The Company ID',
	},

	{
		displayName: 'Effective Date',
		name: 'effectiveDate',
		type: 'dateTime',
		default: '',
		description: 'Enter effective date',
		displayOptions: {
			show: {
				api: [
					'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate',
					'getACollectionOfEmployeesAsOfAnEffectiveDate',
					'getACollectionOfPositionsAsOfAnEffectiveDate',
				],
			},
		},
	},
	{
		displayName: 'Employee Number',
		name: 'employeeNumber',
		type: 'string',
		default: '',
		description: 'Enter the employee number associated',
		displayOptions: {
			show: {
				api: ['getAnEmployeeAddress'],
			},
		},
	},
	{
		displayName: 'ID',
		name: 'Id',
		type: 'string',
		default: '',
		description: 'Enter the EmployeePositionId',
		displayOptions: {
			show: {
				api: dynamicIdDisplayArray,
			},
		},
	},
	{
		displayName: 'Body (Raw)',
		name: 'bodyData',
		type: 'json',
		default: `{ "key": "value" }`,
		placeholder: `{"key":"value"}`,
		description: 'See in metadata endpoint for available fields OR visit https://developer.payspace.com/ if you are not sure',
		displayOptions: {
			show: {
				api: displayBodyRaw,
			},
		},
	},
	{
		displayName: 'PARAMS',
		name: 'additionalFields',
		placeholder: 'Additional optional params',
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
				values: paramsOptions,
			},
		],
		displayOptions: {
			show: {
				api: [
					'getASingleEmploymentStatusRecord',
					'getASingleEmployeeRecord',
					'getAnEmployeeAddress',
					'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate',
					'getACollectionOfEmployeesAsOfAnEffectiveDate',
					'updateASingleEmploymentStatusRecord',
					'getACollectionOfEmploymentStatus',
					'getACollectionOfEmployees',
					'getACollectionOfBankDetailRecords',
				],
			},
		},
	},
];
