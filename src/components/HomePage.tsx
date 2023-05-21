import { Button } from "@mui/material"

type HomeProps = {
    handleUpload: () => void,
  }

const HomePage = ({handleUpload}:HomeProps) =>{
        return(
            <>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Button 
            variant="contained" 
            sx={{backgroundColor:"#71C887"}}
            onClick={handleUpload}
            >Upload File</Button>
            </div>
            </>
        )
}
export default HomePage