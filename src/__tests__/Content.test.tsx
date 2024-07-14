import Content from '@/components/Content/Content';
import { contentStringConstants } from '@/components/Content/constants';
import { render, screen, waitFor } from '@testing-library/react';
import { charactersMockWithMultipleCharacters } from './test-constants';

const onCardSelectMock = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ page: '1' })],
}));

describe('Content', () => {
  test('Render current cards quantity if characters find', () => {
    render(
      <Content
        showEmptyRespNotification={false}
        isLoading={false}
        onCardSelect={onCardSelectMock}
        persons={charactersMockWithMultipleCharacters}
      >
        <div></div>
      </Content>,
    );

    expect(screen.getAllByRole('person-card').length).toBe(charactersMockWithMultipleCharacters.length);
  });

  test('Render empty message cards quantity if no characters', async () => {
    render(
      <Content showEmptyRespNotification={true} isLoading={false} onCardSelect={onCardSelectMock} persons={[]}>
        <div></div>
      </Content>,
    );

    await waitFor(() => {
      expect(screen.getByText(contentStringConstants.emptyNotification)).toBeInTheDocument();
      expect(screen.queryByRole('person-card')).toBeNull();
    });
  });
});
