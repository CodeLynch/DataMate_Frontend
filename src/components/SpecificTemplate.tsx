import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, IconButton, Stack } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SampleTemp from '../images/samplethumb.png';
import DownloadOpen from '../images/download.png';
import NavigateImg from '../images/navigate.png';
import InputImg from '../images/input.png';
import SampleSS from '../images/sampleSS.png';


export default function SpecificTemplate(){

    return(
    <div>
      <Stack direction="row" className='gradientbg'>
        <h1 style={{color: 'white', padding: '1rem', paddingLeft: '8rem'}}>Template 1</h1>
        <IconButton sx={{ marginTop: '1.8rem', paddingLeft:'73rem' }}>
          <DownloadForOfflineIcon sx={{color: 'white', width: '40px', height: '40px'}}></DownloadForOfflineIcon>
        </IconButton>
      </Stack>

      <Box sx={{margin: '3rem', justifyContent: 'center', display: 'flex'}}>
        <img src={SampleTemp} style={{width: 842, height: 373}}/>
      </Box>
      
      <Typography sx={{margin: '2rem', marginBottom: '4rem'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed neque sed lacus sollicitudin hendrerit a non neque. Mauris vulputate ac odio sit amet vulputate. Curabitur eget dictum magna. Integer tristique interdum magna, in egestas ex pellentesque nec. Suspendisse aliquet lacus eu metus tempus ullamcorper non ac massa. Fusce sit amet accumsan enim, id luctus magna. Morbi nec justo a arcu facilisis congue sed at justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. </Typography>
      <h2 style={{marginLeft: '2rem', fontSize: '40px'}}>Guide</h2>

      {/* FirstPart-Guide */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <img src={DownloadOpen} style={{width: 80, height: 80, marginLeft: '3rem', marginTop: '1rem', marginBottom: '1rem'}}/>
          <Typography sx={{fontSize: '25px', marginLeft: '8rem', marginTop: '2.5rem'}}>Downloading and Opening the Spreadsheet</Typography>
        </AccordionSummary>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
          <AccordionDetails>
            <img src={SampleSS} style={{width: 1021, height: 254, marginLeft: 'auto', marginTop: '1rem', marginBottom: '1rem', display: 'block', marginRight: 'auto'}}/>
            <Typography sx={{margin: '5rem', marginTop: '0rem'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed neque sed lacus sollicitudin hendrerit a non neque. Mauris vulputate ac odio sit amet vulputate. Curabitur eget dictum magna. Integer tristique interdum magna, in egestas ex pellentesque nec. Suspendisse aliquet lacus eu metus tempus ullamcorper non ac massa. Fusce sit amet accumsan enim, id luctus magna. Morbi nec justo a arcu facilisis congue sed at justo. Interdum et malesuada fames ac ante ipsum primis in faucibus.  
            </Typography>
          </AccordionDetails>
        </Box>
      </Accordion>
      
      {/* SecondPart-Guide */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <img src={NavigateImg} style={{width: 80, height: 80, marginLeft: '3rem', marginTop: '1rem', marginBottom: '1rem'}}/>
          <Typography sx={{fontSize: '25px', marginLeft: '8rem', marginTop: '2.5rem'}}>Navigating the Spreadsheet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* ThirdPart-Guide */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <img src={InputImg} style={{width: 80, height: 80, marginLeft: '3rem', marginTop: '1rem', marginBottom: '1rem'}}/>
          <Typography sx={{fontSize: '25px', marginLeft: '8rem', marginTop: '2.5rem'}}>Data Input</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Box sx={{display: 'flex', alignItems: 'end', justifyContent: 'end', margin: '4rem'}}>
        <Button variant="contained" sx={{fontWeight: 'bold', backgroundColor: '#71C887', color:'white',  borderRadius: 50, paddingInline: 4}}>DOWNLOAD</Button>
      </Box>
      
    </div>
    )


}