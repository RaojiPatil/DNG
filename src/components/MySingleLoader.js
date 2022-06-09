import React from 'react'
import ContentLoader from 'react-content-loader';

const MySingleLoader = () => {
    return (
        <>
            <ContentLoader
                speed={1}
                width={250}
                height={200}
                viewBox="0 0 290 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="56" rx="3" ry="3" width="410" height="16" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="16" />
                <rect x="0" y="72" rx="3" ry="3" width="410" height="10" />
                <rect x="0" y="88" rx="3" ry="3" width="410" height="10" />
                <rect x="0" y="104" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="120" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="136" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="152" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="168" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="184" rx="3" ry="3" width="410" height="6" />
                <rect x="0" y="200" rx="3" ry="3" width="410" height="6" />
            </ContentLoader>
        </>
    )
}

export default MySingleLoader
