import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function DefaultPage() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}