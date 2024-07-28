import Content from '@/components/Content/Content';
import { contentStringConstants } from '@/components/Content/constants';
import { screen, waitFor } from '@testing-library/react';
import { charactersMockWithMultipleCharacters } from './test-constants';
import { renderWithProviders } from './utils';

const onCardSelectMock = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ page: '1' })],
}));

describe('Card List', () => {
  test('Render current cards quantity if characters find', () => {
    renderWithProviders(
      <Content
        showEmptyRespNotification={false}
        onCardSelect={onCardSelectMock}
        persons={charactersMockWithMultipleCharacters}
      >
        <div></div>
      </Content>,
    );

    expect(screen.getAllByRole('person-card').length).toBe(charactersMockWithMultipleCharacters.length);
  });

  test('Render empty message cards quantity if no characters', async () => {
    renderWithProviders(
      <Content showEmptyRespNotification={true} onCardSelect={onCardSelectMock} persons={[]}>
        <div></div>
      </Content>,
    );

    await waitFor(() => {
      expect(screen.getByText(contentStringConstants.emptyNotification)).toBeInTheDocument();
      expect(screen.queryByRole('person-card')).toBeNull();
    });
  });
});
