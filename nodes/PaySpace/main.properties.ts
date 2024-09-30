import { INodeProperties } from 'n8n-workflow';
import {
	//displayAdditionalFields,
	displayBodyRaw,
	dynamicIdDisplayArray,
	operationsOptions,
	//paramsOptions,
	scopeOptions,
} from './options/main.options';
import { requestData } from './paySpace.utils';

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
				operation: ['authorization'],
			},
		},
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'number',
		default: '',
		displayOptions: {
			hide: {
				operation: ['authorization', 'customConfig'],
			},
		},
		placeholder: 'The Company ID',
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
				operation: ['employee', 'company'],
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
		displayName: 'Api Request',
		name: 'api',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getApiOptions', // This method must be defined in loadOptions
			loadOptionsDependsOn: ['operation', 'endpoint'], // Depends on
		},
		default: '',
		displayOptions: {
			hide: {
				operation: ['authorization', 'getMetadata', 'customConfig'],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-options
		description:
			'Api related to operation. Choose from the <a href="https://developer.payspace.com/">, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
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
		hint: "Id could be 'EmployeeId' or 'EmployeePositionId' depend on the api",
		default: '',
		description:
			'Enter the ID for the api operation. Please visit https://developer.payspace.com/ and see the ID in the URL if you are not sure.',
		displayOptions: {
			show: {
				api: dynamicIdDisplayArray,
			},
		},
	},
	{
		displayName: 'UserWorkflowStepId',
		name: 'UserWorkflowStepId',
		type: 'string',
		hint: 'workflowId',
		default: '',
		description:
			'Enter the ID for the api operation. Please visit https://developer.payspace.com/ and see the ID in the URL if you are not sure.',
		displayOptions: {
			show: {
				api: ['getASingleEmployeeWorkflowRecord', 'submitWorkflowStep'],
			},
		},
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		default: '',
		description: 'Enter the CATEGORY',
		displayOptions: {
			show: {
				api: ['getCollectionOfCustomFormsByCategory'],
			},
		},
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'string',
		default: '',
		description: 'Use the value field from the CompanyRun lookup',
		displayOptions: {
			show: {
				api: ['updatePayslipComment'],
			},
		},
	},
	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'string',
		default: '',
		description: 'Use the value field from the CompanyFrequency lookup',
		displayOptions: {
			show: {
				api: ['updatePayslipComment'],
			},
		},
	},
	{
		displayName: 'Body (Raw)',
		name: 'assignments',
		type: 'json',
		default: {},
		description:
			'See in metadata endpoint for available fields OR visit https://developer.payspace.com/ if you are not sure',
		displayOptions: {
			show: {
				api: displayBodyRaw,
			},
		},
	},
	{
		displayName: 'Optional Params',
		name: 'additionalFields',
		placeholder: 'Additional optional params',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		description: 'Optional query parameter',
		options: [
			{
				name: 'params',
				displayName: 'Parameters',
				values: [
					{
						displayName: 'Order By',
						name: 'orderBy',
						type: 'string',
						description: 'Optional (string) - Specifies the order in which items are returned',
						default: '',
					},
					{
						displayName: 'Top',
						name: 'top',
						type: 'number',
						description:
							'Optional (integer($int32)) - Limits the number of items returned from a collection',
						default: 100,
					},
					{
						displayName: 'Skip',
						name: 'skip',
						type: 'number',
						description:
							'Optional (integer($int32)) - Excludes the specified number of items of the queried collection from the result',
						default: 0,
					},
					{
						displayName: 'Count',
						name: 'count',
						type: 'boolean',
						description: 'Whether the service returns only the count of objects in the collection',
						default: true,
					},
					{
						displayName: 'Select',
						name: 'select',
						type: 'string',
						description: 'Optional (string) - Returns only the fields specified',
						default: '',
					},
					{
						displayName: 'Filter',
						name: 'filter',
						type: 'string',
						// eslint-disable-next-line n8n-nodes-base/node-param-description-unneeded-backticks
						description: `Filter by field eg. "EmployeeNumber eq 'Emp01'". see https://docs.microsoft.com/en-us/dynamics-nav/using-filter-expressions-in-odata-uris`,
						default: '',
					},
					{
						displayName: 'componentCodes',
						name: 'componentCodes',
						type: 'string',
						// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
						description:
							'Optional - A comma seperated list of component codes to returneg. BAS,COMM',
						default: '',
						displayOptions: {
							show: {
								api: ['getACollectionOfConsolidatedPayslips'],
							},
						},
					},
					{
						displayName: 'altLanguage',
						name: 'altLanguage',
						type: 'boolean',
						description: 'Whether - Retrieves the payslip components in the alternative language',
						default: true,
						displayOptions: {
							show: {
								api: ['getACollectionOfPayslipsPDFs'],
							},
						},
					},
				],
			},
		],
		//	displayOptions: {
		//	show: {
		//	api: displayAdditionalFields,
		//},
		//},
	},
	{
		displayName: 'Axios Config',
		name: 'customConfig',
		type: 'json',
		default: `${requestData}`,
		placeholder: `${requestData}`,
		description: 'Custom configuration',
		displayOptions: {
			show: {
				operation: ['customConfig'],
			},
		},
	},
	{
		displayName: 'This node is still in beta',
		name: 'notice',
		type: 'notice',
		default: '',
	},
];
