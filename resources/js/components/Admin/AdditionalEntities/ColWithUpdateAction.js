import React, {Component} from "react";
import ReactDOM from "react-dom";
import Loader from "./Loader";


class ColWithUpdateAction extends Component {
    state = {
        value: ""
    }

    constructor(props) {
        super(props);
        this.processClick = this.processClick.bind(this);
        this.process_field_update = this.process_field_update.bind(this);
        this.processKeyUp = this.processKeyUp.bind(this);
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    process_field_update(e) {
        document.getElementById(this.props.name).classList.add('busy')
        const updateField = (entity_name, field_name, $field_value) => {
            const requestOptions = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: field_name,
                    value: $field_value.trim()
                })
            }
            new Promise((resolve, _) => {
                fetch('/v1/public/api/' + entity_name + '/' + this.props.id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data)
                    });
            }).then((r) => {
                    let col = document.getElementById(
                        entity_name + "." + field_name
                    )
                    let last_word = col.textContent
                    const element = (
                        <>
                            {col.textContent}<Loader loading={false}/>
                        </>
                    )
                    this.setState({
                        value: element
                    })
                    setTimeout(function () {
                        const element = (
                            <>
                                {last_word}
                            </>
                        )
                        this.setState({
                            value: element
                        })
                        col.classList.remove('busy')
                    }.bind(this), 500)
                }
            )
        }
        updateField(
            this.props.name.split('.')[0],
            this.props.name.split('.')[1],
            e.target.value)
        const element = (
            <>
                {e.target.value}<Loader loading={true}/>
            </>
        )
        this.setState({
            value: element
        })
    }

    processClick(e) {
        let count = e.detail
        if (count === 2 && e.target.textContent !== "" && !e.target.classList.contains('busy')) {
            let new_input = React.createElement('input', {
                    autoFocus: true,
                    type: "text",
                    defaultValue: e.target.textContent
                }
            )
            this.setState({
                value: new_input
            })
        }
    }

    processKeyUp(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            this.process_field_update(event)
        }
    }

    render() {
        return <div onBlur={this.process_field_update} onKeyUp={this.processKeyUp} onClick={this.processClick}
                    className="col" id={this.props.name}>
            {this.state.value}
        </div>
    }
}

export default ColWithUpdateAction;
