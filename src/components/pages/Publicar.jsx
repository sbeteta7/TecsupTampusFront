import Header from '../organisms/Header'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PublishForm from '../molecules/PublishForm';
function Publicar() {

    const style = {
        width: '90%',
        bgcolor: 'background.paper',
        p: 4,
        
      };

  return (
    <>
      <div>
        <Header/>
        <PublishForm/>
      </div>
    </>
  )
}

export default Publicar;