import debounce from 'lodash/debounce';
import { useState, useEffect, useCallback } from 'react';

export const useDebouncedChange = (
  handleChange: (path: string, value: any) => void,
  defaultValue: any,
  data: any,
  path: string
): [any, (value: any) => void, () => void] => {
  const timeout = 300;
  const [input, setInput] = useState(data ?? defaultValue);
  const debouncedUpdate = useCallback(
    debounce((newValue: any) => {
      handleChange(path, newValue);
    }, timeout),
    [handleChange, path, timeout]
  );

  useEffect(() => {
    setInput(data ?? defaultValue);
    debouncedUpdate(input);
  }, []);

  const onChange = useCallback(
    (value: any) => {
      setInput(value ?? defaultValue);
      debouncedUpdate(value);
    },
    [debouncedUpdate]
  );
  const onClear = useCallback(() => {
    setInput(defaultValue);
    handleChange(path, undefined);
  }, [defaultValue, handleChange, path]);
  return [input, onChange, onClear];
};
