import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { BrowserRouter as Router, MemoryRouter, Route, Redirect } from 'react-router-dom';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should check routes', () => {
  const wrapper = mount(<MemoryRouter initialEntries={['/']}>
    <App />
  </MemoryRouter>);
  expect(wrapper.find(Router).length).toEqual(1);
  expect(wrapper.find(Redirect).length).toEqual(1);
  expect(wrapper.find(Route).length).toEqual(2);
});
