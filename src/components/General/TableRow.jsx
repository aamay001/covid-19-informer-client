import React from 'react';
import PropTypes from 'prop-types';
import { DetailsRow } from 'office-ui-fabric-react';
import { theme } from '../../config';

const TableRow = ({ row, style }) => (
  <DetailsRow
    style={{ padding: 0 }}
    {...row}
    styles={{
      root: {
        boxSizing: 'border-box',
        backgroundColor: row.itemIndex % 2 === 0
          ? theme.palette.neutralLighter
          : theme.palette.white,
        color: theme.palette.black,
        ...style,
      },
      cell: {
        padding: '8px 10px 0 15px',
        color: theme.palette.black,
      },
    }}
  />
);

TableRow.defaultProps = {
  style: {},
};

TableRow.propTypes = {
  row: PropTypes.shape({
    itemIndex: PropTypes.number,
  }).isRequired,
  style: PropTypes.shape({}),
};

export default TableRow;
