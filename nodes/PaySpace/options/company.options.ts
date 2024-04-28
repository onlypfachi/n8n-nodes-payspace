import { INodePropertyOptions } from 'n8n-workflow';
export const companyEndpointCollectionsOptions: INodePropertyOptions[] = [
	{
		name: 'General Ledger',
		value: 'generalLedger',
	},
	{
		name: 'EFT Outbox',
		value: 'eftOutbox',
	},
	{
		name: 'Configuration',
		value: 'configuration',
	},
	{
		name: 'Company Custom Forms',
		value: 'companyCustomForms',
	},
	{
		name: 'Billing',
		value: 'billing',
	},
	{
		name: 'Costing Project Activity',
		value: 'costingProjectActivity',
	},
	{
		name: 'Regions',
		value: 'regions',
	},
];
export const generalLedgerEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'General Ledger',
		value: 'generalLedger',
	},
];

export const EFTOutboxEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'EFT Outbox',
		value: 'eftOutbox',
	},
];

export const configurationEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Organization Position Details',
		value: 'organizationPositionDetails',
	},
	{
		name: 'Organization Hierarchy Units',
		value: 'organizationHierarchyUnits',
	},
	{
		name: 'Job Management',
		value: 'jobManagement',
	},
	{
		name: 'Job Management Budget Cost',
		value: 'jobManagementBudgetCost',
	},
	{
		name: 'Budget Archive Report',
		value: 'budgetArchiveReport',
	},
	{
		name: 'Currency Exchange Rates',
		value: 'currencyExchangeRates',
	},
	{
		name: 'Workday',
		value: 'workday',
	},
	{
		name: 'Training Course',
		value: 'trainingCourse',
	},
	{
		name: 'Company Review Process',
		value: 'companyReviewProcess',
	},
];

export const companyCustomFormsEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Company Custom Form Options',
		value: 'companyCustomFormOptions',
	},
];

export const billingEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Billing Endpoints',
		value: 'billingEndpoints',
	},
];
export const costingProjectActivityEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Costing Project Activity Endpoints',
		value: 'costingProjectActivityEndpoints',
	},
];

export const regionsEndpointsCollectionOptions: INodePropertyOptions[] = [
	{
		name: 'Region',
		value: 'region',
	},
	{
		name: 'Region History',
		value: 'regionHistory',
	},
];

// API options

export const generalLedgerApiOptions: INodePropertyOptions[] = [
	{
		name: 'Start General Ledger Data Processing',
		value: 'startGeneralLedgerDataProcessing',
	},
	{
		name: 'Get General Ledger Extraction Status',
		value: 'getGeneralLedgerExtractionStatus',
	},
	{
		name: 'Get General Ledger Extraction Results',
		value: 'getGeneralLedgerExtractionResults',
	},
];

export const eftOutboxApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get EFT Files in Publish Outbox',
		value: 'getEFTFilesInPublishOutbox',
	},
];

export const organizationPositionDetailsApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Organization Positions',
		value: 'getACollectionOfOrganizationPositions',
	},
	{
		name: 'Get a Single Organization Position Record',
		value: 'getASingleOrganizationPositionRecord',
	},
	{
		name: 'Create a Single Organization Position Record',
		value: 'createASingleOrganizationPositionRecord',
	},
	{
		name: 'Update a Single Organization Position Record',
		value: 'updateASingleOrganizationPositionRecord',
	},
	{
		name: 'Delete a Single Organization Position Record',
		value: 'deleteASingleOrganizationPositionRecord',
	},
];
export const organizationHierarchyUnitsApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Organization Units',
		value: 'getACollectionOfOrganizationUnits',
	},
	{
		name: 'Get a Single Organization Unit Record',
		value: 'getASingleOrganizationUnitRecord',
	},
	{
		name: 'Create a Single Organization Unit Record',
		value: 'createASingleOrganizationUnitRecord',
	},
	{
		name: 'Update a Single Organization Unit Record',
		value: 'updateASingleOrganizationUnitRecord',
	},
	{
		name: 'Delete a Organization Unit Project Record',
		value: 'deleteASingleOrganizationUnitProjectRecord',
	},
];

export const jobManagementApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Job Management Records',
		value: 'getACollectionOfJobManagementRecords',
	},
	{
		name: 'Get a Single Job Management Record',
		value: 'getASingleJobManagementRecord',
	},
];

export const jobManagementBudgetCostApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Job Management Budget Cost Records',
		value: 'getACollectionOfJobManagementBudgetCostRecords',
	},
];

export const budgetArchiveReportApiOptions: INodePropertyOptions[] = [
	{
		name: 'Start Snapshot Period Based Budget Archive Employee Data Processing.',
		value: 'startSnapshotPeriodBasedBudgetArchiveEmployeeDataProcessing',
		description:
			'This starts processing the data for a budget archive employee extract based on the specified snapshot CompanyBudgetPeriod for a specific company-ID',
	},
	{
		name: 'Get Budget Archive Employee Extraction Status.',
		value: 'getBudgetArchiveEmployeeExtractionStatus',
		description:
			'This retrieves a BudgetArchiveExtractionProgress object with a DownloadUrl which can be used to retrieve the result once the Status is Completed',
	},
	{
		name: 'Start Archive Period Based Budget Archive Employee Data Processing.',
		value: 'startArchivePeriodBasedBudgetArchiveEmployeeDataProcessing',
		description:
			'This starts processing the data for a budget archive employee extract based on the specified CompanyBudgetSnapshotArchive for a specific company-ID',
	},
	{
		name: 'Start Date Range Based Budget Archive Employee Data Processing.',
		value: 'startDateRangeBasedBudgetArchiveEmployeeDataProcessing',
		description:
			'This starts processing the data for a budget archive employee extract based on the specified Start date and End date for a specific company-ID',
	},
	{
		name: 'Start Snapshot Period Based Budget Archive Organization Data Processing.',
		value: 'startSnapshotPeriodBasedBudgetArchiveOrganizationDataProcessing',
		description:
			'Retrieves a list of budget archive organization records based on the specified snapshot CompanyBudgetPeriod for a specific company-ID',
	},
	{
		name: 'Get Budget Archive Organization Extraction Status.',
		value: 'getBudgetArchiveOrganizationExtractionStatus',
		description:
			'This retrieves a BudgetArchiveExtractionProgress object with a DownloadUrl which can be used to retrieve the result once the Status is Completed',
	},
	{
		name: 'Start Archive Period Based Budget Archive Organization Data Processing.',
		value: 'startArchivePeriodBasedBudgetArchiveOrganizationDataProcessing',
		description:
			'This starts processing the data for a budget archive organization extract based on the specified CompanyBudgetSnapshotArchive for a specific company-ID',
	},
	{
		name: 'Start Date Range Based Budget Archive Organization Data Processing',
		value: 'startDateRangeBasedBudgetArchiveOrganizationDataProcessing',
		description:
			'This starts processing the data for a budget archive organization extract based on the specified Start date and End date for a specific company-ID',
	},
];

export const currencyExchangeRatesApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get Collection of Currency Exchange Rate Records',
		value: 'getCollectionOfCurrencyExchangeRateRecords',
	},
	{
		name: 'Get Collection on Currency Exchange Rate Records by Effective Date',
		value: 'getCollectionOnCurrencyExchangeRateRecordsByEffectiveDate',
	},
	{
		name: 'Get Single Currency Exchange Rate Record',
		value: 'getSingleCurrencyExchangeRateRecord',
	},
	{
		name: 'Create a Single Currency Exchange Rate Record',
		value: 'createASingleCurrencyExchangeRateRecord',
	},
	{
		name: 'Update a Single Currency Exchange Rate Record',
		value: 'updateASingleCurrencyExchangeRateRecord',
	},
	{
		name: 'Delete a Single Currency Exchange Rate Record',
		value: 'deleteASingleCurrencyExchangeRateRecord',
	},
];

export const workdayApiOptions: INodePropertyOptions[] = [
	{
		name: 'Audit Results',
		value: 'auditResults',
		description:
			'Returns a list of downloadable links for audit reports received on a specific day, Please note that in order to access the endpoint, you need to have the api.workday scope. Therefore, when you authenticate, make sure to request the api.workday scope.',
	},
];

export const trainingCourseApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection of Company Training Courses Records',
		value: 'getACollectionOfCompanyTrainingCoursesRecords',
	},
];

export const companyReviewProcessApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get a Collection',
		value: 'getACollection',
		description:
			'Retrieves a list of active CompanyReviewProcess records based on the specified company_id',
	},
];

export const companyCustomFormOptions: INodePropertyOptions[] = [
{
	name: 'Get Collection',
	value: 'getCollection',
},
	{ name: 'Get Collection by Category',
	value: 'getCollectionByCategory',
},
	{ name: 'Get Single',
	value: 'getSingle',
},
	{ name: 'Post',
	value: 'post',
},
	{ name: 'PATCH',
	value: 'patch',
},
	{ name: 'Delete',
	value: 'delete',
},
];

export const billingEndpointsApiOptions: INodePropertyOptions[]= [
	{
		name: 'Get a Collection of Financial Transactions',
		value: 'getACollectionOfFinancialTransactions',
		description: 'Retrieves a list of financial transactions. The DocumentTotal field is the sum total of all the document lines, and is calculated by using the following formula: ((Quantity X Amount) + VatAmount) for each document line.'
	}
];

export const costingProjectActivityEndpointsApiOptions: INodePropertyOptions[]= [
	{
		name: 'Get a Single',
		value: 'getASingle',
	},
	{
		name: 'Get a Collection',
		value: 'getACollection',
	},

	{
		name: 'Create a Record',
		value: 'createARecord',
	},
	{
		name: 'Update a Single Record',
		value: 'updateASingleRecord',
	},
	{
		name: 'Delete a Single Record',
		value: 'deleteASingleRecord',
	},
]

export const regionApiOptions: INodePropertyOptions[]= [
	{
		name: 'Get a Collection',
		value: 'getACollection',
	},
	{
		name: 'Get a Single',
		value: 'getASingle',
	},
	{
		name: 'Create a Record',
		value: 'createARecord',
	},
	{
		name: 'Update a Single Record',
		value: 'updateASingleRecord',
	},
	{
		name: 'Delete a Single Record',
		value: 'deleteASingleRecord',
	},
]

export const regionHistoryApiOptions: INodePropertyOptions[]= [
	{
		name: 'Get a Collection',
		value: 'getACollection',
	},
	{
		name: 'Get a Single',
		value: 'getASingle',
	},
	{
		name: 'Create a Record',
		value: 'createARecord',
	},
	{
		name: 'Update a Single Record',
		value: 'updateASingleRecord',
	},
	{
		name: 'Delete a Single Record',
		value: 'deleteASingleRecord',
	},
];
