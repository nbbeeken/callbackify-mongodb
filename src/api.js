module.exports = { api: new Map([
  [
    "AbstractCursor",
    {
      "location": "mongodb",
      "methods": [
        "close",
        "forEach",
        "hasNext",
        "next",
        "toArray",
        "tryNext"
      ]
    }
  ],
  [
    "Admin",
    {
      "location": "mongodb",
      "methods": [
        "addUser",
        "buildInfo",
        "command",
        "listDatabases",
        "ping",
        "removeUser",
        "replSetGetStatus",
        "serverInfo",
        "serverStatus",
        "validateCollection"
      ]
    }
  ],
  [
    "AggregationCursor",
    {
      "location": "mongodb",
      "methods": [
        "explain"
      ]
    }
  ],
  [
    "BulkOperationBase",
    {
      "location": "mongodb/lib/bulk/common.js",
      "methods": [
        "execute"
      ]
    }
  ],
  [
    "ChangeStream",
    {
      "location": "mongodb/lib/change_stream.js",
      "methods": [
        "close",
        "hasNext",
        "next",
        "tryNext"
      ]
    }
  ],
  [
    "ClientSession",
    {
      "location": "mongodb/lib/sessions.js",
      "methods": [
        "abortTransaction",
        "commitTransaction",
        "endSession",
        "withTransaction"
      ]
    }
  ],
  [
    "Collection",
    {
      "location": "mongodb",
      "methods": [
        "bulkWrite",
        "count",
        "countDocuments",
        "createIndex",
        "createIndexes",
        "deleteMany",
        "deleteOne",
        "distinct",
        "drop",
        "dropIndex",
        "dropIndexes",
        "estimatedDocumentCount",
        "findOne",
        "findOneAndDelete",
        "findOneAndReplace",
        "findOneAndUpdate",
        "indexes",
        "indexExists",
        "indexInformation",
        "insert",
        "insertMany",
        "insertOne",
        "isCapped",
        "mapReduce",
        "options",
        "remove",
        "rename",
        "replaceOne",
        "stats",
        "update",
        "updateMany",
        "updateOne"
      ]
    }
  ],
  [
    "Db",
    {
      "location": "mongodb",
      "methods": [
        "addUser",
        "collections",
        "command",
        "createCollection",
        "createIndex",
        "dropCollection",
        "dropDatabase",
        "indexInformation",
        "profilingLevel",
        "removeUser",
        "renameCollection",
        "setProfilingLevel",
        "stats"
      ]
    }
  ],
  [
    "FindCursor",
    {
      "location": "mongodb",
      "methods": [
        "count",
        "explain"
      ]
    }
  ],
  [
    "GridFSBucket",
    {
      "location": "mongodb",
      "methods": [
        "delete",
        "drop",
        "rename"
      ]
    }
  ],
  [
    "GridFSBucketWriteStream",
    {
      "location": "mongodb/lib/gridfs/upload.js",
      "methods": [
        "abort"
      ]
    }
  ],
  [
    "MongoClient",
    {
      "location": "mongodb",
      "methods": [
        "close",
        "connect",
        "withSession"
      ]
    }
  ]
]) };
