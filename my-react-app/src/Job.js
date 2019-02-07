import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Job extends Component {
    static propTypes = {
        allowDelete: PropTypes.bool,
        selectHandler: PropTypes.func,
        deleteHandler: PropTypes.func,
        title: PropTypes.string,
}
renderDelete = () => {
    if (this.props.allowDelete) {
        return (
            <button onClick={this.props.deleteHandler}>-</button>
        )
    }
}
render() {
return (
    <div>
        <button onClick={this.props.selectHandler} >{this.props.title}</button>
        {this.renderDelete()}
    </div>
)
}
}
export default Job