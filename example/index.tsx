import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KbjTable from '../.';
import { HTableCellDetail, HTableColumn } from '../dist/HTableTypes';
import '../dist/kbjtable.cjs.development.css';

const data = [
  {
    id: '896627e9-6c82-4899-a312-c2943835c9cf',
    name: '散青菜（二级）',
    models: '1.0斤/斤',
    unit: '斤',
    total: '5',
    price: '2.40000000',
    totalPrice: '12',
    taxCode: '1010112070000000000',
    taxType: null,
    taxRate: '0',
    taxAmount: '0.00',
    discount: null,
  },
  {
    id: '94c58a3b-15dd-4c7b-b38b-00af1b7abc43',
    name: '青线椒（二级）',
    models: '1.0斤/斤',
    unit: '斤',
    total: '2.1',
    price: '2.70000000',
    totalPrice: '5.67',
    taxCode: '1010112090000000000',
    taxType: null,
    taxRate: '0',
    taxAmount: '0.00',
    discount: null,
  },
  {
    id: '5618ce30-7631-4636-960a-c1eddf4f8f77',
    name: '散青菜（二级）',
    models: '1.0斤/斤',
    unit: '斤',
    total: '168',
    price: '2.40000000',
    totalPrice: '403.2',
    taxCode: '1010112070000000000',
    taxType: null,
    taxRate: '0',
    taxAmount: '0.00',
    discount: null,
  },
  {
    id: '04b8347a-d86a-4890-ac7b-0886089095b0',
    name: '青线椒（二级）',
    models: '1.0斤/斤',
    unit: '斤',
    total: '57.06',
    price: '2.58990536',
    totalPrice: '147.78',
    taxCode: '1010112090000000000',
    taxType: null,
    taxRate: '0',
    taxAmount: '0.00',
    discount: null,
  },
  {
    id: '6da089ff-349b-4ef2-8025-45f02034aec4',
    name: '小葱（二级）',
    models: '1.0斤/斤',
    unit: '斤',
    total: '40.9',
    price: '3.81931540',
    totalPrice: '156.21',
    taxCode: '1010112030000000000',
    taxType: null,
    taxRate: '0',
    taxAmount: '0.00',
    discount: null,
  },
];

const App = () => {
  const columns: HTableColumn[] = [
    {
      title: '货物、服务名称',
      dataIndex: 'name',
      width: '15em',
      editable: true,
      // 要能autocomplete
    },
    { title: '税目编码', dataIndex: 'taxCode', width: '14em', editable: true },
    { title: '规格型号', dataIndex: 'models', width: '6em', editable: true },
    { title: '单位', dataIndex: 'unit', width: '4em', editable: true },
  ];

  function onChangeCell(value: any, detail: HTableCellDetail, tag: any) {
    // console.log("[invoice cell change]：", detail, value, tag);
  }

  return (
    <div>
      <KbjTable columns={columns} data={data} onChangeCell={onChangeCell} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
