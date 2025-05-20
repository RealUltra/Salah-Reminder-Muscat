interface Props {
  view: number;
  setView: (view: number) => void;
}

const Navigation = ({ view, setView }: Props) => {
  function prev() {
    if (view !== -1) {
      setView(view - 1);
    }
  }

  function next() {
    if (view !== 1) {
      setView(view + 1);
    }
  }

  return (
    <div className="nav-buttons">
      <button
        className={"nav-button " + (view === -1 ? "disabled" : "")}
        disabled={view === -1}
        onClick={() => prev()}
      >
        {"<"}
      </button>
      <button
        className={"nav-button " + (view === 1 ? "disabled" : "")}
        disabled={view === 1}
        onClick={() => next()}
      >
        {">"}
      </button>
    </div>
  );
};

export default Navigation;
