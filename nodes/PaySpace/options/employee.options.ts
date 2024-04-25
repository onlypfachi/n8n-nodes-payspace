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

export const payrollProcessingEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Pay Rate Details',
		value: 'payRateDetails',
	},
	{
		name: 'Recurring Components',
		value: 'recurringComponents',
	},
	{
		name: 'Take On Year To Date Figures',
		value: 'takeOnYearToDateFigures',
	},
	{
		name: 'Recurring Templates',
		value: 'recurringTemplates',
	},
	{
		name: 'Claims',
		value: 'claims',
	},
	{
		name: 'Claim Employee Workflow',
		value: 'claimEmployeeWorkflow',
	},
];

export const payrollResultsEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Payslips',
		value: 'payslips',
	},
	{
		name: 'Edit Payslip',
		value: 'editPayslip',
	},
	{
		name: 'Tax Certificates',
		value: 'taxCertificates',
	},
];
export const leaveEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Adjustments',
		value: 'adjustments',
	},
	{
		name: 'Setup',
		value: 'setup',
	},
	{
		name: 'Application',
		value: 'application',
	},
];
export const suspensionEndpointsCollectionOptions: INodePropertyOptions[] = [];
export const otherEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Out Of Office',
		value: 'outOfOffice',
	},
	{
		name: 'Notes',
		value: 'notes',
	},
];
export const skillsEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Employee Training',
		value: 'employeeTraining',
	},
	{
		name: 'Employee Qualifications',
		value: 'employeeQualifications',
	},
	{
		name: 'Employee Skills',
		value: 'employeeSkills',
	},
];
export const costingEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Recurring Costing Split',
		value: 'recurringCostingSplit',
	},
];
export const performanceManagementEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Employee Review Header',
		value: 'employeeReviewHeader',
	},
	{
		name: 'Employee Review KPA',
		value: 'employeeReviewKPA',
	},
	{
		name: 'Employee Review Template',
		value: 'employeeReviewTemplate',
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

export const PayslipsApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Payslips',
		value: 'getACollectionOfPayslips',
	},
	{
		name: 'Get a Collection of Payslips Lines',
		value: 'getACollectionOfPayslipsLines',
	},
	{
		name: '',
		value: '',
	},
	{
		name: '',
		value: '',
	},
	{
		name: '',
		value: '',
	},
	{
		name: '',
		value: '',
	},
	{
		name: '',
		value: '',
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

export const positionsApiOptions = [
	{
		name: 'Get a Collection of Positions',
		value: 'getCollectionOfPositions',
	},
	{
		name: 'Get a Single Position Record',
		value: 'getASinglePositionRecord',
	},
	{
		name: 'Get a Collection of Positions as of an Effective Date',
		value: 'getACollectionOfPositions',
	},
	{
		name: 'Create a Single Position Record',
		value: 'createASinglePositionRecord',
	},
	{
		name: 'Update a Single Position Record',
		value: 'updateASinglePositionRecord',
	},
	{
		name: 'Delete a Single Position Record',
		value: 'deleteASinglePositionRecord',
	},
];

export const bankDetailsApiOptions = [
	{
		name: 'Get a Collection of Bank Detail Records',
		value: 'getACollectionOfBankDetailRecords',
	},
	{
		name: 'Get a Single Bank Detail Record',
		value: 'getASingleBankDetailRecord',
	},
	{
		name: 'Create a Single Bank Detail Record',
		value: 'createASingleBankDetailRecord',
	},
	{
		name: 'Update a Single Bank Detail Record',
		value: 'updateASingleBankDetailRecord',
	},
	{
		name: 'Delete a Single Bank Detail Record',
		value: 'deleteASingleBankDetailRecord',
	},
];
export const dependantsApiOptions = [
	{
		name: 'Get a Collection of Dependants',
		value: 'getACollectionOfDependants',
	},
	{
		name: 'Get a Single Dependant Record',
		value: 'getASingleDependantRecord',
	},
	{
		name: 'Create a Single Dependant Record',
		value: 'createASingleDependantRecord',
	},
	{
		name: 'Update a Single Dependant Record',
		value: 'updateASingleDependantRecord',
	},
	{
		name: 'Delete a Single Dependant Record',
		value: 'deleteASingleDependantRecord',
	},
	{
		name: 'Dependants Quick Add',
		value: 'dependantsQuickAdd',
	},
];
export const attachmentsApiOptions = [
	{
		name: 'Get a Collection of Employee Attachment Records',
		value: 'getACollectionOfEmployeeAttachmentRecords',
	},
	{
		name: 'Get a Single Employee Attachment Record',
		value: 'getASingleEmployeeAttachmentRecord'
	},
	{
		name: 'Create a Single Employee Attachment Record',
		value: 'createASingleEmployeeAttachmentRecord',
	},
	{
		name: 'Update a Single Employee Attachment Record',
		value: 'updateASingleEmployeeAttachmentRecord',
	},
	{
		name: 'Delete a Single Employee Attachment',
		value: 'deleteASingleEmployeeAttachment',
	}
];
export const projectDetailsApiOptions = [
	{
		name: 'Get a Collection of Projects',
		value: 'getACollectionOfProjects'
	},
	{
		name: 'Get a Collection of Projects as of an Effective Date',
		value: 'getACollectionOfProjectsAsOfAnEffectiveDate'
	},
	{
		name: 'Get a Single Project Record',
		value: 'getASingleProjectRecord'
	},
	{
		name: 'Create a Single Project Record',
		value: 'createASingleProjectRecord'
	},
	{
		name: 'Update a Single Project Record',
		value: 'updateASingleProjectRecord'
	},
	{
		name: 'Delete a Single Project Record',
		value: 'deleteASingleProjectRecord'
	}

];
export const assetApiOptions = [
	{
		name: '',
		value: ''
	},
];
export const employeeCustomFormsApiOptions = [
	{
		name: '',
		value: ''
	},
];
export const employeeInboxApiOptions = [
	{
		name: '',
		value: ''
	},
];
export const incidentManagementApiOptions = [
	{
		name: '',
		value: ''
	},
];
