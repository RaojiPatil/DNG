import React, { useState, useEffect } from 'react'
import DomainLoader from './DomainLoader';
import DomainNameSingle from './DomainNameSingle';

const DomainName = ({ newResultDataArray, dataLoading , setGetCookie , searchData}) => {
    // const [nameSetStatus, setNameSetStatus] = useState(false)
    const [dataArray, setDataArray] = useState([])

    useEffect(() => {
        const searchedDataArray = Object.entries(newResultDataArray);

        if (searchedDataArray[0] !== undefined) {
            setDataArray(searchedDataArray[0][1]['ext'])
            // setNameSetStatus(true)
        }
        // setNameSetStatus(true)
        console.log('loaded')
    }, [newResultDataArray,searchData])

    // console.log(searchData)

    return (
        <div className='dng-domain-name-wrapper'>
            {dataLoading  ? <DomainLoader />:

                (
                    dataArray.map((data) => (
                    	<DomainNameSingle
                            setGetCookie={setGetCookie}
                    		key={data}
                    		data={data}
                    	/>
                    ))
                )
            }
        </div>
    )
}

export default DomainName
