class Billete {

  constructor(valor, cant){
    this.imagen = new Image();
    //this.imagen.height = 300;
    //this.imagen.width = 400;
    this.valor = valor;
    this.cantidad = cant;
    this.imagen.src ="recursos/"+this.valor.toString()+".jpg";
  }
  mostrarBilletes(x, y){
    cuadro.drawImage(this.imagen, x, y, 500, 300);
  }
}
// par el canvas
var cuadrito =document.getElementById("cuadrito");
var cuadro = cuadrito.getContext("2d");

var disponible = document.getElementById("dineroCajero");
var monton = 0; // monton disponible en la caja
var caja = [];
var entregado =[];
caja.push(new Billete(100, 5) );
caja.push(new Billete(50, 8) );
caja.push(new Billete(20, 6) );
caja.push(new Billete(10, 10) );
caja.push(new Billete(5, 16) );
var dinero, div, papeles =0 ; // dinero es el que sequiere retirar

var boton = document.getElementById("extraer");
boton.addEventListener("click", entregarDinero);
var resulado = document.getElementById("resultado");// par escribir dinero que se entregara

for(var bille of caja){
  monton +=(bille.valor * bille.cantidad);
}
mostrarDisp();

function mostrarDisp(){
  disponible.innerHTML ="tienes $"+monton+ " disponible";
}

function entregarDinero(){
  var t =document.getElementById("dinero"); // trae el objetro caja de text de html
  dinero = parseInt(t.value);// asignamos el valor que tiene la caja de texto
  var posX= 0;
  var posY =0;
  cuadro.clearRect(0, 0, cuadrito.width, cuadrito.height);// limpia el canvas

  for(var bi of caja){
    if(dinero>0){
      div = Math.floor(dinero/bi.valor);// sacar los billetes
      if(div > bi.cantidad){
        papeles = bi.cantidad;
      }

      else{
        papeles = div;
      }

      entregado.push(new Billete(bi.valor, papeles) );
      dinero = dinero -(bi.valor * papeles);

      // pintar billetes
      for(i=1; i <= papeles; i++){
        bi.mostrarBilletes(posX, posY);
        posX += 100;
        if(posX >= 1000){
          posY+= 300;
          posX =0;
        }
      }
    }
  }
  // cuando el dinero a retirar es mayor al disponobre (si no tengo dinero despus de vaciar caja)

  if(dinero>0){
    cuadro.clearRect(0, 0, cuadrito.width, cuadrito.height);// limpia el canvas
    resultado.innerHTML =" no puedo entregarte esa cantidad :c" +" puede ser que no tenga billetes de una denominacion";
    entregado =[];// cuado falta billete de una cantidad y la operacion se cancela
    //innerHTML es etiqueta y se usa para escribir
  }

  else if (monton == 0){
    resultado.innerHTML =" no te queda dinero disponilbe ";
  }

  else{
    resultado.innerHTML = "";

    for (var e in entregado){
      if(entregado[e].cantidad>0){
        caja[e].cantidad = caja[e].cantidad - entregado[e].cantidad; // elimina el dinero a entregar de caja
        resultado.innerHTML +=entregado[e].cantidad + " billetes de $"+ entregado[e].valor+ "<br />";
        //se agrega resultado.innerHTML al anterior par aque salga

        monton = monton - (entregado[e].cantidad * entregado[e].valor);
      //  console.log(entregado[e], monton);
        }
    }
    entregado=[];
  }
    mostrarDisp();
}
