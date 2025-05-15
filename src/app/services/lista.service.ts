import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ListaService {
  public listas: any[] = [];
  constructor() {
    this.cargarStorage();
  }

  crearLista(nombreLista: string) {
    let ObjetoLista = { //creamos una variable de tipo array
      id: 0,
      titulo: nombreLista,
      creadaEn: new Date(),
      terminadaEn: null,
      completada: false,
      item: [] //Para guardar la lista de actividades
    };
    this.listas.push(ObjetoLista); //ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();

    return ObjetoLista.titulo;
  }

  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el segundo el contenido
  }

  cargarStorage() {
    const listaStorage = localStorage.getItem('listas'); //Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar
    if (listaStorage === null) {
      return this.listas = []; //Si el Storage está vacío devolvemos el objeto listas vacío también
    }
    else {
      let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
      return this.listas = objLista;
    }
  }

}
