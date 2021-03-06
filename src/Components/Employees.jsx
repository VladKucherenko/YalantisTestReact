import style from './Employees.module.css'
import React, { useState, useEffect } from 'react';
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Employees = React.memo(props => {

    let [checkboxs, setCheckboxs] = useState([]);
    
    useEffect(() => {//getPeople
        props.addItems();
        
    }, []);

   
    let isEmpty;
    
    let checkboxChoose = (id, e) => {
        if (e.currentTarget.checked) {
            setCheckboxs([...checkboxs, id]);
        }
        else{
            setCheckboxs(checkboxs.filter((idCheck) => idCheck !== id));
        }
    }

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('items'));
        if(items){
            setCheckboxs(items);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(checkboxs));

    }, [checkboxs]);
    

    useEffect(() => {
        if(props.items.length != 0 ){
            props.setUsers([]); 
            props.setUsers(checkboxs);  
        }

    }, [checkboxs, props.items.length]);
    
    return (<>
        <div className={style.employees}>
            <h1 className={style.forTitle}>
                Employees
            </h1>
           <div>
                {arr_EN
                    .map((letter, index, array) => {
                       
                        return (
                        <div  className={style.letter} id='alphabet' key={index.toString()}>
                            <span>
                                {letter + ' '}
                            </span>
                            {props.items
                            .filter(member => {
                                isEmpty = false;
                                return member.lastName.charAt(0) === letter})
                            .sort(function(a, b) {
                                var nameA = a.lastName.toUpperCase();
                                var nameB = b.lastName.toUpperCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }
                                return 0;
                                })
                            .map((member, index) => {
                                isEmpty = true;
                                return <div className={style.forDiv} key={index}>
                                    <span className={style.name}>{member.lastName + member.firstName}</span> 
                                    <input 
                                    className={style.input} 
                                    id={member.id} 
                                    checked={checkboxs.indexOf(member.id) != -1}
                                    type="checkbox" 
                                    onChange={(e) => checkboxChoose(member.id, e)}/>
                                </div>})
                            }
                            <div>
                                {!isEmpty
                                && <div>---------</div>}
                            </div>
                        </div>)
                })
                    }
                    
                    
            </div>
        </div>
        <div className={style.empBirthday}>
            <h1 className={style.forTitle}>
                Employees Birthdays
            </h1>

            {/* Прізвище Імя - день(31) Місяць, рік(1944) year*/}
            {(checkboxs.length === 0) 
            ?  
            <div> 
                <h3 className={style.BirthItems}>
                    No selected employees
                </h3>
            </div>
            :
                props.months.map(
                    month => {
                        return month.id.length != 0 
                        && 
                        <div className={style.BirthItems}> 
                            <h3>
                                {month.name}
                            </h3>
                            {
                                month.id.map(user => 
                                    { return <div> 
                                        {user.lastName + ' ' + ' ' + user.firstName } 
                                    </div> })
                            }
                        </div>
                    }
                )
            }
        
        </div>
    </>);
});

export default Employees;

