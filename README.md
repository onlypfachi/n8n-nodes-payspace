#

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

## n8n PaySpace Node

This repository contains an n8n node for interacting with the PaySpace API. PaySpace powerful API allows you to access your employee data in order to utilize in your business environment. You can READ, CREATE , UPDATE or DELETE  PaySpace data in n8n system.

Installation
Install te node in your n8n server.
Restart your n8n server.
Usage
This node supports various PaySpace API functionalities. You can configure the node to:

- Get Token
- Get MetaData.

Note: You will need to obtain a PaySpace Authentication key and configure it in the node properties for other uses besides getting token.

## Properties

- Environment: Specify the PaySpace environment (e.g., production, test).
- Operation: Choose the desired API operation (Get token, Get Metadata, etc.).
- Additional Fields: Depending on the operation, additional fields may be required, such as transaction amount, currency, and payment method. - - Refer to the PaySpace API documentation for specific requirements.

## Development

All contributions to this node are welcome. Feel free to create pull requests for bug fixes or improvements.

You can get in contact with the developer [here](https://github.com/onlypfachi)

## License

This node is licensed under the MIT License. [See the LICENSE file for details](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md).
