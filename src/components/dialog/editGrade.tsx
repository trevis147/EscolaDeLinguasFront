import { makeStyles } from "@material-ui/styles"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme, useMediaQuery, useTheme } from "@mui/material"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { InputWithLabel } from "../form/InputWithLabel"
import { sanitizeSortModel } from "@mui/x-data-grid/hooks/features/sorting/gridSortingUtils"
import { idID } from "@mui/material/locale"
import api from "../../services/fetch"
import { ToastError, ToastSuccess } from "../toast/toast"

const useStyles = makeStyles((theme: Theme) => ({
    FormDialog: {
        display: 'flex',
        flexDirection: 'column'
    },
    divbtn: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        padding: "10px",
        paddingTop: "25px"
    },
    input: {
        width: '380px',
        marginLeft: "25px !important",
        marginRight: "25px !important"
    }
}))


interface IEditGrade {
    hide: boolean,
    hidden: {
        lgDown: boolean,
        lgUp: boolean,
        mdDown: boolean,
        mdUp: boolean,
        only: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
        smDown: boolean,
        smUp: boolean,
        xlDown: boolean,
        xlUp: boolean,
        xsDown: boolean,
        xsUp: boolean
    }
    id: string
}


export default function EditGrade(props: IEditGrade) {
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        English: "",
        Spanish: "",
        German: ""
    })

    const [germanIsValid, setGermanIsValid] = useState(true)
    const [germanOnly, setGermanOnly] = useState(false)

    function resetStates() {
        setGermanIsValid(true)
        setGermanOnly(false)
        setState({
            English: "",
            Spanish: "",
            German: ""
        })
    }

    function handleState(value: string, type: string) {
        debugger
        let updatedValues = state
        switch (type) {
            case 'English': updatedValues.English = value; break;
            case 'Spanish': updatedValues.Spanish = value; break;
            case 'German': updatedValues.German = value; break;
        }

        if ((type === "English" || type === "Spanish") && value.length > 0) {
            setGermanIsValid(false)
        }
        else if ((type === "English" && value.length === 0 && state.Spanish.length === 0) ||
            (type === "Spanish" && value.length === 0 && state.English.length === 0)) {
            setGermanIsValid(true)
        }
        else if (type === "German" && value.length > 0) {
            setGermanOnly(true)
        }
        else if (type === "German" && value.length === 0) {
            setGermanOnly(false)
        }

        setState((prevState) => {
            return {
                ...prevState,
                ...updatedValues
            }
        })
    }

    function handleClickOpen() {
        resetStates()
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    async function saveGrade() {
        const ret = await api.post("/SaveGrade", [{
            student: props.id,
            courseName: "English",
            grade: state.English
        }, {
            student: props.id,
            courseName: "Spanish",
            grade: state.Spanish
        }, {
            student: props.id,
            courseName: "German",
            grade: state.German
        }
        ])
        if (ret.data) {
            ToastSuccess("Salvo com sucesso")
            handleClose()
        } else {
            ToastError("Ops alto deu errado")
        }

    }

    return (
        <>
            <Button variant="outlined" onClick={() => handleClickOpen()} > Inserir Nota </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    Inserir Nota
                </DialogTitle>
                <DialogActions className={classes.FormDialog}>
                    <InputWithLabel disabled={germanOnly} className={classes.input} typeVariant="filled" onChange={(e) => handleState(e, "English")} text="Ingles" />
                    <InputWithLabel disabled={germanOnly} className={classes.input} typeVariant="filled" onChange={(e) => handleState(e, "Spanish")} text="Espanhol" />
                    <InputWithLabel disabled={!germanIsValid} className={classes.input} typeVariant="filled" onChange={(e) => handleState(e, "German")} text="Alemão" />

                    <div className={classes.divbtn}>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={() => saveGrade()} variant="outlined">
                            Salvar
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}



EditGrade.propTypes = {
    hide: PropTypes.bool,
    /**
     * Propriedades para controlar quando esconder um objeto usa a mesma api do Componente do MUI Hidden
     * {@link https://v4.mui.com/components/hidden/#hidden [Detalhes]}
     */
    hidden: PropTypes.shape({
        lgDown: PropTypes.bool,
        lgUp: PropTypes.bool,
        mdDown: PropTypes.bool,
        mdUp: PropTypes.bool,
        only: PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])),
        smDown: PropTypes.bool,
        smUp: PropTypes.bool,
        xlDown: PropTypes.bool,
        xlUp: PropTypes.bool,
        xsDown: PropTypes.bool,
        xsUp: PropTypes.bool
    }),
    /** className usado para customizar o componente */
    type: PropTypes.string
}


EditGrade.defaultProps = {
    hide: false,
    hidden: {
        lgDown: false,
        lgUp: false,
        mdDown: false,
        mdUp: false,
        only: null,
        smDown: false,
        smUp: false,
        xlDown: false,
        xlUp: false,
        xsDown: false,
        xsUp: false
    },
}