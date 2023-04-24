import { Merge } from './typeMerger';

type Props = {
  a: number;
};

type MergedProps = Merge<
  Props,
  {
    b: string;
  }
>;

test('マージした props に代入、参照ができること', () => {
  const x: MergedProps = { a: 1, b: 'b' };
  expect(x.b).toBe('b');
});
