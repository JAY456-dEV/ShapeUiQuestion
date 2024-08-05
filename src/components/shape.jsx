import React, { useEffect, useState } from 'react'

function Shape() {

    const [flatedArr, setFlattedArr] = useState([])
    const [selectedBox, setSelectedBox] = useState([])

    const BOX_DATA = [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
    ];

    useEffect(() => {
        let flatArr = BOX_DATA.flat()
        setFlattedArr(flatArr)
    }, [])

    function handleBoxClick(idx) {
        setSelectedBox((prev) => ([...prev, idx]))
    }

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (selectedBox.length >= flatedArr.length - 2) {
            setShow(true)
            const interval = setInterval(() => {
                setSelectedBox(prevItems => {
                    if (prevItems.length === 0) {
                        setShow(false)
                        clearInterval(interval);
                        return prevItems;
                    }
                    return prevItems.slice(1);
                });
            }, 500);
        }
    }, [selectedBox]);

    return (
        <>
            <div className='mainBox'>
                {
                    flatedArr.map((item, idx) => {
                        return (
                            <button data-num={item} key={idx} disabled={show} className={`box ${selectedBox.length > 0 && selectedBox.indexOf(idx) !== -1 && 'activeColor'}`} onClick={() => handleBoxClick(idx)}></button>
                        )
                    })
                }
            </div >
        </>
    )
}

export default Shape