import * as React from 'react';
import { forwardRef } from 'react';
import KbjTable from './KbjTable';
import {
  KbjTableProvider,
  KbjTableProviderProp,
  KbjTableProviderRefProp as KbjTableProviderRefProp,
} from './KbjTableContext';
import { KbjTableProps } from './types';

export default forwardRef<
  KbjTableProviderRefProp,
  KbjTableProviderProp & KbjTableProps
>((props, ref) => {
  const { data, columns, onChangeCell, ...rest } = props;
  return (
    <KbjTableProvider
      ref={ref}
      data={data}
      columns={columns}
      onChangeCell={onChangeCell}
    >
      <KbjTable {...rest} />
    </KbjTableProvider>
  );
});
