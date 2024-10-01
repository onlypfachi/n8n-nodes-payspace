import type { ICredentialType, INodeProperties } from 'n8n-workflow';

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
	];
}
