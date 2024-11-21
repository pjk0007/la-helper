export default function Home() {
  return (
    <div>
      <button onClick={window.api.start}>start</button>
      <button onClick={window.api.finish}>finish</button>
    </div>
  );
}
