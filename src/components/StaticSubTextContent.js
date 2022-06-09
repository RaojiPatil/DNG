import React from 'react'

const StaticSubTextContent = ( { header , content } ) => {
    return (
        <div className ="dng-content-sub">
            <h1 className ="dng-sub-content-heading">{header}</h1>
            <p className ="dng-sub-heading-desription">{content}</p>
        </div>
    )
}

export default React.memo(StaticSubTextContent)
