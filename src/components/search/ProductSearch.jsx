"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function ProductSearch({ products = [], onSearch }) {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        disableClearable
        options={products.map((p) => p.name)}
        onInputChange={(_, value) => onSearch?.(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search products"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Box>
  );
}
