'use server';

{/*Archivo para definir funciones fetch*/}

export async function fetchInsumos(){
  try {
    const response = await fetch("urlApi")

    if (!response.ok){
      throw new Error("Error al recuperar los insumos.")
    }

    const responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error("Error de base de datos: ", error)
  }
}