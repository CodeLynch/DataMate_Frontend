import * as React from 'react';
import { Box, Button, Stack, Typography } from "@mui/material"
import GirlImg from '../images/girl.png';
import DownArrow from '../images/downarrow.png';
import TemplatesScreen from '../images/templatesScreen.png';
import SpecificTemplateScreen from '../images/SpecificTemplate.png';
import TemplateSample from '../images/templatesample.png';
import UploadFile from '../images/UploadFile.png';
import Restructure from '../images/Path2Loading.png';
import ConvertDownload from '../images/convertdownload.png';
// import ImportFile from '../prompts/ImportFile';

export default function Home(){
    const [importFile, setImportFile] = React.useState(false);

    const handleImportFileClick = () => {
        setImportFile(true);
    };
  
    const handleCloseModal = () => {
        setImportFile(false);
    };
  
    const helpSectionRef = React.useRef<HTMLDivElement | null>(null);
    const handleGetStartedClick = () => {
        if (helpSectionRef.current) {
            helpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <Box>
            <section className='gradientbg'>
                <Box sx={{ display: 'flex', paddingBottom: '5rem' }}> 
                    <Box>
                        <h1 className='h1-container'>Streamline Your <br></br>Data Management</h1> 
                        <p className='subheading1'>Download templates or import your <br></br>spreadsheet today!</p>
                        <Box className='btnstyle'>
                            <Button onClick={handleGetStartedClick} variant="contained" type="submit" style={{fontWeight: 'bold', backgroundColor: 'white', color:'#71C887',  borderRadius: 50, paddingInline: 30}}>
                                GET STARTED
                                <img src={DownArrow} className="button-icon"/>
                            </Button>
                        </Box>
                    </Box>
                    <Box className='girl-img'>
                        <img className='float-image' src={GirlImg}/>
                    </Box>
                </Box>
            </section>

            <section ref={helpSectionRef}>
                <h2>How can we help you?</h2>
                <p>Get more done in less time with our downloadable templates - Boost Your Productivity Now!</p>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Stack direction="row" sx={{paddingBottom: '6rem', paddingTop: '2rem'}}>
                        <img src={TemplatesScreen} style={{width: 605, height: 393}}/>
                        <h3 className='g1' style={{paddingLeft: '15rem', paddingTop: '2rem'}}>Select a <span style={{ color: '#71C887' }}>template <br/> provided</span> by <br/>our app</h3>
                    </Stack>
                    <Stack direction="row" sx={{paddingBottom: '6rem', paddingTop: '2rem'}}>
                        <h3 className='g1' style={{ paddingRight: '21rem', paddingTop: '6rem' }}><span style={{ color: '#71C887' }}>Download</span> the <br/> template</h3>
                        <img src={SpecificTemplateScreen} style={{width: 603, height: 391}}/>
                    </Stack>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h3 className='g1' style={{ marginBottom: '1rem' }}>
                            <span style={{ color: '#71C887' }}>Use</span> the template in <span style={{ color: '#71C887' }}>creating</span> your data
                        </h3>
                        <img src={TemplateSample} style={{ width: 758, height: 321, marginBottom: '1rem', marginTop: '3rem' }} />
                        <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#71C887', color: 'white', borderRadius: 50, paddingInline: 4, marginTop: '5rem' }}>
                            GO TO TEMPLATES
                        </Button>
                    </Box>
                    
                </Stack>
               

                <p style={{paddingTop: '8rem',  textAlign: 'center', paddingBottom: '2rem'}}>Already have an existing spreadsheet? We can clean it or turn it to a database.</p>

                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Stack direction="row" sx={{paddingBottom: '6rem', paddingTop: '2rem'}}>
                        <h3 className='g1' style={{ paddingRight: '15rem' , paddingTop: '3rem' }}>Import a <br/> <span style={{ color: '#71C887' }}>spreadsheet</span> file <br/> from your <br/> <span style={{ color: '#71C887' }}>computer</span></h3>
                        <img src={UploadFile} style={{width: 660, height: 410}}/>
                    </Stack>
                    <Stack direction="row" sx={{paddingBottom: '6rem', paddingTop: '2rem'}}>
                        <img src={Restructure} style={{width: 595, height: 372}}/>
                        <h3 className='g1' style={{paddingLeft: '18rem', paddingTop: '2rem'}}>Our app <span style={{ color: '#71C887' }}>will <br/> restructure</span> your <br/> spreadsheet</h3>
                    </Stack>
                    <Stack direction="row" sx={{paddingBottom: '6rem', paddingTop: '2rem'}}>
                        <h3 className='g1' style={{ paddingRight: '8rem' , paddingTop: '3rem'}}>Convert your <br/> spreadsheet into a <br/> <span style={{ color: '#71C887' }}>database</span> or <span style={{ color: '#71C887' }}>download</span> it</h3>
                        <img src={ConvertDownload} style={{width: 605, height: 380}}/>
                    </Stack>
                    <Button  onClick={handleImportFileClick} variant="contained" sx={{fontWeight: 'bold', backgroundColor: '#71C887', color:'white',  borderRadius: 50, paddingInline: 4, marginBottom: '10rem'}}>IMPORT SPREADSHEET</Button>
                    {/* <ImportFile open={importFile} onClose={handleCloseModal} /> */}
                    {/* <ImportFile open={importFile} onClose={handleCloseModal}/> */}


                </Stack>
            </section>

            <section className='footer'>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ fontSize: 15, color: 'white', paddingTop: '1rem'}}>© 2023  All Rights Reserved, DataMate</p>
                <p style={{ fontSize: 15, color: 'white', marginTop: '-0.5rem', paddingBottom: '1rem'}}>Privacy Policy  |   Terms</p>
            </Stack>

            </section>
        </Box> 
    )
}