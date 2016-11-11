# my-nanny-alexa
Alexa code for testing / prod

### Sample Request
```
{
  "session": {
    "sessionId": "SessionId.ac4547e9-1cf1-4939-b6f3-49a72c7fca74",
    "application": {
      "applicationId": "amzn1.ask.skill.9b33db36-7c39-4a30-b6a5-c9708c9f14bd"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AG3YQBBQ2VZMFF2C3XVTTIVACBU6XBW7ARHOHDAI4JLYGMK7CJTHJL3QXIWZYTS5SFZ6L25CR7BLO7Y6WFXJ3LHE6LJJ52RTZTLNPTXEGKQVADA6IX4EWQZT5GAUDYNS25XEYZFIIPZAZF5YGBRTSQUNKYHJVTLKW5LKL7FIT2ZG2CLT4N7KNFE3XPHMDWRZMNSX4DXDWEVHIJA"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.40ee6a0e-2cde-4053-9de4-ef114343a24a",
    "locale": "en-US",
    "timestamp": "2016-11-11T00:20:19Z",
    "intent": {
      "name": "HelloFriendIntent",
      "slots": {}
    }
  },
  "version": "1.0"
}
```

### Sample Response
```
{
  "version": "1.0",
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "Hello Friend!"
    },
    "card": {
      "content": "Hello Friend!",
      "title": "Hello Friend",
      "type": "Simple"
    },
    "shouldEndSession": true
  },
  "sessionAttributes": {}
}
```
