import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { myStore } from '../store/MyStore.store';
import { City } from '../types/types';


const SelectCity = ({ title, register, setValue }: any ): JSX.Element => {
  
  const [selectedCity, setCity] = useState('');
  const [items, setItems] = useState<City[]>([]);

  useEffect(() => {
    setCity(myStore.currentCity);
  }, [myStore.currentCity]);

  useEffect(() => {
    myStore.getCitiesFromAPI('/reg_service/api/v1/dictionary/DICT_CITIES')
    .then(res => setItems(res));
  }, []);

  useEffect(() => {
    const currentCity = items.find(item => item.name == selectedCity);
    setValue('city.code', currentCity?.code)
  }, [selectedCity]);
  
  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  
  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        { ...register(
          "city.name"
        )}
        required
        sx={{ bgcolor: "background.paper" }}
        className="select"
        labelId="demo-simple-select-label"
        value={selectedCity}
        label={title}
        onChange={handleChange}
        variant="filled"
        disableUnderline
      >
        {items.map((city: any) => (
          <MenuItem 
            key={city.code} 
            value={city.name} 
            selected={city.name == selectedCity}
            >{city.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCity;