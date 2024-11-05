import type { ICredentialType, INodeProperties } from 'n8n-workflow';
import { scopeOptions } from '../nodes/PaySpace/options/main.options';

export class PaySpaceApi implements ICredentialType {
	name = 'clientCredentialApi';
	displayName = 'Client Payspace Credential  API';
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'client_id',
			type: 'string',
			typeOptions: {
				password: false,
			},
			default: '',
		},
		{
			displayName: 'Secret',
			name: 'client_secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Scope',
			name: 'client_scope',
			type: 'options',
			options: scopeOptions,
			default: 'api.full_access',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
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
	];
}
