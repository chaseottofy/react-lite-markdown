export default function Button({ title, btnclass, onClick }) {
  return <button className={btnclass} onClick={() => onClick()}>
    {title}
  </button>
}