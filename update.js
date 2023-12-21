// References
// https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/
// https://www.algolia.com/doc/api-reference/api-methods/replace-all-objects/

const algoliasearch = require('algoliasearch');
const records = require('./_site/algolia.json');

// Connect and authenticate with your Algolia app
const client = algoliasearch('R2CFUR5SSI', '33d409256adadac86535ec64b49e135f');

// Create a new index and add a record
const index = client.initIndex('dev_HASANIROGERSBLOG');
const params = {
  autoGenerateObjectIDIfNotExist: true,
};

index.replaceAllObjects(records, params)
  .then((data) => {
    console.log(data);
  })
  .catch(error => console.error(error));

// Search the index and print the results
// index
//   .search('lit')
//   .then(({ hits }) => console.log(hits[0]))
