import React, { useState, useEffect, useMemo, useRef } from 'react';
import { COLUMNS } from './columns'
import "./styles/ViolatorTable.css"


export const ViolatorTable = (props) => {

    const [data, setData] = useState([{}])
    const [sorting, setSorting] = useState({ key: 'timestamp', ascending: true })
    const columns = useMemo(() => COLUMNS, [])
    const [scrollingTable, setScrollingTable] = useState(false)

    const theadRef = useRef(null);

    useEffect(() => {
        sortData()
    }, [props.violators])

    useEffect(() => {
        sortData()
    }, [sorting])

    function sortData (){
        const obj = sorting.ascending 
        ? props.violators.sort((a, b) => (a[`${sorting.key}`] < b[`${sorting.key}`]  ? 1 : -1))
        : props.violators.sort((a, b) => (a[`${sorting.key}`] > b[`${sorting.key}`]  ? 1 : -1))

        setData(Object.values(obj))
    }

    const handleScroll = (e) => {
        console.log(theadRef.current.clientHeight)
        console.log(theadRef.current.clientWidth)
        if (e.target.scrollTop > 0) {setScrollingTable(true)}
        else {setScrollingTable(false)}
    }

    return (
    <div className='table-div' onScroll={handleScroll}>
    <table>
        <thead ref={theadRef}>
            <tr style={scrollingTable ? {"--bgColor": 'rgba(0, 0, 0, 0.9)'} : {"--bgColor": 'transparent'}}>
                {columns.map((column) => {
                    return (
                    <th onClick={() => setSorting({ key: column.accessor, ascending: !sorting.ascending }) 
                    }>{column.Header}
                    {(sorting.key === column.accessor && sorting.ascending) ? ' ↑'
                    : (sorting.key === column.accessor && !sorting.ascending)  
                    ? ' ↓' : ' ↕'}
                    </th>
                    )
                })}

            </tr>
        </thead>
        <tbody>
            {data.map((violator) =>
                <tr key={violator.droneSerialNumber}>
                    <td>{violator.FirstName + " " + violator.LastName}</td>
                    <td>{violator.droneSerialNumber}</td> 
                    <td>{new Date(violator.timestamp).toLocaleTimeString('fi-FI').replace(".", ":").replace(".", ":")}</td> 
                    <td>{violator.distance}m</td>
                    <td>{violator.PhoneNumber}</td> 
                    <td>{violator.Email}</td> 
                </tr>
            )}
        </tbody>
    </table>
    </div>
    )
}
