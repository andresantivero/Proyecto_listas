import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})

export class ListaService {
  public listas: Lista[] = [];
  constructor() {
    this.cargarStorage();
  }

  crearLista(nombreLista: string) {

    let ObjetoLista = new Lista(nombreLista);

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

  eliminarLista(lista: Lista) {
    let nuevoListado = this.listas.filter((listaItem) => listaItem.id !== lista.id); //Guardamos todas las listas menos lalista a eliminar

    //filter devuelve un arreglo de listas
    this.listas = nuevoListado;
    this.guardarStorage();
  }

  editarLista(lista: Lista) {
    let listaEditar = this.listas.find((listaItem) => listaItem.id == lista.id); //Guardamos todas las listas menos la lista a eliminar

    //find devuelve el primer valor que encuentra
    if (listaEditar) {
      listaEditar.titulo = lista.titulo;
    }

    this.guardarStorage();
  }


}
