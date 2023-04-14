import { ComponentProps, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDelayedEffect } from '../hooks';
import { Merge } from '../tools';

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
      <div className="md:w-2/3">
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            className="form-input rounded md:w-5/6"
            placeholder="Search Word"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <MagnifyingGlassIcon className="float-left mr-1 h-10 w-10 text-gray-500 opacity-60" />
        </label>
      </div>
    </div>
  );
};
