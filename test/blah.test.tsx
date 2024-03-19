import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KbjTable from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<KbjTable />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
