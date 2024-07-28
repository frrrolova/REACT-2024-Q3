import { renderWithProviders } from './utils';
import SvgImages from '@/components/SvgImages/SvgImages';

describe('SvgImages', () => {
  test('Should have rick-head id', () => {
    const { container } = renderWithProviders(<SvgImages />);
    const rickHead = container.querySelector('#rick-head');
    expect(rickHead).not.toBe(null);
  });
});
