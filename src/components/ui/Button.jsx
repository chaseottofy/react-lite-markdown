export default function Button({ id, btnclass, title, onClick }) {
  return (
    <button
      className={btnclass}
      onClick={() => onClick()}
      id={id ? id : null}
      role="button"
      aria-label="button"
    >
      {title}
    </button>
  );
}
