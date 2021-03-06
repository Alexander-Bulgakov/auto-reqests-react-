import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { myStore } from '../store/MyStore.store';

const SelectBrands = ({ title, register, currentBrand }: any ): JSX.Element => {

  const [selectedBrand, setBrand] = useState('');
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    setBrand(currentBrand);
  }, [currentBrand]);

  useEffect(() => {
    myStore.getBrandsFromAPI('/reg_service/api/v1/dictionary/DICT_AUTO')
    .then(obj => {
      setItems(Object.keys(obj));
    })
  }, []);

  useEffect(() => {
    myStore.setBrand(selectedBrand);
  }, [selectedBrand])

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        { ...register(
          "brand"
        )}
        required
        sx={{ bgcolor: "background.paper" }}
        className="select"
        labelId="demo-simple-select-label"
        value={selectedBrand}
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {items.map((model: string, index: number) => (
          <MenuItem key={index} value={model}>{model}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default observer(SelectBrands);