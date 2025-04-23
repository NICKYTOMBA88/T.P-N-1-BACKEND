// PROCCES.ARGV ES SIEMPRE UN ARRAY
// PROCCES.ARGV SON LOS ARGUMENTOS DE LA TERMINAL A LA HORA DE EJECUTAR EL PROCESO
const args = process.argv.slice(2)
const action = args[0]

if (action === "help") {
  console.log(`
    getTire -> Mostrar neumaticos disponibles
    createTire -> Agregar neumatico
    updateTire -> Actualizar neumatico
    deleteTire -> Eliminar neumatico
    `)
}
// console.log(action)
// let response;
// switch (action) {
//   case "getTires":
//     response = "obteniendo los usuarios..."
//     break
//   case "createTire":
//     response = "creando neumatico..."
//   default:
//     response = "comando incorrecto"

// }
// console.log(response)