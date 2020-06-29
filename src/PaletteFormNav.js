import React, { Component } from "react";
import PaletteMetaForm from './PaletteMetaForm';
import classNames from "classnames";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import {ValidatorForm} from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: "",
            formShowing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        });
    }

    showForm(){
        this.setState({formShowing: true});
    }

    hideForm(){
        this.setState({formShowing: false});
    }

    render() {
        const {classes, open, palettes, handleSubmit} = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position='fixed'
                    color="default"
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                    })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        colors='inherit'
                        aria-label='Open drawer'
                        onClick={this.props.handleDrawerOpen}
                        className={classNames(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Go Back
                        </Button>
                    </Link>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={this.showForm}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>
            {this.state.formShowing && (
                <PaletteMetaForm 
                    palettes={palettes}
                    handleSubmit={handleSubmit}
                    hideForm={this.hideForm}
                />
            )}
        </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);