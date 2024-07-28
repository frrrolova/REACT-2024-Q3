import { queryByText } from '@testing-library/dom';
import { getManyCharacters } from './test-constants';
import { renderWithProviders } from './utils';
import FlyOut from '@/components/FlyOut/FlyOut';

describe('FlyOut', () => {
  test('Should be rendered if some characters are selected', async () => {
    const { container } = renderWithProviders(<FlyOut />, {
      preloadedState: {
        characters: {
          selectedCharacters: getManyCharacters(2),
        },
      },
    });
    const downlaod = queryByText(container, 'Download');

    expect(downlaod).toBeInTheDocument();
  });

  test('Should NOT be rendered if nothing is selected', async () => {
    const { container } = renderWithProviders(<FlyOut />);
    const download = queryByText(container, 'Download');

    expect(download).not.toBeInTheDocument();
  });
});
