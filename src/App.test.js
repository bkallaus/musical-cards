import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Mock Tone.js because it requires Web Audio API which is not fully supported in JSDOM
jest.mock('tone', () => {
  return {
    Synth: jest.fn().mockImplementation(() => {
      return {
        toDestination: jest.fn().mockReturnThis(),
        triggerAttackRelease: jest.fn(),
      };
    }),
    now: jest.fn(),
    Destination: {
        volume: {
            value: 0
        }
    }
  };
});

test('renders learn react link', () => {
  // This test was failing because "learn react" is not in the App component anymore.
  // The App component renders: "What note is this?"
  const { getByText } = render(<App />);
  const linkElement = getByText(/What note is this\?/i);
  expect(linkElement).toBeInTheDocument();
});
