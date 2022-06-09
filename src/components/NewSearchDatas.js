import React from 'react';
import MyLoader from './MyLoader';
import NewSearchSingeData from './NewSearchSingeData';

const NewSearchDatas = ({ newResultDataArray, setGetCookie, dataLoading , singleComponentLoader}) => {
	const searchedDataArray = Object.entries(newResultDataArray);
	return (
		<div className="search-result">
			{dataLoading ? (
				<MyLoader />
			) : (
				searchedDataArray.map((data) => (
					<NewSearchSingeData
						key={data[0]}
						name={data[0]}
						ext={data[1].ext}
						gens={data[1].gens}
						setGetCookie={setGetCookie}
						singleComponentLoader={singleComponentLoader}
					/>
				))
			)}
		</div>
	);
};

export default NewSearchDatas;