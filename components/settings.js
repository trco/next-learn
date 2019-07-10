import React from 'react';

// react-bootstrap-table2 pagination settings

// totals
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total" style={{marginLeft: '1em'}}>
    Showing { from } to { to } of { size } stories.
  </span>
);

// options
export const paginationOptions = {
  paginationSize: 5,
  pageStartIndex: 1,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPage: 10,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: '25', value: 25
  }, {
    text: '50', value: 50
  }]
};
