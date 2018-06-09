# Easy access to user configuration value in your vsce

## Install

Copy **src/ConfigurationManager.ts** to your vsce project folder.


## Example

### package.json

~~~ json
    :
    :
    :
    "contributes": {
        "configuration": {
            "title": "configuration",
            "type": "object",
            "properties": {
                "config.name": {
                    "type": "boolean",
                    "default": false,
                    "description": "example"
                }
            }
        }
        :
        :
        :
    },
~~~

### Your script

Very simple.

~~~ javascript
let configValue = ConfigurationManager.getConfig<Boolean>(
    "your section name",
    "config.name",
    false
);
~~~
