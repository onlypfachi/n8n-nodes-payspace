import { INodePropertyOptions } from 'n8n-workflow';

export const employeeEndpointCollectionsOptions: INodePropertyOptions[] = [
	{
		name: 'Basic Information',
		value: 'basicInformation',
	},
	{
		name: 'Costing',
		value: 'costing',
	},
	{
		name: 'Leave',
		value: 'leave',
	},
	{
		name: 'Other',
		value: 'other',
	},
	{
		name: 'Payroll Processing',
		value: 'payrollProcessing',
	},
	{
		name: 'Payroll Results',
		value: 'payrollResults',
	},
	{
		name: 'Performance Management',
		value: 'performanceManagement',
	},
	{
		name: 'Skills',
		value: 'skills',
	},
	{
		name: 'Suspension',
		value: 'suspension',
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
export const payrollProcessingEndpointsCollectionOptions: INodePropertyOptions[] = [];

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
