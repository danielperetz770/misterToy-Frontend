import { Link } from "react-router-dom";
import { ToyImg } from './ToyImg.jsx'

export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article>
            <h2 className="toy-name">{toy.name}</h2>
            <ToyImg toyName={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>labels: <span>{toy.labels.toLocaleString()} </span></p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link> &nbsp; | &nbsp;
            <button onClick={() => onRemoveToy(toy._id)}>x</button>
        </article>
    )
}