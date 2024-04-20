import { INodePropertyOptions } from 'n8n-workflow'
export const companyEndpointCollectionsOptions: INodePropertyOptions[]=[
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
}

];
