import Loved from "./loved-red.svg?react";
import Unloved from "./unloved.svg?react";


export default function Heart({heartedImg, heartToggle}) {
    return (
        <button
        onClick={heartToggle}
        className={`heart-btn ${heartedImg ? "hearted" : ""}`}
        aria-label="Favourite this picture"
        >
        

        {heartedImg ? (
            <Loved className="heart-icon" />
        ) : (
            <Unloved className="heart-icon" />
        )}
        </button>
    );
    }