import * as React from 'react';
import { Box, Button, Card, Container, Grid, IconButton, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import noRecentFiles from '../images/noRecentFiless.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import TemplateItem, { TemplateItemType } from './TemplateItem';
import axios from 'axios';
import { useState } from 'react';



export default function Templates(){
    const [templateList,setTemplateList] = React.useState<TemplateItemType[]>([]);
    const [recentDownloads, setRecentDownloads] = React.useState<TemplateItemType[]>([]);

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

    React.useEffect(() => {
      axios.get("http://localhost:8080/recentDownloads"
      ).then((res) => {
        console.log(res.data);
        if (res.data) {
          setRecentDownloads(res.data);
          console.log("Recent downloads:", recentDownloads);
        }
      }).catch(err => {
        console.log(err);
      })
    }, [])

    React.useEffect(()=>{
      console.log("TL",templateList)
    }, [templateList])

    const [searchQuery, setSearchQuery] = useState(""); // State for the search query

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);

    };

    const filteredTemplates = templateList.filter((template) => {
      return template.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    console.log("template: List", filteredTemplates)
    
    return(
        <div>
          <Stack direction="column" className='gradientbg' sx={{paddingBottom:"2em"}}>
            <h1 style={{color: 'white', fontSize: 60, textAlign: 'center'}}>Download Template</h1>
            <p style={{color: 'white', fontSize: 22, paddingLeft: 5, textAlign:'center'}}> 
              Get more done in less time with our downloadable templates - Boost Your Productivity Now!</p>
          <Grid container sx={{ justifyContent:"center", alignItems:"center" }}>
            <TextField className='search'
            hiddenLabel
            size="medium"  
            placeholder="Search"
            sx={{border: 'none', "& fieldset": { border: 'none' },}}
            onChange={handleSearchChange}
            InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchOutlinedIcon /> </InputAdornment>),
            disableUnderline: true, }} 
          /><br></br><br></br><br></br>
          </Grid>
          </Stack>

          <h3 style={{ marginLeft: '11rem', marginTop: '3rem', fontSize: 30 }}>Recent downloads</h3>
          {recentDownloads.length === 0 ? (
            <Box sx={{ margin: '3rem', justifyContent: 'center', display: 'flex' }}>
              <img src={noRecentFiles} style={{ width: 200, height: 200 }} />
            </Box>
          ) : (
            <div style={{ display: 'flex', justifyContent: "left", paddingLeft: "10em", paddingRight: "10em" }}>
              {filteredTemplates.map((template, i) => {
                return (
                  <TemplateItem key={i} templateId={template.templateId} templateName={template.templateName} />
                );
              })}
            </div>
          )}

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