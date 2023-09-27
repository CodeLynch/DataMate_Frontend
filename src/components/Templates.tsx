import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, Container, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SampleTemp from '../images/samplethumb.png';
import DownloadOpen from '../images/download.png';
import NavigateImg from '../images/navigate.png';
import InputImg from '../images/input.png';
import spreadsheet from '../images/spreadsheet1.png';
import noRecentFiles from '../images/noRecentFiless.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SpecificTemplate from '../pages/SpecificTemplatePage';
import { useNavigate } from 'react-router-dom';
import TemplateItem, { TemplateItemType } from './TemplateItem';
import axios from 'axios';



export default function Templates(){
    const [templateList,setTemplateList] = React.useState<TemplateItemType[]>([]);

    React.useEffect(()=>{
      axios.get("http://localhost:8080/templates"
      ).then((res)=>{
          console.log(res.data);
          if(res.data){
            setTemplateList(res.data);  
          }
      }).catch(err => {
          console.log(err);
      })
    },[])

    React.useEffect(()=>{
      console.log("TL",templateList)
    }, [templateList])
    return(
        <div>
          <Stack direction="column" className='gradientbg' sx={{paddingBottom:"2em"}}>
            <h1 style={{color: 'white', fontSize: 60, textAlign: 'center'}}>Download Template</h1>
            <p style={{color: 'white', fontSize: 22, paddingLeft: 5, textAlign:'center'}}> 
              Get more done in less time with our downloadable templates - Boost Your Productivity Now!</p>
      
          <TextField className='search'
          hiddenLabel
          size="medium"  
          placeholder="Search"
          sx={{border: 'none', "& fieldset": { border: 'none' },}}
          InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchOutlinedIcon /> </InputAdornment>),
          disableUnderline: true, }} 
        /><br></br><br></br><br></br>
          </Stack>

          <h3 style={{marginLeft: '11rem', marginTop: '3rem', fontSize: 30}}>Recent downloads</h3>

          <Box sx={{margin: '3rem', justifyContent: 'center', display: 'flex'}}>
            <img src={noRecentFiles} style={{width: 200, height: 200}}/>
          </Box>

          <h3 style={{marginLeft: '11rem', marginTop: '3rem', fontSize: 30}}>All Templates</h3>
          
          <div style={{ display:'flex', justifyContent:"left", 
          paddingLeft:"10em",
          paddingRight:"10em"}}>
          {
            templateList !== undefined ?
            templateList.map((template, i)=>{
              return(<TemplateItem templateId={template.templateId} templateName={template.templateName}/>)
            }):<></>
          }
          </div>
          {/* <Box onClick={handleSpecificTemplateClick} className='boxx'
              sx={{
                display: 'flex',
                marginRight: 100,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}>

          <Box className='boxxx' sx={{ justifyContent: 'center', display: 'flex'}}>
          <img src={spreadsheet} style={{width: 50, height: 50, paddingTop: 40}}/>
          </Box>
          <p style={{color: 'white', fontSize: 16.5, paddingLeft: '3.5rem', paddingTop: 159, textAlign:'center'}}> 
            SalesReportTemplate.xlsx</p>
          </Box> */}
          <br></br>
                  
        </div>
        )
    
}