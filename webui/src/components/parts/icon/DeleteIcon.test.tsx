import { render } from '@testing-library/react';
import { DeleteIcon } from './DeleteIcon';

test('toMatchSnapshot', () => {
  const view = render(<DeleteIcon />);
  expect(view.container).toMatchSnapshot();
});
