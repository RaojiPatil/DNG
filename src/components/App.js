import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBox from './SearchBox';
import Tlds from './Tlds';
import CheckBox from './CheckBox';
import Length from './Length';
import Cookies from 'js-cookie';
import Wishlist from './Wishlist';
import RandomNames from './RandomNames';
import NewSearchDatas from './NewSearchDatas';
import { callToApi, callToApiOnUpdate } from './FetchApi';
import DomainName from './DomainName';
import "../index.css";

let timerId;
const App = () => {
	const [searchData, setSearchData] = useState({
		name: '',
		tlds: 'com,net',
		max_length: 20,
		use_dashes: false,
		use_numbers: false,
		include_registered: false,
	});

	const [prevSearchData, setPrevSearchData] = useState({})

	const [showSearchData, setShowSearchData] = useState([]);
	const [getRandomNames, setGetRandomNames] = useState([]);

	const [prevSearchTags, setPrevSearchTags] = useState([])

	const [getCookie, setGetCookie] = useState(
		Cookies.get('cookie-dng') ? JSON.parse(Cookies.get('cookie-dng')) : 0
	);

	const [searchShowDataStatus, setSearchShowDataStatus] = useState(false); //show div data status
	const [showWishlist, setShowWishlist] = useState(false); // show wishlidt div status

	const [newResultDataArray, setNewResultDataArray] = useState({}); // Set result set for search result
	const [showFilterDiv, setShowFilterDiv] = useState(false);

	// data loading status
	const [dataLoading, setDataLoading] = useState(true);

	// error messege
	const [errorStatus, setErrorStatus] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// single component loader
	const [singleComponentLoader, setSingleComponentLoader] = useState({
		status: true,
		name: ''
	})

	// const debounceFunction = function (func, delay) {
	// 	clearTimeout(timerId);
	// 	timerId = setTimeout(func, delay);
	// };

	
	function debounceFunction(func, delay) {

        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(function() {

            func();

        }, delay);

    };

	const onclick = () => {
		if (
			searchData.name.length >= 2 &&
			searchData.tlds &&
			searchData.max_length

		) {
			// show data div
			setDataLoading(true);

			const newSearchTagsArray = [searchData.name];
			getRandomNames.map((item) => newSearchTagsArray.push(item));


			if (prevSearchTags.length >= 1 && JSON.stringify(searchData) === JSON.stringify(prevSearchData)) {
				let currentSearchTags = newSearchTagsArray.filter(item => prevSearchTags.indexOf(item) === -1)

				//whole data changed
				if (currentSearchTags.length === 4) {
					setPrevSearchTags(currentSearchTags);
					setSearchShowDataStatus(true);

					callToApi(currentSearchTags, searchData.tlds, searchData.max_length, searchData.use_dashes,
						searchData.use_numbers, dngData.dng_token, setNewResultDataArray, setDataLoading)
				}

				// add new tag to api
				else if (currentSearchTags.length === 1) {

					const deletedTag = prevSearchTags.filter(item => newSearchTagsArray.indexOf(item) === -1) // Searchong for deleted tags
					let searchObj = newResultDataArray
					delete searchObj[deletedTag[0]]

					setSingleComponentLoader({
						status: false,
						name: currentSearchTags[0]
					})

					setPrevSearchTags(newSearchTagsArray);
					searchObj[currentSearchTags[0]] = { ext: [], gens: [] }
					setNewResultDataArray(searchObj);
					setSearchShowDataStatus(true);
					setDataLoading(false);




					callToApiOnUpdate(currentSearchTags, searchData.tlds, searchData.max_length, searchData.use_dashes,
						searchData.use_numbers, dngData.dng_token, setNewResultDataArray, setDataLoading, searchObj, currentSearchTags, setSingleComponentLoader)

				}
				// delete tag
				else {

					const deletedTag = prevSearchTags.filter(item => newSearchTagsArray.indexOf(item) === -1) // Searchong for deleted tags

					// setting state
					let searchObj = newResultDataArray
					delete searchObj[deletedTag[0]]
					setNewResultDataArray(searchObj)
					setDataLoading(false);
					setPrevSearchTags(newSearchTagsArray);
				}
			}
			// first time calling
			else {

				setPrevSearchTags(newSearchTagsArray);
				setSearchShowDataStatus(true);

				// setting the previous search data
				setPrevSearchData(searchData)

				callToApi(newSearchTagsArray, searchData.tlds, searchData.max_length, searchData.use_dashes,
					searchData.use_numbers, dngData.dng_token, setNewResultDataArray, setDataLoading)
			}
		} else {
			setErrorStatus(true);
			setErrorMessage('Search atleast 2 charactors.');

			setTimeout(() => {
				setErrorStatus(false);
				setErrorMessage('');
			}, 500);
		}
	};

	useEffect(() => {
		let href = window.location.search

		let getCurrentSearchString = ''

		if (href !== '') {
			let hrefSplit = href.split('=')
			getCurrentSearchString = hrefSplit[hrefSplit.length - 1]
			getCurrentSearchString = getCurrentSearchString.split('%20').join('')
			setShowSearchData(StartupNameGenerator(getCurrentSearchString.replaceAll(/\s/g, '')));
		}
		setSearchData({ ...searchData, name: getCurrentSearchString })
	}, [])

	useEffect(() => {
		if (searchData.name) {
			debounceFunction(onchange, 1000);
		}
		if (searchData.name.length < 2) {
			window.history.replaceState({}, 'Domain Name Generator', `${window.location.pathname}`)
			setSearchShowDataStatus(false)
		}
		else {
			window.history.replaceState({}, 'Domain Name Generator', `?results=${searchData.name}`)
		}
	}, [searchData, getRandomNames]);


	/// componet setter functions
	const dngSetSearchItemName = (e) => {
		setShowFilterDiv(false);
		setSearchShowDataStatus(true);
		setDataLoading(true);
		setShowSearchData([]);
		setSearchData({ ...searchData, [e.target.name]: e.target.value });
	};

	const dngSetTlds = (value) => {
		setSearchData({ ...searchData, tlds: value });
	};

	const dngSetMaxLength = (value) => {
		setSearchData({ ...searchData, max_length: value });
	};

	const dngSetCheckBox = (e) => {
		setSearchData({ ...searchData, [e.target.name]: e.target.checked });
	};

	const dngShowFilterDiv = () => {
		setShowFilterDiv(!showFilterDiv);
	};

	const dngShowWishlistDiv = (count) => {
		if (count === 0) {
			setShowWishlist(false);
			setErrorStatus(true);
			setErrorMessage('There is no sortlisted domain yet.');

			setTimeout(() => {
				setErrorStatus(false);
				setErrorMessage('');
			}, 1000);
			
		} else if (showWishlist) {
			if (searchData.name.length >= 2) {
				setSearchShowDataStatus(true);
			} else {
				setSearchShowDataStatus(false);
			}
			setShowWishlist(false);
		} else {
			setSearchShowDataStatus(false);
			setShowWishlist(true);
		}
	};

	const 	dngSetRandomNameGenarator = (data) => {
		setShowSearchData(StartupNameGenerator(data.replaceAll(/\s/g, '')));
	};

	const backToSearchResults = () => {
		if (showWishlist) {
			setShowFilterDiv(false);
			if (searchData.name.length >= 2) {
				setSearchShowDataStatus(true);
			} else {
				setSearchShowDataStatus(false);
			}
			setShowWishlist(false);
		}
	};
	

	const clearSearch = () => {
		setSearchData({ ...searchData, name: '' })
	}
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

	// console.log(searchData)
	return (
		<div>
           	<div className="flex items-center justify-between border-b border-gray-400 py-6">
      <a href="http://test4.local/dng/">
       	<img class="ml-16 w-20 h-8" src='data:image/png;base64,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' />
      </a>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div>   
            <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-2 uppercase">
                <a href="#">Home</a>
              </li>
              <li className="border-b border-gray-400 my-2 uppercase">
                <a href="#">About</a>
              </li>
              <li className="border-b border-gray-400 my-2 uppercase">
                <a href="#">Reviews</a>
              </li>
			  <li className="border-b border-gray-400 my-2 uppercase">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-24">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Reviews</a>
          </li>
		  <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

        	</div>
	


			<div className="dng-header-center">
				<div className="dng-header-center-wrapper">
					<Header
						headerText="Domain Name Generator"
						pragraphText="for Website, business, Blog & more."
						
					/>
              
					<SearchBox
						placeholder="Describe your idea here.."
						dngSetSearchItemName={dngSetSearchItemName}
						dngShowFilterDiv={dngShowFilterDiv}
						count={getCookie}
						dngShowWishlistDiv={dngShowWishlistDiv}
						dngSetRandomNameGenarator={	dngSetRandomNameGenarator}
						getCookie={getCookie}
						setGetCookie={setGetCookie}
						backToSearchResults={backToSearchResults}
						prevSearchName={searchData.name}
						clearSearch={clearSearch}
						// onchange = {handleonchange}
						
					/>

					{errorStatus ? (
						<div className="dng-error-message">{errorMessage}</div>
					) : (
						''
					)}

					<div className={showFilterDiv ? "dng-filter-container" : 'dng-hide'}>
						<Tlds dngSetTlds={dngSetTlds} />

						<Length
							searchData={searchData}
							dngSetMaxLength={dngSetMaxLength}
						/>

						<div className="dng-general-filters">
							<b>General Filters</b>
							<CheckBox
								labelName="Use Dashes"
								name="use_dashes"
								dngSetCheckBox={dngSetCheckBox}
							/>
							<CheckBox
								labelName="Use Numbers"
								name="use_numbers"
								dngSetCheckBox={dngSetCheckBox}
							/>
						</div>
					</div>
			

					{showSearchData.length !== 0 ? (
						<div className={!searchShowDataStatus ? 'dng-hide' : ''}>
							<RandomNames
								orginalName={searchData.name}
								setGetRandomNames={setGetRandomNames}
								showSearchData={showSearchData}

							/>
						</div>
					) : (
						''
					)}
					{searchShowDataStatus ? (
						<DomainName newResultDataArray={newResultDataArray} dataLoading={dataLoading}
							setGetCookie={setGetCookie} searchData={searchData} />
					) : (
						''
					)}

				


					
				</div>
			</div>

			{/* <div className="dng-wishlist-main-div">
				{showWishlist ? (
					<div>
						<Wishlist
							getCookie={getCookie}
							setGetCookie={setGetCookie}
							backToSearchResults={backToSearchResults}
							count={getCookie}
						/>
					</div>
				) : (
					''
				)}
			</div> */}
			

			<div className="dng-data-search-result-grid">
				{searchShowDataStatus ? (
					<NewSearchDatas
						newResultDataArray={newResultDataArray}
						setGetCookie={setGetCookie}
						dataLoading={dataLoading}
						singleComponentLoader={singleComponentLoader}
					/>
				) : (
					''
				)}

			</div>
			<div className='dng-footer-div'>
					<hr className='dng-footer-hr'/>


<footer class="bg-#F2F5FF-100 text-center">
  <div class="container p-4 ">
    <div class=" container grid lg:grid-cols-6">
		<div></div>
	  <div class="mb-6">
       <img class="mr-1 py-2 pt-2 ml-16 mt-2 px-6 w-36 h-10" src='data:image/png;base64,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' />
      </div>

      <div class="mb-6">
        <h5 class="uppercase font-bold mb-1.5 text-lg text-#171728-500">Account</h5>
      </div>

      <div class="mb-6">
        <h5 class="uppercase font-bold mb-1.5 text-lg text-#171728-500">Resources</h5>

      </div>

      <div class="mb-6">
        <h5 class="uppercase font-bold mb-1.5 text-lg text-#171728-500">Questions</h5>

      </div>

      <div class="mb-6">
        <h5 class="uppercase font-bold mb-1.5 text-lg text-#171728-500">Company</h5>
      </div>
	  
    </div>
  </div>
</footer>
						
			    	</div>
		</div>
	);
};

export default App;
