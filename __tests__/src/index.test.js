// Test generated by RoostGPT for test testReactJan10 using AI Type Open AI and AI Model gpt-4-1106-preview


import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from '@reach/router';
import Route from '../../src/components/Route/index.js'; // Corrected import path
import Customer from '../../src/containers/Customer';
import Charge from '../../src/containers/Charge';

// Mock the dependencies
jest.mock('../../src/containers/Customer', () => () => <div>CustomerComponent</div>);
jest.mock('../../src/containers/Charge', () => () => <div>ChargeComponent</div>);

describe('Route component', () => {
  // Setup for location and history
  const setPath = (path) => {
    window.history.pushState({}, 'Test page', path);
  };

  beforeAll(() => {
    // Mock global event listeners
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders Customer component as default', () => {
    setPath('/?component=customer'); // Set URL with Customer as component
    render(
      <Router>
        <Route />
      </Router>
    );
    expect(screen.getByText('CustomerComponent')).toBeInTheDocument();
  });

  test('renders Charge component when specified', () => {
    setPath('/?component=charge'); // Set URL with Charge as component
    render(
      <Router>
        <Route />
      </Router>
    );
    expect(screen.getByText('ChargeComponent')).toBeInTheDocument();
  });

  test('attaches and detaches keydown event listeners', () => {
    render(
      <Router>
        <Route />
      </Router>
    );
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), true);
    
    // Cleanup component to trigger effect's return function
    screen.unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

