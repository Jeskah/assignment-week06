import "./gallery.css"
import { useEffect, useState } from "react";

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
        .catch(console.errror);
}, [picIds]);

useEffect(() => {
    console.log(photos[0]);
    console.log("Photos on page: ", photos.length);

}, [photos]);


return (
  <div className="gallery">
    {photos.map(photo => (
    <div key={photo.id} className="photo-card">
        <img
        src={photo.urls.small}
        alt={photo.alt_description || "Unsplash image"}
        />

        <div className="picture-info">
        <p className="name stats">{photo.user.name}</p>
        <p className="downloads stats">⬇ {photo.downloads}</p>
        </div>
    </div>
    ))}
</div>
);
}