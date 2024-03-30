import { INodeProperties } from 'n8n-workflow';

export const endpointsOptions = [
	{
		name: 'Assets',
		value: 'assets',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Attachments',
		value: 'attachments',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Banking Details',
		value: 'bankingDetails',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Biographical',
		value: 'biographical',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Dependants',
		value: 'dependants',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Employee Custom Forms',
		value: 'employeeCustomForms',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Employee Inbox',
		value: 'employeeInbox',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'EmployeeAddress',
		value: 'employeeAddress',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Incident Management',
		value: 'incidentManagement',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Positions',
		value: 'positions',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Project Details',
		value: 'projectDetails',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
	{
		name: 'Tax Profile',
		value: 'taxProfile',
		displayOptions: {
			show: {
				operation: ['employee'],
				endpointCollection: ['basicInformation'],
			},
		},
	},
];

export const operationsOptions = [
	{
		name: 'Get Token',
		value: 'getToken',
	},
	{
		name: 'Get Metadata',
		value: 'getMetadata',
	},
	{
		name: 'Employee',
		value: 'employee',
	},
];

export const endpointCollectionsOptions = [
	{
		name: 'Basic Information',
		value: 'basicInformation',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Costing',
		value: 'costing',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Leave',
		value: 'leave',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Other',
		value: 'other',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Payroll Processing',
		value: 'payrollProcessing',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Payroll Results',
		value: 'payrollResults',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Performance Management',
		value: 'performanceManagement',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Skills',
		value: 'skills',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
	{
		name: 'Suspension',
		value: 'suspension',
		displayOptions: {
			show: {
				operation: ['employee'],
			},
		},
	},
];


export const scopeOptions = [
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
];

export const paramsOptions: INodeProperties[] = [
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
		description:
			'Filter by field eg. "EmployeeNumber eq Emp01". see https://docs.microsoft.com/en-us/dynamics-nav/using-filter-expressions-in-odata-uris',
		default: '',
	},
];
