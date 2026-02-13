export default function Heart({heartedImg, heartToggle}) {
    return (
        <button
        onClick={heartToggle}
        className={`heart-btn ${heartedImg ? `hearted` : ""}`}
        aria-label="Favourite this picture">
        {heartedImg ? "♥" : "♡"}
        </button>
    );
}