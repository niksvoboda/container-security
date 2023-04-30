import React from 'react';

const Pagenumbers = ({start, length, totalCount }) => {
    let po = Number(start) + Number(length)
    po > totalCount ? po = totalCount : po = Number(start) + Number(length)
    const s  = start + 1
    
    return (
        <>
        { totalCount > 0 ? 
        <div className="dataTables_info"  role="status" aria-live="polite">
        Записи с {(s)} по {po} из {totalCount} записей
        </div> :
        <div className="dataTables_info"  role="status" aria-live="polite">
        Записей не найдено... 
        </div>}
        </>
    );
};

export default Pagenumbers;