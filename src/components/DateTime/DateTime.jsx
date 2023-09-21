import { useEffect, useState } from 'react';
import "./DateTime.css";

const DateTime = () => {

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'};
  const formattedDate = firstLetter(currentDateTime.toLocaleDateString(undefined, options).replace(',',''));

  function firstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (<p className='dateTime'>{formattedDate}</p>);
}

export default DateTime;