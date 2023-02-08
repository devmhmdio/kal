import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Chips({label,emailKeyword,setemailKeyword}) {

  const handleDelete = () => {
    const item=emailKeyword.filter((item)=>item!==label)
    setemailKeyword(item)
  };
 

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={label} onDelete={handleDelete} />
    </Stack>
  );
  }