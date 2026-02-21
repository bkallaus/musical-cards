import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SingleNoteGame from './single-note-game';

jest.useFakeTimers();

// Mock Tone.js
jest.mock('tone', () => ({
  Synth: jest.fn().mockImplementation(() => ({
    toDestination: jest.fn().mockReturnThis(),
    triggerAttackRelease: jest.fn(),
  })),
  now: jest.fn(),
  Destination: {
      volume: {
          value: 0
      }
  }
}));

// Mock VexFlow Score component
jest.mock('./vex-flow', () => ({
  Score: () => <div data-testid="score-mock">Score</div>
}));

// Mock VolumeControl
jest.mock('./volume-control', () => () => <div data-testid="volume-control-mock">VolumeControl</div>);

const notes = [
  { answer: 'c', note: 'c/4' },
  { answer: 'd', note: 'd/4' },
  { answer: 'e', note: 'e/4' }
];

test('shows "Time\'s up!" after 10 seconds', () => {
  render(<SingleNoteGame notes={notes} clef="treble" />);

  // Initially no feedback
  expect(screen.queryByText(/Time's up/i)).not.toBeInTheDocument();

  // Advance time by 10s
  act(() => {
      jest.advanceTimersByTime(10000);
  });

  // Check feedback
  expect(screen.getByText(/Time's up/i)).toBeInTheDocument();
});

test('resets timer on interaction', () => {
  render(<SingleNoteGame notes={notes} clef="treble" />);

  // Advance 5s
  act(() => {
      jest.advanceTimersByTime(5000);
  });

  // Click a button (simulating interaction)
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // Click first button

  // Advance another 5s (total 10s from start)
  act(() => {
      jest.advanceTimersByTime(5000);
  });

  // Should NOT show "Time's up!" yet (because timer reset at 5s)
  expect(screen.queryByText(/Time's up/i)).not.toBeInTheDocument();

  // Advance another 5s (total 10s from interaction)
  act(() => {
      jest.advanceTimersByTime(5000);
  });

  // Now should show "Time's up!"
  expect(screen.getByText(/Time's up/i)).toBeInTheDocument();
});
