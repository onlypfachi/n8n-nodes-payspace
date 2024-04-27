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
export const suspensionEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Suspension',
		value: 'suspension',
	}
];
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
		value: 'getASingleEmployeeAttachmentRecord',
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
	},
];
export const projectDetailsApiOptions = [
	{
		name: 'Get a Collection of Projects',
		value: 'getACollectionOfProjects',
	},
	{
		name: 'Get a Collection of Projects as of an Effective Date',
		value: 'getACollectionOfProjectsAsOfAnEffectiveDate',
	},
	{
		name: 'Get a Single Project Record',
		value: 'getASingleProjectRecord',
	},
	{
		name: 'Create a Single Project Record',
		value: 'createASingleProjectRecord',
	},
	{
		name: 'Update a Single Project Record',
		value: 'updateASingleProjectRecord',
	},
	{
		name: 'Delete a Single Project Record',
		value: 'deleteASingleProjectRecord',
	},
];
export const assetApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Get Single Record',
		value: 'getSingleRecord',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Single Record',
		value: 'updateSingleRecord',
	},
	{
		name: 'Delete Single Record',
		value: 'deleteSingleRecord',
	},
];
export const employeeCustomFormsApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Get Collection by Category',
		value: 'getCollectionByCategory',
	},
	{
		name: 'Get Single',
		value: 'getSingle',
	},
	{
		name: 'Post',
		value: 'post',
	},
	{
		name: 'PATCH',
		value: 'patch',
	},
	{
		name: 'Delete',
		value: 'delete',
	},
];
export const employeeInboxApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
];
export const incidentManagementApiOptions = [
	{
		name: 'Get a Collection',
		value: 'getACollection',
	},
	{
		name: 'Get Single',
		value: 'getSingle',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Single Record',
		value: 'updateSingleRecord',
	},
	{
		name: 'Delete Single Record',
		value: 'deleteSingleRecord',
	},
];
export const payRateDetailsApiOptions = [
	{
		name: 'Get a Collection of Pay Rates',
		value: 'getACollectionOfPayRates',
	},
	{
		name: 'Get a Single Pay Rate Record',
		value: 'getASinglePayRateRecord',
	},
	{
		name: 'Get a Collection of Pay Rates as of an Effective Date',
		value: 'getACollectionOfPayRatesAsOfAnEffectiveDate',
	},
	{
		name: 'Create a Single Pay Rate Record',
		value: 'createASinglePayRateRecord',
	},
	{
		name: 'Update a Single Pay Rate Record',
		value: 'updateASinglePayRateRecord',
	},
	{
		name: 'Delete a Single Pay Rate Record',
		value: 'deleteASinglePayRateRecord',
	},
];
export const recurringComponentsNestedOptions = [
	// Load endpoints not APIs

	{
		name: 'Bonus Provision',
		value: 'bonusProvision',
	},
	{
		name: 'Company Car',
		value: 'companyCar',
	},
	{
		name: 'Employee Components',
		value: 'employeeComponents',
	},
	{
		name: 'Group Life',
		value: 'groupLife',
	},
	{
		name: 'Income Protection',
		value: 'incomeProtection',
	},
	{
		name: 'Medical Aid',
		value: 'medicalAid',
	},
	{
		name: 'Saving',
		value: 'saving',
	},
	{
		name: 'Travel Business Usage',
		value: 'travelBusinessUsage',
	},
	{
		name: 'Garnishees',
		value: 'garnishees',
	},
	{
		name: 'Unions',
		value: 'unions',
	},
	{
		name: 'Disability',
		value: 'disability',
	},
	{
		name: 'Retirement Annuity',
		value: 'retirementAnnuity',
	},
	{
		name: 'Pension',
		value: 'pension',
	},
	{
		name: 'Loans',
		value: 'loans',
	},
	{
		name: 'House Payment',
		value: 'housePayment',
	},
];
export const takeOnYearToDateFiguresApiOptions = [
	{
		name: 'Get a Collection of Take on Records',
		value: 'getACollectionOfTakeOnRecords',
	},
	{
		name: 'Get a Single Take on Record',
		value: 'getACollectionOfTakeOnRecord',
	},
	{
		name: 'Create a Single Take on Record',
		value: 'createACollectionOfTakeOnRecord',
	},
	{
		name: 'Update a Single Take on Record',
		value: 'updateASingleOfTakeOnRecord',
	},
];

export const recurringTemplatesApiOptions = [
	{
		name: 'Add a Single Recurring Template to an Employee',
		value: 'addASingleRecurringTemplateToAnEmployee',
	},
];
export const claimsApiOptions = [

	{
		name: 'Get a Collection of Claims',
		value: 'getACollectionOfClaims',
	},
	{
		name: 'Get a Single Employee Claim Record',
		value: 'getASingleEmployeeClaimRecord',
	},
	{
		name: 'Create a Single Employee Claim Record',
		value: 'createASingleEmployeeClaimRecord',
	},
	{
		name: 'Upload Claim Attachment',
		value: 'uploadClaimAttachment',
	},
	{
		name: 'Update a Single Employee Claim Record',
		value: 'updateASingleEmployeeClaimRecord',
	},
	{
		name: 'Delete a Single Employee Claim Record',
		value: 'deleteASingleEmployeeClaimRecord',
	},
	{
		name: 'Submit Employee Claim Batch for Workflow',
		value: 'submitEmployeeClaimBatchForWorkflow',
	},
];
export const claimEmployeeWorkflowApiOptions = [
	{
		name: 'Get a Single Employee Workflow Record',
		value: 'getASingleEmployeeWorkflowRecord',
	},
	{
		name: 'Submit Workflow Step',
		value: 'submitWorkflowStep',
	},
];

// TODO: map recurring components nested endpoints to api
// TODO: remove duplications

export const bonusProvisionApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const companyCarApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const employeeComponentsApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}

];
export const groupLifeApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const incomeProtectionApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const medicalAidApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}

];
export const savingApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const travelBusinessUsageApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}

];
export const garnisheesApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const unionsApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const disabilityApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const retirementAnnuityApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const pensionApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const loansApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const housePaymentApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];

export const payslipsApiOptions = [

	{
		name: 'Get a Collection of Payslips',
		value: 'getACollectionOfPayslips',
	},
	{
		name: 'Get a Collection of Payslips Lines',
		value: 'getACollectionOfPayslipsLines',
	},
	{
		name: 'Get a Collection of Costed Payslips Lines',
		value: 'getACollectionOfCostedPayslipsLines',
	},
	{
		name: 'Get a Collection of Consolidated Payslips',
		value: 'getACollectionOfConsolidatedPayslips',
	},
	{
		name: 'Get a Collection of Payslip PDFs',
		value: 'getACollectionOfPayslipsPDFs',
	},
	{
		name: 'Update Payslip Comment',
		value: 'updatePayslipComment',
	},
	{
		name: 'Get a Single Payslip PDF',
		value: 'getASinglePayslipPDF',
	},
];
export const editPayslipApiOptions = [
	{
		name: 'Get a Collection of Edit Payslip Records',
		value: 'getACollectionOfEditPayslipRecords',
	},
	{
		name: 'Get a Single Edit Payslip Record',
		value: 'getASingleEditPayslipRecord',
	},
	{
		name: 'Create a Single Edit Payslip Record',
		value: 'createASingleEditPayslipRecord',
	},
	{
		name: 'Update a Single Edit Payslip Record',
		value: 'updateASingleEditPayslipRecord',
	},
	{
		name: 'Batch Updates',
		value: 'batchUpdates',
	},
	{
		name: 'Delete a Single Edit Payslip Record',
		value: 'deleteASingleEditPayslipRecord',
	},
];
export const taxCertificatesApiOptions = [
	{
		name: 'Get a Collection of Tax Certificates',
		value: 'getACollectionOfTaxCertificates',
	},
];
export const adjustmentsApiOptions = [

	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Get Collection By Period',
		value: 'getCollectionByPeriod',
	},
	{
		name: 'Get Single',
		value: 'getSingle',
	},
	{
		name: 'Patch Existing',
		value: 'patchExisting',
	},
	{
		name: 'Create New',
		value: 'createNew',
	},
	{
		name: 'Delete Existing',
		value: 'deleteExisting',
	},
	{
		name: '[OBSOLETE] Get a Collection of Leave Transactions',
		value: 'getACollectionOfLeaveTransactions',
	},
];
export const setupApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create New',
		value: 'createNew',
	},
	{
		name: 'Get Single',
		value: 'getSingle',
	},
	{
		name: 'Delete Existing',
		value: 'deleteExisting',
	}
];
export const applicationApiOptions = [

	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Get Collection By Period',
		value: 'getCollectionByPeriod',
	},
	{
		name: 'Get Single',
		value: 'getSingle',
	},
	{
		name: 'Patch Existing',
		value: 'patchExisting',
	},
	{
		name: 'Create New',
		value: 'createNew',
	},
	{
		name: 'Delete Existing',
		value: 'deleteExisting',
	},
];

export const suspensionApiOptions = [

	{
		name: 'Get a Collection of Suspensions',
		value: 'getACollectionOfSuspensions',
	},
	{
		name: 'Get a Single Suspension Record',
		value: 'getASingleSuspensionRecord',
	},
	{
		name: 'Create a Single Suspension Record',
		value: 'createASingleSuspensionRecord',
	},
	{
		name: 'Update a Single Suspension Record',
		value: 'updateASingleSuspensionRecord',
	},
	{
		name: 'Delete a Single Suspension Record',
		value: 'deleteASingleSuspensionRecord',
	},
];
export const simpleApiOptions = [ // TODO: simpleApiOptions
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{
		name: 'Create Record',
		value: 'createRecord',
	},
	{
		name: 'Update Existing Record',
		value: 'updateExistingRecord',
	},
	{
		name: 'Delete Existing Record',
		value: 'deleteExistingRecord',
	}
];
export const outOfOfficeApiOptions = simpleApiOptions // using simpleApiOptions

export const notesApiOptions = simpleApiOptions

export const employeeTrainingApiOptions = simpleApiOptions // using simpleApiOptions changed (single to existing)
export const employeeQualificationsApiOptions = simpleApiOptions // using simpleApiOptions changed (single to existing)
export const employeeSkillsApiOptions = simpleApiOptions // using simpleApiOptions changed (single to existing)

export const recurringCostingSplitApiOptions = [
	{
		name: 'Get Collection',
		value: 'getCollection',
	},
	{ name: 'Get a Collection as of an Effective Date',
		value: 'getACollectionAsOfAnEffectiveDate',
	},
	{ name: 'Get a Collection of All Records',
		value: 'getACollectionOfAllRecords',
	}
];

export const employeeReviewHeaderApiOptions =[{
	name: 'Get Collection',
	value: 'getCollection',
},];
export const employeeReviewKPAApiOptions =[{
	name: 'Get Collection',
	value: 'getCollection',
},];
export const employeeReviewTemplateApiOptions =[{
	name: 'Get Collection',
	value: 'getCollection',
},];

