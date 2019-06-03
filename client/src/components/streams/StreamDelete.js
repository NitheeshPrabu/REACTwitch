import React from 'react';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';

import Modal from '../Modal';

class StreamDelete extends React.Component {

	componentDidMount() {
		//All components must be self-sufficent in initialising data
		this.props.fetchStream(this.props.match.params.id);
	}

	onDeleteClick = () => {

		history.push('/');
	}

	renderActions() {
		return (
			/**
			 * You can also use <> </>
			 */
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui button negative">Delete</button>
				<Link to="/" className="ui button">Cancel</Link>
			</React.Fragment >
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`;
	}

	render() {

		return (
			<Modal title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')} />
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);