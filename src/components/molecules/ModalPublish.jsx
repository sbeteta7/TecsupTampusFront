import * as React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PublishForm from './PublishForm';
const style = {
  position: 'absolute',
  top: '150%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',

  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
 
};

const modalStyle = {
  
  overflowY:'auto'
};

export default function ModalPublish() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
        Publicar
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyle}
        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crea tu anuncio
          </Typography>
          <Box >
            <PublishForm/>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}