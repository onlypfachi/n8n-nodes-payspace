import { INodePropertyOptions } from 'n8n-workflow';

export const webhooksApiOptions: INodePropertyOptions[] = [
	{
		name: 'Get Failed Webhook Requests',
		value: 'getFailedWebhookRequests',
		description:
			'Retrieve collection of failed webhook requests for a specified time period. An email address can be advised when configuring a webhook within the application. An email will be sent each day with a summary list of all errors for the previous day to notify of any failures. Note: This is not an OData Endpoint, Filtering on all the fields is not possible.',
	},
];

// const t = [
// 	'07/05/2024',
// 	'14/05/2024',
// 	'21/05/2024',
// 	'28/05/2024',
// 	'04/06/2024',
// 	'11/06/2024',
// 	'18/06/2024',
// 	'25/06/2024',
// 	'02/07/2024',
// 	'09/07/2024',
// 	'16/07/2024',
// 	'23/07/2024',
// 	'30/07/2024',
// 	'06/08/2024',
// 	'13/08/2024',
// 	'20/08/2024',
// 	'27/08/2024',
// 	'03/09/2024',
// 	'10/09/2024',
// 	'17/09/2024',
// 	'24/09/2024',
// 	'01/10/2024',
// 	'08/10/2024',
// 	'15/10/2024',
// 	'22/10/2024',
// 	'29/10/2024',
// 	'05/11/2024',
// 	'12/11/2024',
// 	'19/11/2024',
// 	'26/11/2024',
// 	'03/12/2024',
// 	'10/12/2024',
// 	'17/12/2024',
// 	'24/12/2024',
// ];
