import React from 'react';
import 'animate.css/animate.min.css';

const Planeta = ({caracteristicas, func, indice}) => {
  
  return (
    <div className='grid-item' onClick={() => func(caracteristicas)}>
        {(caracteristicas.validada)?
            <img className='planeta animate__bounceIn' src={caracteristicas.img} alt={caracteristicas.nombre} />        
        :
            <img className={`equis ${caracteristicas.seleccionado ? 'seleccionado animate__animated animate__shakeX animate__faster' : ''}`} src='/exercise-1/x.png' alt={caracteristicas.nombre} />  
        }
        
    </div>
  )
}

export default Planeta;
