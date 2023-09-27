import { Card, CardContent, Typography } from "@mui/material";
import spreadsheet from '../images/spreadsheet1.png';
import { useNavigate } from "react-router-dom";

export type TemplateItemType ={
    templateId: number,
    templateName: string,
}

export default function TemplateItem({templateId, templateName}: TemplateItemType) {
    const nav = useNavigate();
    
    const handleSpecificTemplateClick = () => {
        const url = "/template/" + templateId.toString()
        nav(url);
    }


    return (
      <Card onClick={handleSpecificTemplateClick} sx={{display:"flex", justifyContent:'center' ,width: "17em", backgroundColor:"#71C887", height:"12em", margin:"2em"
      ,'&:hover': {
        backgroundColor: 'primary.main',
        opacity: [0.9, 0.8, 0.7],
      }}}>
        <CardContent style={{display:'flex', justifyContent:"center", paddingTop:"20px",alignContent:"center", flexDirection:"column"}}>
            <div style={{display:'flex', justifyContent:"center", backgroundColor:"white", alignContent:"center", height:"10em", width:"14em"}}>
            <img src={spreadsheet} style={{width: 50, height: 50, paddingTop:"20px"}} />
            </div>
            <Typography variant="body2" sx={{padding:0, color:"white", margin:"1em", textAlign:"center"}}>
                <b>{templateName}</b>
            </Typography>
        </CardContent>
      </Card>
    );
  }