import { INodeProperties } from 'n8n-workflow';
import { operationsOptions, paramsOptions, scopeOptions } from './options/main.options';
import * as PaySpaceUtils from './paySpace.utils';

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
		default: 'employee',
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
				operation: ['employee'],
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
		displayName: 'Api Name or ID',
		name: 'api',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getApiOptions', // This method must be defined in loadOptions
			loadOptionsDependsOn: ['endpoint'], // Depends on
		},
		default: '',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
		description:
			'Api related to operation. Choose from the list <a href="https://developer.payspace.com/">list</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'This node is still in development: If any of the above options or property is not loaded please save the workflow and reopen the node',
		name: 'notice',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Token',
		name: 'token',
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
		placeholder: '123456789',
	},

	{
		displayName: 'Status ID',
		name: 'StatusId',
		type: 'string',
		default: '',
		description: 'Enter the status ID associated',
		displayOptions: {
			show: {
				api: [
					'getASingleEmploymentStatusRecord',
					'updateASingleEmploymentStatusRecord',
					'employmentStatusEmployeeTermination',
					'employmentStatusReinstateWithNewTaxRecord',
					'employmentStatusReinstateSameRecord',
				],
			},
		},
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
				],
			},
		},
	},
	{
		displayName: 'Employee ID',
		name: 'employeeId',
		type: 'string',
		default: '',
		description: 'Enter the employee ID associated',
		displayOptions: {
			show: {
				api: ['getASingleEmployeeRecord'],
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
		displayName: 'Address ID',
		name: 'addressId',
		type: 'string',
		default: '',
		description: 'Enter the address ID associated',
		displayOptions: {
			show: {
				api: ['updateASingleEmployeeAddressRecord'],
			},
		},
	},
	{
		displayName: 'Data (JSON)',
		name: 'bodyData',
		type: 'json',
		default: { key: 'value' },
		placeholder: PaySpaceUtils.getBodyDataPlaceholder('{{ $parameter["api"] }}'),
		description: 'Body data that needs to be passed in the URL as body JSON',
		displayOptions: {
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
				],
			},
		},
	},
];
