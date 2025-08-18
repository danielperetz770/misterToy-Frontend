import { useState } from 'react'

export function ToyImg({ toyName }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoad() {
        setImgLoading(false)
    }

    return (
        <div className="img-container">
            {isImgLoading && <div className="skeleton-loader"></div>}
            <img
                src={toyName.imgUrl ||`https://robohash.org/${toyName}?set=set1`}
                alt={toyName}
                title={toyName}
                onLoad={handleImageLoad}
                className={isImgLoading ? '' : 'loaded'}
            />
        </div>
    )
}
