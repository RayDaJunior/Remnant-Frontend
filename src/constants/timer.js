import React, {useState, useRef, useEffect} from 'react';
import {hp, wp} from './styled';
import {Text} from 'react-native';

const Timer = props => {
  const [time, settime] = useState(60);
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;

  const timerRef = useRef(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        props.settimer(false);
      } else {
        settime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
      props.settimer(false);
    };
  }, []);

  return (
    <Text style={{color: 'black', fontSize: hp(1.8), fontWeight: 'bold'}}>
      {time} {' sec'}
    </Text>
  );
};

export default Timer;
