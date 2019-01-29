import React from 'react';
const DateChooser = ({ setMonth, setYear }) => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  const years = [];
  for (let i = 1970; i < 2019; i++) {
    years.push(i);
  }
  const changeDateReq = ({ target: { value } }) => {
    if (value.length === 2) setMonth(value);
    else setYear(value);
  };
  return (
    <>
      <label>Select Month</label>
      <select onChange={changeDateReq} id="month-list">
        {months.map(month => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
      <label>Select Year</label>
      <select onChange={changeDateReq} id="year-list">
        {years.map(year => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
export default DateChooser;
