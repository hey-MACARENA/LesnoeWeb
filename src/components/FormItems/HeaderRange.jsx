import {
  DatePicker,
} from "antd";
import React, { useEffect } from "react";
const { RangePicker } = DatePicker;

function HeaderRange(props) {
  useEffect(() => {
    props.dispatch(props.fetchData(props.url, props.currentSort, props.currentFilters));
  }, [props.dispatch, props.currentFilters]);

  const handleFilterChange = (date) => {
    const [ start_date, end_date ] = date;
    props.dispatch(props.changeCurrentFilter( { key: 'start_date', value: start_date } ));
    props.dispatch(props.changeCurrentFilter( { key: 'end_date', value: end_date } ));
  };

  return (
    <>
      <RangePicker 
        data-key-field={props?.name || ''}
        placeholder="Введите"
        allowEmpty={[true, true]}
        onChange={(date, dateString) => {
          handleFilterChange(dateString);
        }}
      />
    </>
  );
}

export default HeaderRange;
