import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Hidden, TextField } from '@mui/material';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        width: '80%',
        margin: 'auto',
        flexDirection: 'column',
        [theme.breakpoints.down(600)]: {
            width: '100%',
            minWidth: '200px',
        }
    },
    textField: {
        width: 'inherit',
        height: 'inherit',
        backgroundColor: 'rgb(255 255 255 / 80%)',
        borderRadius: '5px',
        '& label.Mui-focused': {
            color: theme.palette.text.secondary,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.text.secondary,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.text.secondary,
                backgroundColor: '#FFF'
            },
            '&:hover fieldset': {
                borderColor: theme.palette.text.secondary,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.text.secondary,
            },
        },
    },
}))

interface InputWithLabelProps {
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
    typeVariant: 'standard' | 'outlined' | 'filled',
    text: string,
    className: string,
    onChange: (val: string) => void,
    type: 'week' | 'url' | 'time' | 'text' | 'tel' | 'submit' | 'search' | 'reset' | 'range'
    | 'radio' | 'password' | 'number' | 'month' | 'image' | 'hidden' | 'file' | 'email'
    | 'datetime-local' | 'date' | 'color' | 'checkbox' | 'button',
    disabled: boolean
}

export const InputWithLabel = (props: InputWithLabelProps) => {
    const classes = useStyles()
    const { hide, hidden, className, typeVariant, text, onChange, type, disabled } = props

    if (hide) {
        return null
    }

    return (
        <Hidden {...hidden}>
            <div
                className={classes.container + ' ' + className}>
                <TextField
                    disabled={disabled}
                    type={type}
                    className={classes.textField}
                    onChange={(e) => onChange(e.target.value)}
                    variant={typeVariant}
                    label={text}></TextField>
            </div>
        </Hidden>
    )
}

InputWithLabel.propTypes = {
    onChange: PropTypes.func.isRequired,
    typeVariant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
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
    className: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.oneOf(['week', 'url', 'time', 'text', 'tel', 'submit', 'search', 'reset', 'range',
        'radio', 'password', 'number', 'month', 'image', 'hidden', 'file', 'email',
        'datetime-local', 'date', 'color', 'checkbox', 'button']),
    disabled: PropTypes.bool
}

InputWithLabel.defaultProps = {
    disabled: false,
    type: 'text',
    typeVariant: 'standard',
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
    className: '',
    text: ''
}