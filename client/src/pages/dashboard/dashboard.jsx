import React, { useState ,useEffect, useContext} from 'react';
import { TranslateContext } from '../../contex';
import Styles from './Dashboard.module.css'
 
const Dashboard = () => {
    
const {translate} = useContext(TranslateContext)

    return (
        <div className="container-fluid ">
            <div className="row gx-4">
            </div>  
            <div className="col-12">
            <div className="row">
                <div className="col-12 pd-3">
                    <div className=" pd-6 ">
                    <h6 className={["mb-0 bb-1", Styles.head_text].join(' ')}>
                        {translate('dashboard.common.containers')}: 12 &nbsp;
                        {translate('dashboard.common.container_images')}: 9 &nbsp;
                        {translate('dashboard.common.hosts')}: 21 &nbsp;
                        {translate('dashboard.common.orchestrator')}: 2 &nbsp;
                    </h6>
                    </div>
                </div>  
            </div> 
            <div className="row">          
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_1.most_exploitable.title')}</h6>
                        <div className={Styles.content_widget}>
                            <div className={Styles.content_widget_row}> 
                                <div className="col-12">                               
                                <span>7</span>
                                <br/>
                                {translate('dashboard.col_1.most_exploitable.total')}
                                </div>  
                            </div>
                            <div className={Styles.content_widget_row}> 
                                <div className="col-3">
                                <span>0</span><br/>
                                    {translate('dashboard.col_1.most_exploitable.critical')}
                                </div>                     
                                <div className="col-3">
                                <span>2</span><br/>
                                    {translate('dashboard.col_1.most_exploitable.high')}
                                </div>                     
                                <div className="col-3">
                                <span>4</span><br/>
                                    {translate('dashboard.col_1.most_exploitable.medium')}
                                </div>                    
                                <div className="col-3">
                                <span>1</span><br/>
                                    {translate('dashboard.col_1.most_exploitable.low')}
                                </div>
                            </div> 
                        </div>
                    </div>     
                </div>         
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_1.most_vulnerable_containers')}</h6>
                        <div className={Styles.content_widget}>
                           <span>8</span>
                        </div>
                    </div>                    
                </div>
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_1.most_vulnerable_hosts')}</h6>
                        <div className={Styles.content_widget}>
                           <span>2</span>
                        </div>
                    </div>                    
                </div>                                          
            </div>  
            <div className="row">
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_2.most_not_match')}</h6>
                        <div className={Styles.content_widget}>
                           <span>4</span>
                        </div>
                    </div>                    
                </div>
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_2.found_secrets')}</h6>
                        <div className={Styles.content_widget}>
                           <span>13</span>
                        </div>
                    </div>                    
                </div>
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_2.common_score')}</h6>
                        <div className={Styles.content_widget}>
                           <span>97%</span>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="row">
                <div className="col-12 pd-3">
                    <div className=" pd-6 ">
                    <h6 class="mb-0 bb-1">
                        {translate('dashboard.col_3.title')}
                    </h6>
                    </div>
                </div>  
            </div> 
            <div className="row">
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1"> {translate('dashboard.col_3.most_exploitable')}</h6>
                        <div className={Styles.content_widget}>
                           <span>4</span>
                        </div>
                    </div>                    
                </div>
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">{translate('dashboard.col_3.most_vulnerable_containers')}</h6>
                        <div className={Styles.content_widget}>
                           <span>13</span>
                        </div>
                    </div>                    
                </div>
                <div className={["col-4 pd-3", Styles.text].join(' ')}>
                    <div className="card pd-6">
                    <h6 class="mb-0 bb-1">  {translate('dashboard.col_3.most_vulnerable_hosts')}</h6>
                        <div className={Styles.content_widget}>
                           <span>13</span>
                        </div>
                    </div>                    
                </div>
            </div>           
            </div>           
        </div>
    );
};

export default Dashboard;