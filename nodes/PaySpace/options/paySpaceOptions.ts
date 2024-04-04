import { INodeProperties } from 'n8n-workflow';

export const operationsOptions = [
	{
		name: 'Authentication',
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
	{
		name: 'Company',
		value: 'company',
	},
	{
		name: 'Lookup Values',
		value: 'lookupValues',
	},
	{
		name: 'File Upload',
		value: 'fileUpload',
	},
	{
		name: 'Webhooks',
		value: 'webhooks',
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

export const dynamicDisplayNameApiDisplayArray= [
	'getACollectionOfEmployeesAsOfAnEffectiveDate',
	'uploadEmployeePhoto',
	'downloadEmployeePhoto',
	'createASingleEmployeeRecord',
	'getASingleEmployeeRecord',
	'employmentStatusReinstateSameRecord',
	'employmentStatusReinstateWithNewTaxRecord',
	'deleteASingleEmploymentStatusRecord',
	'employmentStatusEmployeeTermination',
];
