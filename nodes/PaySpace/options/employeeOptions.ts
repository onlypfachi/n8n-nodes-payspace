import { INodePropertyOptions } from "n8n-workflow";

export const employeeEndpointCollectionsOptions = [
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

export const basicInformationEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Assets',
		value: 'assets',
	},
	{
		name: 'Attachments',
		value: 'attachments',
	},
	{
		name: 'Banking Details',
		value: 'bankingDetails',
	},
	{
		name: 'Biographical',
		value: 'biographical',
	},
	{
		name: 'Dependants',
		value: 'dependants',
	},
	{
		name: 'Employee Custom Forms',
		value: 'employeeCustomForms',
	},
	{
		name: 'Employee Inbox',
		value: 'employeeInbox',
	},
	{
		name: 'EmployeeAddress',
		value: 'employeeAddress',
	},
	{
		name: 'Incident Management',
		value: 'incidentManagement',
	},
	{
		name: 'Positions',
		value: 'positions',
	},
	{
		name: 'Project Details',
		value: 'projectDetails',
	},
	{
		name: 'Tax Profile',
		value: 'taxProfile',
	},
];

export const biographicalApiOptions: INodePropertyOptions[] = [
	{
		name: 'Create a Single Employee Record',
		value: 'createASingleEmployeeRecord',
	},
	{
		name: 'Download Employee Photo',
		value: 'downloadEmployeePhoto',
	},
	{
		name: 'Get a Collection of Employees',
		value: 'getACollectionOfEmployees',
	},
	{
		name: 'Get a Collection of Employees as of an Effective Date',
		value: 'getACollectionOfEmployeesAsOfAnEffectiveDate',
	},
	{
		name: 'Get a Single Employee Record',
		value: 'getASingleEmployeeRecord',
	},
	{
		name: 'Update a Single Employee Record',
		value: 'updateASingleEmployeeRecord',
	},
	{
		name: 'Upload Employee Photo',
		value: 'uploadEmployeePhoto',
	},
];

export const employeeAddressApiOptions = [
	{
		name: 'Get An Employee Address',
		value: 'getAnEmployeeAddress',
	},
	{
		name: 'Update A Single Employee Address',
		value: 'updateASingleEmployeeAddress',
	},
];

export const taxProfilesApiOptions = [
	{
		name: 'Get a Collection of Employment Statuses',
		value: 'getACollectionOfEmploymentStatuses',
	},
	{
		name: 'Get a Single Employment Status Record',
		value: 'getASingleEmploymentStatusRecord',
	},
	{
		name: 'Get a Collection of Employment Statuses as of an Effective Date',
		value: 'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate',
	},
	{
		name: 'Get a Collection of All Employment Statuses',
		value: 'getACollectionOfAllEmploymentStatuses',
	},
	{
		name: 'Create a Single Employment Status Record',
		value: 'createASingleEmploymentStatusRecord',
	},
	{
		name: 'Update a Single Employment Status Record',
		value: 'updateASingleEmploymentStatusRecord',
	},
	{
		name: 'EmploymentStatus: EmployeeTermination',
		value: 'employmentStatusEmployeeTermination',
	},
	{
		name: 'EmploymentStatus: Reinstate Same Record',
		value: 'employmentStatusReinstateSameRecord',
	},
	{
		name: 'EmploymentStatus: Reinstate With New Tax Record',
		value: 'employmentStatusReinstateWithNewTaxRecord',
	},
	{
		name: 'Delete a Single Employment Status Record',
		value: 'deleteASingleEmploymentStatusRecord',
	},
];
