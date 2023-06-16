import React, { useContext} from 'react';
import { TranslateContext } from '../../../contex';


const Pagenumbers = ({start, length, totalCount }) => {
    const {translate} = useContext(TranslateContext)
    let po = Number(start) + Number(length)
    po > totalCount ? po = totalCount : po = Number(start) + Number(length)
    const s  = start + 1
    
    return (
        <>
        { totalCount > 0 ? 
        <div className="dataTables_info"  role="status" aria-live="polite">
        {translate('common.ui_kit.pagenumbers.records_from')} {(s)}&nbsp;   
        {translate('common.ui_kit.pagenumbers.to')}  {po}&nbsp;
        {translate('common.ui_kit.pagenumbers.from')} {totalCount}&nbsp; 
        {translate('common.ui_kit.pagenumbers.records')}&nbsp; 
        </div> :
        <div className="dataTables_info"  role="status" aria-live="polite">
        {translate('common.ui_kit.pagenumbers.not_found')}        
        </div>}
        </>
    );
};

export default Pagenumbers;