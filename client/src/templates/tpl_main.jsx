import React, { useState } from 'react';
import Aside from '../components/UI/aside';
import Navbar from '../components/UI/navbar';
import Side_conf from '../components/UI/side_conf';
import Footer from '../components/UI/footer';

const Tpl_main = (props) => {
const {page} = props;
const [side_conf_show, set_side_conf_show] = useState(false);
return (
<>
<Aside/>
<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
<Navbar/>
{page}
<Footer/>
</main>
{side_conf_show && <Side_conf/>}
</>
);
};

export default Tpl_main;