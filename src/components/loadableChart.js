// @HACK: https://github.com/apexcharts/react-apexcharts/issues/44#issuecomment-545591699

import React from 'react';
import Loadable from '@loadable/component';

// import react-apexcharts here
const LoadableChart = Loadable(() =>
  import('../../node_modules/react-apexcharts/src/react-apexcharts')
);

const ComponentWithChart = props => (
  <>
    <LoadableChart {...props} />
  </>
);

export default ComponentWithChart;
