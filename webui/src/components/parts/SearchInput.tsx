import { ComponentProps, useState } from 'react';
import { useDelayedEffect } from '../../hooks';
import { Merge } from '../../tools';

type Props = Merge<
  ComponentProps<'input'>,
  {
    onChange: (text: string) => void;
  }
>;

export const SearchInput = ({ onChange }: Props) => {
  const [text, setText] = useState('');

  useDelayedEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <div className="mb-6 flex justify-center">
      <div className="md:w-2/3 relative">
        <input
          id="search"
          type="text"
          className="md:w-5/6 peer block min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          placeholder="Search Word"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <label
          htmlFor="search"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-secondary-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
        >
          Search
        </label>
      </div>
    </div>
  );
};
