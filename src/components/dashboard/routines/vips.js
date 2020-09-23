import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getvips } from "../../../actions/routines/vipActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card } from "@material-ui/core";

class vips extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Supervisor', field: 'supervisor'},
                {title: 'Estado', field: 'estado'}
            ]
        };
    }

    componentDidMount () {
        this.props.getUsers()
        this.props.getvips()
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/detallevip/${id}`);
    }

    onUpdateClick = id => {
        const { history } = this.props;
        history.push(`/updatevip/${id}`);
    }

    render() {
        console.log(this.props)
        const res = this.props.vips.vips;
        console.log(res)
        const vips = res.data;
        console.log(vips)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, supervisor, estado) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "supervisor": supervisor,
                        "estado": estado,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(vips!=null) {
            if(vips.length > 0) {
            vips.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.supervisor, element.estado)
            });
            }
        }

        return (
                <Card>
                    <br/>
                    <Link to="/routines" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Regresar
                    </Link>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <MaterialTable
                                title=" Rutinas"
                                columns={this.state.columns}
                                data={routineItems}
                                options={{
                                    exportButton:true
                                }}
                                actions={[
                                    {
                                        icon: 'save',
                                        tooltip: 'Diligenciar rutina',
                                        onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                                    },
                                    {
                                        icon: 'search',
                                        tooltip: 'Detalle rutina',
                                        onClick: (event, rowData) => this.onDetailClick(rowData.id)
                                    }
                                ]}
                                >
                                </MaterialTable>
                            </Grid>
                        </Grid>
                        <br/>
                        <Link to="/newvip" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
        );
    }
}

vips.propTypes = {
    getvips: PropTypes.func.isRequired,
    vips: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    vips: state.vips,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getvips }
)(withRouter(vips));