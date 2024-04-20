import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PaySpaceApi implements ICredentialType {
	name = 'clientCredentialApi';
	displayName = 'Client Payspace Credential  API';
	properties: INodeProperties[] = [
		// {
		// 	displayName: 'Client Environment',
		// 	name: 'client',
		// 	type: 'options',
		// 	options: [
		// 		{
		// 			name: 'Staging',
		// 			value: 'staging',
		// 		},
		// 		{
		// 			name: 'Production',
		// 			value: 'production',
		// 		},
		// 	],
		// 	default: 'testing',
		// 	description:
		// 		'Are these credentials for testing or production environment?',
		// },
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
				password: false,
			},
			default: '',
		},
	];
}
