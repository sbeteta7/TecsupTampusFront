import React from "react";
import Input from '@mui/joy/Input';

function InputPerfil({  ...rest }) {
  return (
    <>
      <div>
        <Input

          variant="soft"
          sx={{
            '--Input-radius': '0px',
            borderBottom: '2px solid',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
              borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
              border: '1px solid var(--Input-focusedHighlight)',
              transform: 'scaleX(0)',
              left: 0,
              right: 0,
              bottom: '-2px',
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
          {...rest}
        />
      </div>
      <div>
        <i></i>
      </div>
    </>
  );
}

export default InputPerfil;
