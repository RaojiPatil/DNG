import React from 'react'
// import ContentLoader from 'react-content-loader';
import Loader from "react-loader-spinner";

const DomainLoader = () => {
    return (
        <div>
            <Loader
                type="TailSpin"
                color="#C6D2E2"
                height={40}
                width={40}
                timeout={1000} //1 secs
            />
        </div>
    )
}

export default React.memo(DomainLoader)
