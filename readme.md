#Time Capsule

This is an example of an asynchronous application in node.
It allows you to post text to a server and, after time, retreive it via a key.

##Installation

```bash
  git clone git@github.com:johnhenry/time-capsule.git
  cd time-capsule
  npm install
  npm start
```

##HTTP API

This application is accessible via any http client including as [curl](http://curl.haxx.se/) or [wget](http://www.gnu.org/software/wget/manual/wget.html), as well as Chrome Applications such as  [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) or [Advanced Rest Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo).


The default address 127.0.0.1:8080.

###POST / -- Post raw text

  Response: a JSON object with the following properties
  - key - key that will be associated with value once resolved
  - path - path to value
  - ready - number of milliseconds until ready

###GET /:key -- Retreive Stored Text

  Response: a JSON object with the following properties
  - value - value of stored text
