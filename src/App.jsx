import React, { useState} from 'react';
import imagenes from './imagenes';
import Planeta from './Planeta';
import Swal from 'sweetalert2';

const App = () => {

  const [num, setNum] = useState(0);
  const [astros, setAstros] = useState(imagenes);
  const [puntuacion, setPuntuacion] = useState(0);
  //const [jugada1, setJugada1] = useState(null);
  //const [jugada2, setJugada2] = useState(null);

  const jugada = (planeta) => {

    if(num == 0){
      //setJugada1(name);
      if(!planeta.validada){
        setNum(num + 1);
        localStorage.setItem('planeta1', JSON.stringify(planeta));
        let nuevosAstros = astros.filter( (astro) => {
          if(astro.seleccionado){
            let { seleccionado, ...resto } = astro; // Usar destructuring para eliminar la propiedad 'validada'
            return resto; // Devolver el objeto sin la propiedad 'validada'            
          }else{
            return astro;
          }
        });
        setAstros(nuevosAstros);
        setAstros(prevAstros => prevAstros.map(astro => astro.id === planeta.id ? { ...astro, seleccionado: true } : astro));
      }else{
        console.log('Ya ha sido validado');
      }
      //console.log(astros.length);
    }

    if(num == 1){
      //setJugada2(name);
      if(!planeta.validada){
        setNum(num + 1);
        localStorage.setItem('planeta2', JSON.stringify(planeta));
                
        let planeta1 = localStorage.getItem('planeta1');
        let planeta2 = localStorage.getItem('planeta2');
  
        //si tienen el mismo id 
        if(JSON.parse(planeta1).id == JSON.parse(planeta2).id){
          console.log("mismo id");
          let nuevosAstros = astros.filter( (astro) => {
            astro.seleccionado = false;
            return astro;
          });
          setAstros(nuevosAstros);
          setNum(0);
          return;
        }
        //si los nombre son diferentes
        if(JSON.parse(planeta1).name != JSON.parse(planeta2).name){
          console.log("nombre diferente");
          let nuevosAstros = astros.filter( (astro) => {
            astro.seleccionado = false;
            return astro;
          });
          setAstros(nuevosAstros);
          setNum(0);
          return;
        }
        //si el planeta tienen propiedad valida la jugada no es valida
        //si la ejecucion llega hasta aqui tengo que buscar los planetas con ese ID y ponerle a esos planetas la propiedad validad = true
        console.log(planeta1, planeta2);
        let nuevosAstros = astros.filter( (astro) => {
          if(JSON.parse(planeta1).id == astro.id){
            astro.validada = true;
            astro.seleccionado = false;
          }
          if(JSON.parse(planeta2).id == astro.id){
            astro.validada = true;
            astro.seleccionado = false;
          }
          return astro;
        })
        console.log(nuevosAstros);
        setPuntuacion(puntuacion + 1);
        setAstros(nuevosAstros);
        setNum(0);
        felicitaciones();
        //setNum(num + 1);
      }else{
        console.log('ya ha sido validado');
      }
    }
  }

  const felicitaciones = () => {
    console.log(astros.length, puntuacion);

    let todosValidados = true;
    
    astros.forEach( (astro) => {
      if(!astro.validada){
        todosValidados = false;
      }
    });

    if(todosValidados){
      Swal.fire({
        title: "Felicitaciones!",
        text: "Encontraste todas las parejas, pulsa el boton para volver a jugar",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes ejecutar cualquier código que desees después de que el usuario haya confirmado el diálogo modal
          console.log("El usuario ha confirmado el diálogo modal");
          window.location.reload();
        }
      });
    }

  }

  return (
    <>
    <h1 className='centro'>Puntuacion: {puntuacion}</h1>
    <div className='planetas'>
      {
        astros.map( (planeta, index) => {
          return <Planeta key={index} caracteristicas={planeta} func={jugada}></Planeta>
        })
      }
    </div>
    </>
 
  )
}

export default App;
