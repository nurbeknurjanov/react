import React from "react";
import { render} from '@testing-library/react';
import Me from './me';

test('simple', () => {
  render(<Me />);
});
