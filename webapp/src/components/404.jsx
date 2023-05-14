import React from 'react';
import { Question, ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const FourzeroFour = () => { 
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate(-1);
    }

    return (
        <div className='container-fluid fourzero-content'>
            <Question className='icon-question'/>
            <h1 className='mt-3' style={{fontSize: '2rem', letterSpacing: '1px'}}>Oopzz. 404 Not Found.</h1>
            <p style={{letterSpacing: '2px', fontSize: '1rem'}}>This page might be removed or not available.</p>
            <button onClick={goBack} className='mt-4'><ArrowLeftCircleFill style={{fontSize: '1.5rem'}} /> &nbsp;Go Back</button>
        </div>
    )
}

export default FourzeroFour