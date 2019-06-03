import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

	renderError({ error, touched }) {	//destructured from meta
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ label, input, meta }) => {	//destructured from formProps
		// return <input type="text" onChange={formProps.input.onChange} value={formProps.input.value} />;

		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

		// To get the error value from meta, the names of the Fields must be same in the error object
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				<div>{this.renderError(meta)}</div>
			</div>
		);
	}

	onSubmit = (formValues) => {
		// event.preventDefault(); //redux-form does this for us 
		this.props.onSubmit(formValues);
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'Please enter a title';
	}
	if (!formValues.description) {
		errors.description = 'Please enter a description';
	}
	return errors;	// empty object makes redux-form know all inputs are valid
}

export default reduxForm({
	form: 'streamForm',
	validate: validate
})(StreamForm);

//BEFORE REFACTOR
// const formWrapped = reduxForm({
// 	form: 'createStream',
// 	validate: validate
// })(StreamCreate);

// export default connect(null, { createStream })(formWrapped);

//one other valid way for hooking up both connect and redux-form
// export default connect()(reduxForm({
// 	form: 'createStream',
// 	validate: validate
// })(StreamCreate));