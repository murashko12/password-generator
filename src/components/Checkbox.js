function Checkbox(props) {
  const { value, onChange } = props;

  return (
    <div className="checkbox">
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
}

export default Checkbox;
