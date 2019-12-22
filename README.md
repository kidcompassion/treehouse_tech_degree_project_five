# Public API Requests
## Employee Directory App

This app makes a call to the Random User API, retrieving 12 employees and rendering associated card and modal elements. It has a search function with the ability to reset the list by clicking the reset button.

The general idea is that after grabbing the API data, I create two properties in the global app namespace. 
* masterList is the original data set. This one never gets filtered; instead, it is there just to reset to the original list post-search if need be
* dynamicList gets filtered on the fly by the createSearchMethods method in the CardListing class

## Known Issues
Currently, the search submit and reset only work on click. This should be amended to allow for it work on enter.