import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);


test('renders learn react link', () => {
  const store = mockStore({
    shoppingCart: { cart: [] }
  });
  render(
      <Provider store={store}>
          <App />
      </Provider>
    );
  const linkElement = screen.getByText(/SuperMarket Kata/i);
  expect(linkElement).toBeInTheDocument();
});
