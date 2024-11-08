import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import {
	employeeEndpointCollectionsOptions,
	basicInformationEndpointsCollectionOptions,
	payrollProcessingEndpointsCollectionOptions,
	performanceManagementEndpointsCollectionOptions,
	skillsEndpointsCollectionOptions,
	suspensionEndpointsCollectionOptions,
	payrollResultsEndpointsCollectionOptions,
	costingEndpointsCollectionOptions,
	leaveEndpointsCollectionOptions,
	otherEndpointsCollectionOptions,
} from './options/employee.options';
import {
	appendUrl,
	mapApiArray,
	getTokenAndCompany,
	ExecutionAuth,
} from './paySpace.utils';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
	billingEndpointsCollectionOptions,
	companyCustomFormsEndpointsCollectionOptions,
	companyEndpointCollectionsOptions,
	configurationEndpointsCollectionOptions,
	costingProjectActivityEndpointsCollectionOptions,
	EFTOutboxEndpointsCollectionOptions,
	generalLedgerEndpointsCollectionOptions,
	regionsEndpointsCollectionOptions,
} from './options/company.options';
import { properties } from './main.properties';
import { lookUpValueApiOptions } from './options/lookupValues.options';
import { webhooksApiOptions } from './options/webhooks.options';

export class PaySpace implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PaySpace',
		name: 'paySpace',
		icon: 'file:ps.svg',
		group: ['input'],
		version: 1,
		subtitle: `={{$parameter["operation"] !== "employee" && $parameter["operation"] !== "company" ? $parameter["operation"] : $parameter["api"]}}`,
		description: 'Use PaySpace API to manage your PaySpace account',
		defaults: {
			name: 'PaySpace',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clientCredentialApi',
				required: true,
			},
		],
		properties: properties,
	};

	methods = {
		loadOptions: {
			async loadEndpointCollectionOptions(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				let operation = this.getCurrentNodeParameter('operation') as string;

				switch (operation) {
					case 'employee':
						return employeeEndpointCollectionsOptions;
					case 'company':
						return companyEndpointCollectionsOptions;
					default:
						return [];
				}
			},

			async loadEndpointOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let endpointCollection = this.getCurrentNodeParameter('endpointCollection') as string;

				switch (endpointCollection) {
					case 'basicInformation':
						return basicInformationEndpointsCollectionOptions;
					case 'payrollProcessing':
						return payrollProcessingEndpointsCollectionOptions;
					case 'payrollResults':
						return payrollResultsEndpointsCollectionOptions;
					case 'performanceManagement':
						return performanceManagementEndpointsCollectionOptions;
					case 'skills':
						return skillsEndpointsCollectionOptions;
					case 'suspension':
						return suspensionEndpointsCollectionOptions;
					case 'costing':
						return costingEndpointsCollectionOptions;
					case 'leave':
						return leaveEndpointsCollectionOptions;
					case 'other':
						return otherEndpointsCollectionOptions;
					case 'generalLedger':
						return generalLedgerEndpointsCollectionOptions;
					case 'eftOutbox':
						return EFTOutboxEndpointsCollectionOptions;
					case 'configuration':
						return configurationEndpointsCollectionOptions;
					case 'companyCustomForms':
						return companyCustomFormsEndpointsCollectionOptions;
					case 'billing':
						return billingEndpointsCollectionOptions;
					case 'costingProjectActivity':
						return costingProjectActivityEndpointsCollectionOptions;
					case 'regions':
						return regionsEndpointsCollectionOptions;
					default:
						return [];
				}
			},
			async getApiOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let operation = this.getCurrentNodeParameter('operation') as string;

				if (operation === 'lookupValues') {
					return lookUpValueApiOptions;
				} else if (operation === 'webhooks') {
					return webhooksApiOptions;
				} else {
					let endpoint = this.getCurrentNodeParameter('endpoint') as string;
					return mapApiArray[endpoint];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = (await this.getCredentials('clientCredentialApi')) as {
			client_id: string;
			client_secret: string;
			client_scope: string;
			environment: string;
		};
		let responseData: any;

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const apiUrl: string =
					credentials.environment === 'staging'
						? 'https://apistaging.payspace.com/odata/v1.1/'
						: 'https://api.payspace.com/odata/v1.1/';
				const authenticationUrl: string =
					credentials.environment === 'staging'
						? 'https://staging-identity.yourhcm.com/connect/token'
						: 'https://identity.yourhcm.com/connect/token';

				let config: AxiosRequestConfig = {};
				let auth: ExecutionAuth | undefined;

				const client_id = credentials.client_id;
				const client_secret = credentials.client_secret;
				const client_scope = credentials.client_scope;

				// Retrieve company information if operation is not 'authorization'
				const identifier = operation === 'authorization' ? '' : this.getNodeParameter('identifier', i) as string;
				const identifier_field = operation === 'authorization' ? '' : this.getNodeParameter('identifier_field', i) as any;

				// Attempt to get the token and company
				auth = await getTokenAndCompany({
					client_id,
					client_secret,
					url: authenticationUrl,
					client_scope,
					identifier,
					identifier_field,
					node: this.getNode(),
				});

				// Set token and company ID if auth is retrieved successfully
				const paySpaceAccessToken = auth ? `Bearer ${auth.token}` : '';
				let companyId: number | undefined = auth?.company?.company_id;

				if (operation === 'authorization') {
					// Get access token
					const data: string = qs.stringify({
						client_id: client_id,
						client_secret: client_secret,
						scope: client_scope,
					});
					config = {
						method: 'post',
						url: authenticationUrl,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'User-Agent': 'payspace.com',
						},
						data: data,
					};
				} else if (operation === 'getMetadata') {
					config = {
						method: 'get',
						url: `${apiUrl}${companyId}/$metadata`,
						headers: {
							Authorization: paySpaceAccessToken,
						},
					};
				} else if (operation === 'employee') {
					config = {
						maxBodyLength: Infinity,
						url: '',
						headers: {
							Authorization: paySpaceAccessToken,
							'Content-Type': 'application/json',
						},
					};
					const api = this.getNodeParameter('api', i) as string;

					let baseURL: string;

					let employeeId;
					let data;
					let effectiveDate;
					let statusId;
					let positionId;
					let bankDetailId;
					let dependantId;
					let attachmentId;
					let employeeProjectId;
					let employeeAssetId;
					let employeeCustomFormId;
					let IncidentId;
					let payRateId;
					let takeOnId;
					let claimId;
					let claimBatchId;
					let UserWorkflowStepId;
					let period;
					let frequency;
					let paySlipId;
					let month;
					let year;
					const addParams = this.getNodeParameter('addParams', i) as boolean;

					switch (
					api //TODO: ADD DESCRIPTIONS TO OPTIONS
					) {
						case 'getACollectionOfEmployees':
							baseURL = `${apiUrl}${companyId}/Employee?`;
							config.method = 'get';
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfEmployeesAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as string;
							baseURL = `${apiUrl}${companyId}/Employee/effective/${effectiveDate}?`;
							config.method = 'get';
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleEmployeeRecord':
							employeeId = this.getNodeParameter('Id', i) as string;
							config.method = 'get';
							config.url = `${apiUrl}${companyId}/Employee(${employeeId})`;
							break;
						case 'createASingleEmployeeRecord':
							config.url = `${apiUrl}${companyId}/Employee`;
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'updateASingleEmployeeRecord':
							data = this.getNodeParameter('assignments', i) as any;
							employeeId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/Employee(${employeeId})`;
							config.method = 'patch';
							config.data = data;

							break;
						case 'downloadEmployeePhoto': //TODO: Implement upload logic
							const FormDataDownload = require('form-data');
							employeeId = this.getNodeParameter('Id', i) as string;
							config.url = `${apiUrl}${companyId}/Employee/${employeeId}/image/download`;
							data = new FormDataDownload();
							config.data = data;
							config.method = 'get';
							config.headers = {
								Authorization: paySpaceAccessToken,
								...data.getHeaders(),
							};
							break;
						case 'uploadEmployeePhoto': //TODO: Implement upload logic
							const FormDataUpload = require('form-data');
							employeeId = this.getNodeParameter('Id', i) as string;
							const baseURLUpload = `${apiUrl}${companyId}/Employee/${employeeId}/image/upload`;
							data = new FormDataUpload();
							config.url = baseURLUpload;
							config.method = 'post';
							config.data = data;
							config.headers = {
								Authorization: paySpaceAccessToken,
								...data.getHeaders(),
							};
							break;
						case 'getAnEmployeeAddress':
							const EmployeeNumber = this.getNodeParameter('employeeNumber', i) as string;
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeAddress/${EmployeeNumber}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;

							break;
						case 'updateASingleEmployeeAddressRecord':
							const addressId = this.getNodeParameter('Id', i) as string;
							baseURL = `${apiUrl}${companyId}/EmployeeAddress(${addressId})`;
							config.data = this.getNodeParameter('assignments', i) as any; //see "EmployeeAddress" in metadata endpoint for available fields
							config.url = appendUrl(
								baseURL,
								this.getNodeParameter('additionalFields', i) as IDataObject,
							);
							config.method = 'patch';
							config.headers = {
								'Content-Type': 'application/json',
							};
							break;
						case 'getACollectionOfEmploymentStatus':
							baseURL = `${apiUrl}${companyId}/EmployeeEmploymentStatus?`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							config.method = 'get';
							break;
						case 'getASingleEmploymentStatusRecord':
							statusId = this.getNodeParameter('statusId', i) as string;
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`; //
							config.method = 'get';

							break;
						case 'getACollectionOfEmploymentStatusesAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as string;
							config.url = addParams
								? appendUrl(
									`${apiUrl}${companyId}/EmployeeEmploymentStatus/effective/${effectiveDate}`,
									this.getNodeParameter('additionalFields', i) as IDataObject,
								)
								: `${apiUrl}${companyId}/EmployeeEmploymentStatus/effective/${effectiveDate}`; //
							config.method = 'get';

							break;
						case 'getACollectionOfAllEmploymentStatuses':
							baseURL = `${apiUrl}${companyId}/EmployeeEmploymentStatus/all`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL; //
							config.method = 'get';

							break;
						case 'createASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus`;
							config.method = 'post';

							break;
						case 'updateASingleEmploymentStatusRecord':
							config.data = this.getNodeParameter('assignments', i) as any;
							statusId = this.getNodeParameter('Id', i) as string;
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.method = 'patch';
							break;
						case 'employmentStatusEmployeeTermination':
							config.data = this.getNodeParameter('assignments', i) as any;
							statusId = this.getNodeParameter('Id', i) as string;
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.method = 'patch';
							break;
						case 'employmentStatusReinstateSameRecord':
							statusId = this.getNodeParameter('Id', i) as string;
							config.method = 'patch';
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'employmentStatusReinstateWithNewTaxRecord':
							config.data = this.getNodeParameter('assignments', i) as any;
							statusId = this.getNodeParameter('statusId', i) as string;
							config.method = 'patch';
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`;

							break;
						case 'deleteASingleEmploymentStatusRecord':
							config.method = 'delete';
							statusId = this.getNodeParameter('Id', i) as string;
							config.url = `${apiUrl}${companyId}/EmployeeEmploymentStatus(${statusId})`;

							break;
						case 'getACollectionOfPositions': //Position
							baseURL = `${apiUrl}${companyId}/EmployeePosition?`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							config.method = 'get';
							break;
						case 'getASinglePositionRecord':
							positionId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePosition(${positionId})`;
							config.method = 'get';
							break;
						case 'getACollectionOfPositionsAsOfAnEffectiveDate':
							effectiveDate = this.getNodeParameter('effectiveDate', i) as any;
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeePosition/effective/${effectiveDate}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							config.headers = {
								Authorization: paySpaceAccessToken,
							};
							break;
						case 'createASinglePositionRecord':
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePosition(${positionId})`;
							config.method = 'post';
							break;
						case 'updateASinglePositionRecord':
							positionId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePosition(${positionId})`;
							config.method = 'patch';
							break;
						case 'deleteASinglePositionRecord':
							positionId = this.getNodeParameter('Id', i) as string;
							config.method = 'delete';
							config.url = `${apiUrl}${companyId}/EmployeePosition(${positionId})`;
							break;
						case 'getACollectionOfBankDetailRecords': //Bank Details
							baseURL = `${apiUrl}${companyId}/EmployeeBankDetail?`;
							config.method = 'get';
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleBankDetailRecord':
							bankDetailId = this.getNodeParameter('Id', i) as any;
							config.method = 'get';
							config.url = `${apiUrl}${companyId}/EmployeeBankDetail(${bankDetailId})`;
							break;
						case 'createASingleBankDetailRecord':
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeBankDetail`;
							config.method = 'post';
							break;
						case 'updateASingleBankDetailRecord':
							bankDetailId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeBankDetail(${bankDetailId})`;
							config.method = 'patch';
							break;
						case 'deleteASingleBankDetailRecord':
							config.method = 'delete';
							bankDetailId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeBankDetail(${bankDetailId})`;
							break;
						case 'getACollectionOfDependants': //Dependants
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeDependant`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleDependantRecord':
							config.method = 'get';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'createASingleDependantRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant`;
							break;
						case 'updateASingleDependantRecord':
							config.method = 'patch';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'deleteASingleDependantRecord':
							config.method = 'delete';
							dependantId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependant(${dependantId})`;
							break;
						case 'dependantQuickAdd':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeDependantQuickAdd`;
							break;
						case 'getACollectionOfEmployeeAttachments':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeAttachment`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleEmployeeAttachment':
							config.method = 'get';
							attachmentId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAttachment(${attachmentId})`;
							break;
						case 'createASingleEmployeeAttachment':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAttachment`;
							break;
						case 'updateASingleEmployeeAttachment':
							config.method = 'patch';
							attachmentId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAttachment(${attachmentId})`;
							break;
						case 'deleteASingleEmployeeAttachment':
							config.method = 'delete';
							attachmentId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAttachment(${attachmentId})`;
							break;
						case 'getACollectionOfProjects':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeProject`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfProjectsAsOfAnEffectiveDate':
							config.method = 'get';
							effectiveDate = this.getNodeParameter('effectiveDate', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeeProject?effectiveDate=${effectiveDate}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleProjectRecord':
							config.method = 'get';
							employeeProjectId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeProject(${employeeProjectId})`;
							break;
						case 'createASingleProjectRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeProject`;
							break;
						case 'updateASingleProjectRecord':
							config.method = 'patch';
							employeeProjectId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeProject(${employeeProjectId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteASingleProjectRecord':
							config.method = 'delete';
							employeeProjectId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeProject(${employeeProjectId})`;
							break;
						case 'getCollectionOfAssets':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeAsset`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getSingleAssetRecord':
							config.method = 'get';
							employeeAssetId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAsset(${employeeAssetId})`;
							break;
						case 'createSingleAssetRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAsset`;
							break;
						case 'updateSingleAssetRecord':
							config.method = 'patch';
							employeeAssetId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAsset(${employeeAssetId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteSingleAssetRecord':
							config.method = 'delete';
							employeeAssetId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeAsset(${employeeAssetId})`;
							break;
						case 'getCollectionOfCustomForms':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeCustomForm`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getCollectionOfCustomFormsByCategory':
							const category = this.getNodeParameter('category', i) as any;
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeCustomForm?category=${category}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
						case 'getSingleCustomForm':
							config.method = 'get';
							employeeCustomFormId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeCustomForm(${employeeCustomFormId})`;
							break;
						case 'postSingleCustomForm':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeCustomForm`;
							break;
						case 'patchSingleCustomForm':
							config.method = 'patch';
							employeeCustomFormId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeCustomForm(${employeeCustomFormId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteSingleCustomForm':
							config.method = 'delete';
							employeeCustomFormId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeCustomForm(${employeeCustomFormId})`;
							break;
						case 'getCollectionOfEmployeeInbox':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeInbox`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfIncidentManagement':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeIncident`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getSingleIncidentManagement':
							config.method = 'get';
							IncidentId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}EmployeeIncident(${IncidentId})`;
							break;
						case 'createSingleIncidentManagement':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}EmployeeIncident`;
							break;
						case 'patchSingleIncidentManagement':
							config.method = 'patch';
							IncidentId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}EmployeeIncident(${IncidentId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteSingleIncidentManagement':
							config.method = 'delete';
							IncidentId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}EmployeeIncident(${IncidentId})`;
							break;
						case 'getACollectionOfPayRates':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeePayRate`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASinglePayRateRecord':
							config.method = 'get';
							payRateId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePayRate(${payRateId})`;
							break;
						case 'getACollectionOfPayRatesAsOfAnEffectiveDate':
							config.method = 'get';
							effectiveDate = this.getNodeParameter('effectiveDate', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeePayRate?effectiveDate=${effectiveDate}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'createASinglePayRateRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePayRate`;
							break;
						case 'updateASinglePayRateRecord':
							config.method = 'patch';
							payRateId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePayRate(${payRateId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteASinglePayRateRecord':
							config.method = 'delete';
							payRateId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePayRate(${payRateId})`;
							break;
						case 'getACollectionOfTakeOnRecords':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeTakeOn`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleOfTakeOnRecord':
							config.method = 'get';
							takeOnId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeTakeOn(${takeOnId})`;
							break;
						case 'createACollectionOfTakeOnRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeTakeOn`;
							break;
						case 'updateASingleOfTakeOnRecord':
							config.method = 'patch';
							takeOnId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeTakeOn(${takeOnId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'addASingleRecurringTemplateToAnEmployee':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeRecurringTemplate`;
							break;
						case 'getACollectionOfClaims':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeeClaim`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getASingleEmployeeClaimRecord':
							config.method = 'get';
							claimId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim(${claimId})`;
							break;
						case 'createASingleEmployeeClaimRecord':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim`;
							break;
						case 'uploadClaimAttachment': // TODO: fix: handle file upload
							config.method = 'post';
							claimId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim/${claimId}/attachment/upload`;
							config.headers = {
								Authorization: paySpaceAccessToken,
								'Content-Type': 'application/json',
								...data.getHeaders(),
							};
							break;
						case 'updateASingleEmployeeClaimRecord':
							config.method = 'patch';
							claimId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim(${claimId})`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;
						case 'deleteASingleEmployeeClaimRecord':
							config.method = 'delete';
							claimId = this.getNodeParameter('Id', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim(${claimId})`;
							break;
						case 'submitEmployeeClaimBatchForWorkflow':
							config.method = 'post';
							claimBatchId = this.getNodeParameter('Id', i) as any;
							config.data = this.getNodeParameter('assignments', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeClaim/${claimBatchId}/submit`;
							break;
						case 'getASingleEmployeeWorkflowRecord':
							config.method = 'get';
							claimBatchId = this.getNodeParameter('Id', i) as any;
							UserWorkflowStepId = this.getNodeParameter('UserWorkflowStepId', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeWorkflow/claim/${UserWorkflowStepId}/${claimBatchId}`;
							break;
						case 'submitWorkflowStep':
							config.method = 'post';
							config.data = this.getNodeParameter('assignments', i) as any;
							UserWorkflowStepId = this.getNodeParameter('UserWorkflowStepId', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeeWorkflow/${UserWorkflowStepId}/submit`;
							break;
						case 'getACollectionOfPayslips':
							config.method = 'get';
							year = this.getNodeParameter('year', i) as any;
							month = this.getNodeParameter('month', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeePayslip/${year}/${month}`; //TODO: get the year and month
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfPayslipsLines':
							config.method = 'get';
							year = this.getNodeParameter('year', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeePayslipLine/${year}/${month}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfCostedPayslipsLines':
							config.method = 'get';
							year = this.getNodeParameter('year', i) as any;
							baseURL = `${apiUrl}${companyId}/EmployeeCostedPayslipLine/${year}/${month}`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfConsolidatedPayslips':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeePayslip/${year}/${month}/consolidated`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'getACollectionOfPayslipsPDFs':
							config.method = 'get';
							baseURL = `${apiUrl}${companyId}/EmployeePayslip/${year}/${month}/pdf`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;
							break;
						case 'updatePayslipComment':
							config.method = 'patch';
							period = this.getNodeParameter('period', i) as any;
							frequency = this.getNodeParameter('frequency', i) as any;
							config.url = `${apiUrl}${companyId}/EmployeePayslip/comment?period=${period}&frequency=${frequency}`;
							config.data = this.getNodeParameter('assignments', i) as any;
							break;

						case 'getASinglePayslipPDF':
							config.method = 'get';
							paySlipId = this.getNodeParameter('Id', i) as string;
							baseURL = `${apiUrl}${companyId}/employeepayslip/${paySlipId}/download`;
							config.url = addParams
								? appendUrl(baseURL, this.getNodeParameter('additionalFields', i) as IDataObject)
								: baseURL;

						default:
							// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
							throw new Error('Invalid Operation');
							break;
					}
				} else if (operation === 'company') {
					companyId = this.getNodeParameter('companyId', i) as number;
				} else if (operation === 'lookUpValue') {
					let lookUpValueApi = this.getNodeParameter('api', i) as string;
					config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: appendUrl(
							`${apiUrl}${companyId}${lookUpValueApi}?`,
							this.getNodeParameter('additionalFields', i) as IDataObject,
						),
						headers: {
							Authorization: paySpaceAccessToken,
							'Content-Type': 'application/json',
						},
					};
				} else if (operation === 'fileUpload') {
					companyId = this.getNodeParameter('companyId', i) as number;
				} else if (operation === 'webhooks') {
					const entityType = this.getNodeParameter('entityType', i) as string;
					const fromDate = this.getNodeParameter('fromDate', i) as string;
					const toDate = this.getNodeParameter('toDate', i) as string;
					const pageNumber = this.getNodeParameter('pageNumber', i) as string;
					const pageSize = this.getNodeParameter('entityType', i) as string;
					config = {
						method: 'get',
						maxBodyLength: Infinity,
						url: `${apiUrl}${companyId}/WebhookError/${entityType}?from=${fromDate}&to=${toDate}&pageNumber=${pageNumber}&pageSize=${pageSize} `,
						headers: {
							Authorization: paySpaceAccessToken,
							'content-type': 'application/json',
						},
					};
				} else if (operation === 'customConfig') {
					config = this.getNodeParameter('customConfig', i) as AxiosRequestConfig;
				}

				const response: AxiosResponse = await axios(config);

				responseData = [{ json: response.data }];

				// operation === 'getMetadata' ? getMetadataResponse : [{ json: response.data }];

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
