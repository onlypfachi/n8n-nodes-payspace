import { INodePropertyOptions } from "n8n-workflow";

export const webhooksApiOptions: INodePropertyOptions[]= [
	{
		name: 'Get Failed Webhook Requests',
		value: 'getFailedWebhookRequests',
		description: 'Retrieve collection of failed webhook requests for a specified time period. An email address can be advised when configuring a webhook within the application. An email will be sent each day with a summary list of all errors for the previous day to notify of any failures. Note: This is not an OData Endpoint, Filtering on all the fields is not possible.'
	}
];
