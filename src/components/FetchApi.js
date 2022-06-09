const callToApi = (
	domains,
	tlds,
	maxLength,
	useDashes,
	useNumbers,
	token,
	setNewResultDataArray,
	setDataLoading
) => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	// eslint-disable-next-line no-undef
	fetch(
		`${window.location.origin}/wp-json/dng/domain/generator/?domains=${domains}&tlds=${tlds}
		&max-length=${maxLength}&use-dashes=${useDashes}&use-numbers=${useNumbers}
        &token=${token}`,
		requestOptions
	)
	.then((response) => response.json())
	.then((result) => {
		// console.log("domains:-", domains);
		setNewResultDataArray(result.data);
		// console.log(result.data);
		setDataLoading(false);
	})
	.catch((error) => console.log('error', error));

};

const callToApiOnUpdate = (
	domains,
	tlds,
	maxLength,
	useDashes,
	useNumbers,
	token,
	setNewResultDataArray,
	setDataLoading,
	searchObj,
	currentSearchTags,
	setSingleComponentLoader
) => {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};

	// eslint-disable-next-line no-undef

	fetch(
		`${window.location.origin}/wp-json/dng/domain/generator/?domains=${domains}&tlds=${tlds}
		&max-length=${maxLength}&use-dashes=${useDashes}&use-numbers=${useNumbers}
        &token=${token}`,
		requestOptions
	)
	.then((response) => response.json())
	.then((result) => {
		searchObj[currentSearchTags[0]] = result.data[currentSearchTags[0]]
		setDataLoading(false);
		setNewResultDataArray(searchObj);
		setSingleComponentLoader({
			status:true,
			name:currentSearchTags[0],
		})
	})
	.catch((error) => console.log('error', error));

};

export {callToApi,callToApiOnUpdate}