import React, { useState } from 'react';
import ReactTags from 'react-tag-autocomplete';

const Tlds = ({ dngSetTlds }) => {
	const initTlds = Object.assign({}, dngData.tlds);

	const finalTldsList = Object.entries(initTlds).map(([key, value]) => ({
		id: parseInt(key),
		name: value,
	}));

	const [tags, setTags] = useState([
		{ id: 271, name: 'com' },
		{ id: 842, name: 'net' },
		// { id: 2, name: "India" }
	]);
	const [suggestions, setSuggestions] = useState(finalTldsList);

	function onDelete(i) {
		const tagList = tags.filter((tag, index) => index !== i);
		setTags(tagList);
		dngSetTlds(tagList.map((tag) => tag.name).join());
	}

	function onAddition(tag) {
		if (tags.length === 0) {
			setTags([...tags, tag]);

			// getting the name to chcek
			const namesArray = tags.map((tag) => tag.name);
			const convertToStringTag = namesArray.join(',') + `${tag.name}`;

			dngSetTlds(convertToStringTag);
		} else {
			//getting the id to check
			const idArray = tags.map((tag) => tag.id);

			if (!idArray.includes(tag.id)) {
				// getting the name to chcek
				const namesArray = tags.map((tag) => tag.name);
				const convertToStringTag =
					namesArray.join(',') + `,${tag.name}`;

				setTags([...tags, tag]);
				dngSetTlds(convertToStringTag);
			}
		}
	}

	return (
		<div className="dng-filter-by-extensions">
			<b>Filter by Extensions</b>
			<ReactTags
				tags={tags}
				suggestions={suggestions}
				onDelete={onDelete}
				onAddition={onAddition}
				className="tlds-search"
			/>
		</div>
	);
};

export default Tlds;
