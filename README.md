This is the repository that holds tables and routes for eBay trading, finding and shopping apis

We have the  tables under "tables" directory, and routes under "routes" directory.

We have the dev.json under config where you will need to substitute your values of appname, appid, devname, certaname, authtoken etc.
You can get these values by registering you application on https://www.x.com/developers/ebay

After you get these values, you can start using the tables.

To start the server run "bin/start.sh".

The test directory has examples of the scripts that use the different apis.

For documentation regarding the api, please refer https://www.x.com/developers/ebay

For more information regarding ql.io please refer http://ql.io/

Incase of specific issues send an email to DL-eBay-qlio-dev <DL-eBay-qlio-dev@corp.ebay.com>

# FAQs

###Are these a replacement for the current eBay Marketplaces APIs?
This repo can serve as an interface to the eBay Marketplaces APIs. 
All you need is to plug in the appropriate API keys in config/dev.json.

###Can these tables be used as is?
Yes.
These tables can be used as they are. 

###Can the tables be customized?
Yes.
In some cases where you need specific fields from the API results, it is better to customize the tables as per your requirement.





