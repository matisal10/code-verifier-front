import { Typography } from "@mui/material";
import { Link } from "@mui/material";

export const CopyRight = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" aling="center" {...props} >
            {'CopyRight ©'}
            <Link color="inherit" href="https://github.com/matisal10" >
                Mati Repo 
            </Link>
            {new Date().getFullYear()}
        </Typography>
    )
}