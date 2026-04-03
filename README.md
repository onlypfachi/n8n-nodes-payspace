# n8n PaySpace Node

This repository contains an n8n node for interacting with the PaySpace API. The PaySpace API allows you to access your employee data to utilize it in your business environment. You can use this node to READ, CREATE, UPDATE, or DELETE PaySpace data within the n8n system.

## Installation

Install the node in your n8n server and restart it.

## Usage

This node supports various PaySpace API functionalities. You can configure it to:

-   Get Token
-   Get MetaData
-   Get Employee \*
-   Get Company \*
-   Get Lookup Values \*
-   File Upload
-   Get Webhooks
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

This node uses NodeJs-Axios. If the provided API options do not meet your needs, you can override the `Axios.config` by selecting `CustomConfig` in the operation. This will give you direct control of the config object. Make sure you visit the documentation [here](https://developer.payspace.com/) and understand the config schema.

## Development

All contributions to this node are welcome. Feel free to create pull requests for bug fixes or improvements.

You can contact the developer [here](https://github.com/onlypfachi/)

[☕](https://github.com)

## License

This node is licensed under the MIT License. See the [LICENSE file](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md) for details.

`Developer does not work for Payspace, this is utterly made for convenience use of the powerful API, also because it's a fun project`
