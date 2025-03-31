import { createElement, Fragment, type ReactNode } from 'react';

export function nl2br(text: string): ReactNode {
  const lines = text.split('\n');
  const result: ReactNode[] = [];

  lines.forEach((line, index) => {
    if (index > 0) {
      result.push(createElement('br', { key: `br-${index}` }));
    }
    result.push(line);
  });

  return createElement(Fragment, null, ...result);
}
