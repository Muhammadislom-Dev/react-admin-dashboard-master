import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({ data, setFormData, objKey }) => {
  const [tags, setTags] = useState([]);

  const handleChange = (event, option) => {
    const {
      target: { value },
    } = event;
    const newTag = data.find(
      (el) => el.id === value.slice(value.length - 1)[0]
    );

    const index = value.slice(value.length - 1)[0];
    const isIndex = tags.findIndex((el) => el.id === index);

    if (isIndex > -1) {
      tags.splice(isIndex, 1);
      setTags([...tags]);
    } else {
      setTags((prev) => [...prev, newTag]);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, [objKey]: tags.map((el) => el.id) }));
  }, [tags]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tags?.map((el) => el.tag)}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {data?.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              <Checkbox
                checked={tags.findIndex((val) => val.tag === el.tag) > -1}
              />
              <ListItemText primary={el.tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
