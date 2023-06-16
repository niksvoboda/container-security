import React, { useState } from 'react';
import Left_menu from '../components/UI/left_menu';
import Navbar from '../components/UI/navbar';
import Side_conf from '../components/UI/side_conf';
import Footer from '../components/UI/footer';

const Tpl_main = (props) => {
const {page} = props;
const [side_conf_show, set_side_conf_show] = useState(false);
const [footer_show, set_footer_show] = useState(false);
return (
<>
<Left_menu/>
<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
<Navbar/>
{page}
{footer_show && <Footer/>}
</main>
{side_conf_show && <Left_menu/>}
</>
);
};

export default Tpl_main;