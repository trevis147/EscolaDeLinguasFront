import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Button, Container } from '@mui/material'
import { Card } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import EditGrade from "../../components/dialog/editGrade";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/fetch";

const useStyles = makeStyles((theme: Theme) => ({
    ContainerCard: {
        height: "600px",
        padding: "10px",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        justifyContent: "flex-end"
    },
    ContainerTable: {
        width: "100%",
        height: "500px",
        padding: "25px",
        marginTop: "30px",
        [theme.breakpoints.down(600)]: {
            width: '90%',
            minWidth: '200px',
            marginLeft: "30px",
        }
    }
}))




export function Home() {
    const classes = useStyles()

    const [rows, setRows] = useState([])

    useEffect(() => {
        populateTable()
    }, [])

    async function populateTable() {
        const ret = await api.get("GetAllStudents")
        setRows(ret.data.map((x:any) => x.props))
    }


    return (
        <>
            <Container  >
                <Card className={classes.ContainerCard}>
                    <Card className={classes.ContainerTable}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                        />
                    </Card>
                    <Link to="ViewGrades">
                        <Button variant="outlined">Visualizar Aprovações</Button>
                    </Link>
                </Card>
            </Container>
        </>
    )
}



const columns: GridColDef[] = [
    { field: 'student', headerName: 'Nome', width: 130 },
    {
        field: 'id', headerName: 'Editar Nota', width: 160,
        renderCell: (param) => <EditGrade id={param.value}></EditGrade>
    },
];

