import React from 'react';

const Type_1 = ({register}) => {
    return (
<div className="row">              
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                        <label className="form-label">image_id</label>
                        <input
                        {...register('image_id', {
                          required:'Укажите имя пользователя',
                          maxLength: 50
                      })}
                      type="email" className="form-control"/>
                    </div>
              </div>
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">repository</label>
                      <input 
                        {...register('repository', {
                          required:'Укажите мобильный телефон',
                          maxLength: 128
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>      
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">tag</label>
                      <input 
                        {...register('tag', {
                          required:'Укажите мобильный телефон',
                          maxLength: 50
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>                    
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">size</label>
                      <input 
                        {...register('size', {
                          required:'Укажите мобильный телефон',
                          maxLength: 50
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>
            </div>
    );
};

export default Type_1;