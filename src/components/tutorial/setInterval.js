import {useEffect, useState, useRef} from 'react';

let count = 0;
const SetInterval = ()=>{
    const [sec, setSec] = useState(0);
    //console.log(sec);

    const [, refresh] = useState();
    const secRef = useRef(0);

    const setCount = (value)=>{
        count = value;
        refresh({}); //count works, refresh needs just to show display
    }

    useEffect(()=>{
        setInterval(()=>{
            //console.log('sec', sec);//всегда сек равно 0,
            // потому что таким он запомнил в инициалихации интервал функции
            //setSec(sec+1);//здесь работает, но суть в том что всегда сек с нуля на один
            //пропсы тоже самое, интервал запомнит только те пропсы и стейты которые были в начале

            //рефы тут по другому
            //интервал видит изменивлиеся рефы
            //единственно надо дершать рефреш
            /*secRef.current++;
            refresh({});*/
            //можно тут так setSec(secRef.current);

            setCount(count+1);//обычные чистые переменные тоже работают
            //вместе рефреш конечно
        }, 1000)
    }, []);
    return <div>
        Seconds: {count}
    </div>;
}

export {SetInterval};