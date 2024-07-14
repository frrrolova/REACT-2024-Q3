import Card from '@/components/Card/Card';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { characterMock } from './test-constants';

const onCardClickMock = vi.fn();

describe('Card', () => {
  test('Renders a relevant data', () => {
    const { getByTestId } = render(<Card person={characterMock} onCardClick={onCardClickMock} />);
    const title = getByTestId('card-title');
    expect(title.textContent).toBe(characterMock.name);
  });

  test('Clicking on card triggers an additional API call', async () => {
    const { getByTestId } = render(<Card person={characterMock} onCardClick={onCardClickMock} />);
    const card = getByTestId('person-card1');
    await fireEvent.click(card);
    await waitFor(() => {
      expect(onCardClickMock).toHaveBeenCalled();
    });
  });
});
