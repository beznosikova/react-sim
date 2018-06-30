import React from "react";
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'

const SearchLine = ({onSubmit}) => {
	return (
		<div className="header-search">
			<Form
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Field
						name="searchWord"
						component="input"
						type="text"
						placeholder="Поиск номера..."
						required
						minLength={3}
						tooShort="Слишком короткая строка!"
						valueMissing="Введите строку поиска"
						className="header-search-box"
						autoComplete="off"
					/>
					<button className="header-search-button">Найти</button>
				</form>
				)}
			/>
		</div>
	)
};

export default SearchLine;