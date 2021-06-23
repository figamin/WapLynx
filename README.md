**FAIR WARNING:** The current codebase for the 2.6.x release of the front-end is pretty messy and needs some cleanup, this is an overall improvement however over the 2.3.x release. If you have any questions please refer to: https://16chan.xyz/.static/pages/contact.html happy to answer and questions and help with people that are forking the front-end.

**PenumbraLynx** is an updated version of [8TailedLynx](https://gitgud.io/obongo/8TailedLynx)'s Penumbra version.

Install by cloning anywhere and then pointing it to the engine on the global settings. Make sure to check out the correct tag.

To personalize your chan please read LynxChan's documentation on templates.

The favicon in the static directory is served from mongo and will need to be uploaded into MongoDB manually. To do this you need to get the 
mongofiles tool and run

> mongofiles -h localhost -d {dbName} -l {/path/to/yourfavicon} put /favicon.ico

This front end currently requires you to set the URI of the overboard as "overboard".
