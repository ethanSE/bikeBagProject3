export const schema = {
    "models": {
        "CustomDesign": {
            "name": "CustomDesign",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "scale": {
                    "name": "scale",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "points": {
                    "name": "points",
                    "isArray": true,
                    "type": {
                        "nonModel": "Vertex"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "isOrdered": {
                    "name": "isOrdered",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "CustomDesigns",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "S3Object": {
            "name": "S3Object",
            "fields": {
                "bucket": {
                    "name": "bucket",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "region": {
                    "name": "region",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "key": {
                    "name": "key",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Vertex": {
            "name": "Vertex",
            "fields": {
                "x": {
                    "name": "x",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "y": {
                    "name": "y",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "af870e61d15b3ca5969c0e6c9c622cec"
};