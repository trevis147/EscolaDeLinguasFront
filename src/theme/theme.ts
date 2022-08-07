import { createTheme } from "@material-ui/core";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3d6bb3',
            light:'#093170',
            dark:'#3d6bb3',
            contrastText:'#FFF'
        },
        secondary:{
            main: '#a3a7af',
            light:'#686868',
            dark:'#868686'
        },
        error:{
            main: '#d50000',
            light:'#c62828',
            dark:'#ff8a80'
        },
        text:{
            secondary:'#000',
            hint:'#FFF',
        },
        background:{
            default: '#757575'
        }
    }
});