function DatePicker({
  label = "Travel Date",
  value,
  onChange,
  min
}) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
}

export default DatePicker;