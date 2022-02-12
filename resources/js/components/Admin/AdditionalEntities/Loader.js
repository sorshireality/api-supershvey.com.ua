import {Component} from "react";


class Loader extends Component {
    render() {
        const styles = {
            "position": "relative",
            "width": "20px",
            "height": "20px",
            "marginLeft": "10px"
        }
        return (

            this.props.loading ?
                <img style={styles} src="/v1/public/images/loader.gif" alt=""/>
                : <img style={styles} src="/v1/public/images/loader_success.png" alt=""/>


        )
    }
}

export default Loader
