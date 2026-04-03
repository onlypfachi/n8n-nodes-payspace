# n8n PaySpace Node

This repository contains an n8n node for interacting with the PaySpace API. The PaySpace API allows you to access your employee data to utilize it in your business environment. You can use this node to READ, CREATE, UPDATE, or DELETE PaySpace data within the n8n system.

## Installation

Install the node in your n8n server and restart it.

## Usage

This node supports various PaySpace API functionalities. You can configure it to:

-   Authentication
-   Get Metadata
-   Employee
-   Company
-   Lookup Values
-   File Upload
-   Webhooks
-   Custom Config

## Properties

-   Environment: Specify the PaySpace environment (e.g., production, staging).
-   Operation: Choose the desired API operation (Get token, Get Metadata, etc.).
-   Api: Choose the desired API endpoint.

## Values

You can use these values for expressions:

### Company Identifier Field

```
1- company_id
2- company_name
3- company_code
```

## Override Config

This node uses the `axios` package. If the provided API options do not meet your needs, you can select the `Custom Config` operation to provide your own `AxiosRequestConfig` object. This gives you direct control over the request configuration. Make sure you visit the documentation [here](https://developer.payspace.com/) and understand the request and API schema.

## Development

All contributions to this node are welcome. Feel free to create pull requests for bug fixes or improvements.

You can contact the developer [here](https://github.com/onlypfachi/)

[☕](https://github.com)

## License

This node is licensed under the MIT License. See the [LICENSE file](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md) for details.

The developer does not work for PaySpace. This project is an independent convenience tool built to make use of the PaySpace API and as a fun project.
