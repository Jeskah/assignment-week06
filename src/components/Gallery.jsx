import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heart from "./Heart.jsx"
import "./gallery.css"

    const picIds = [
        "U2Ug1A6tQew",
        "o1bb0lkWlms",
        "YRxr3BLTLAI",
        "VTfNnV3bdkQ",
        "BiP01viOJHQ",
        "sqY4NX7_eCY",
        "0z8JrUH7B0Y",
        "8rOzIVIWv8M",
        "6oyus_1Scyw",
        "tWJmjKLxB4c",
        "BrHQqT72un8",
        "dewfGEsxRXI"
        ];

export default function Gallery() {
    const [photos, setPhotos] = useState([]);

    const [expandedPhoto, setExpandedPhoto] = useState(null);

    const [likedPhotos, setLikedPhotos] = useState(() => {
        const stored = localStorage.getItem("likedPhotos");
        return stored ? JSON.parse(stored) : [];
    });

//     useEffect(() => {
//   console.log("expandedPhoto:", expandedPhoto);
// }, [expandedPhoto]);

    // Fetching Singular Images from Unsplash using their unique ID found at the end of the image URL
    useEffect(() => {
        Promise.all(
            picIds.map(id => 
                fetch(
                    `https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
        ).then(res => res.json())
    )
)
        .then(data => {
            const validPhotos = data.filter(photo => photo.urls);
            setPhotos(validPhotos);
        })
        .catch(console.error);
}, []);

const toggleHeart = (photoId) => {
    setLikedPhotos(prev => {
        const isLiked = prev.includes(photoId);
    
    if (isLiked) {
        console.log("Unloved :(", photoId);
        return prev.filter(id => id !== photoId);
    } else {
        console.log("Loved! :)", photoId);
        return [...prev, photoId];
    }
    });
};

const showLikedPhotos = () => {
    return photos.filter(photo => likedPhotos.includes(photo.id));
};

useEffect(() => {
    console.log(photos[0]);
    console.log("Photos on page: ", photos.length);

}, [photos]);

useEffect(() => {
    localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
}, [likedPhotos]);



return (
    <div>
        <header className="gallery-header">
        <h1>
            <Link to = "/collection">Your Collection</Link>
        </h1>
        <div className="heart-counter" onClick={() => console.log(showLikedPhotos())}>
        ♥ {likedPhotos.length}
        </div>
        <input className="search-bar" placeholder="SEARCH"/>
    </header>

        <div className="gallery">
        {photos.map(photo => (

        <div key={photo.id} className="photo-card">

                <img
                src={photo.urls.small}
                alt={photo.alt_description || "Unsplash image"}
                />

        <div className="img-heart">
            
                <Heart
                heartedImg={likedPhotos.includes(photo.id)}
                heartToggle={() => toggleHeart(photo.id)}
                />

                <button
                className="zoom-btn"
                onClick={() => setExpandedPhoto(photo)}
                aria-label="Expand Images">
                ⌕
                </button>

        </div>

            <div className="picture-info">
                <p className="name stats">{photo.user.name}</p>
                <p className="downloads stats">⬇ {photo.downloads}</p>
            </div>
        </div>
        ))}
    </div>


        {expandedPhoto && (
    <div className="lightbox" onClick={() => setExpandedPhoto(null)}>
        <img
            src={expandedPhoto.urls.regular}
            alt={expandedPhoto.alt_description || "Expanded Unsplash image"}
            onClick={(e) => e.stopPropagation()}
        />

        
    </div>
)}

</div>
)};
