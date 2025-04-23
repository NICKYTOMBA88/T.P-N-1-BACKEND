
import { createTire, getTires, updateTire, deleteTire, getTiresById } from "./logicaDeNegocio"

const main = async () => {

  let response;

  // ARRAY DE ARGUMENTOS -> node index.js
  const args = process.argv.slice(2)

  // DEFINIENDO PARAMETROS EN CODIGO
  let action = args[0]
  let id = ""
  let newTire = {};
  let body = {};

  switch (action) {
    case "getTires":
      response = await getTires();
      break;
    case "getTiresById":
      response = await getTiresById(id);
      break;
    case "createTire":
      // response = await createTire(newTire: body);
      break
    case "upadeteTire":
      response = await updateTire(id, body);
    case "deleteTire":
      response = await deleteTire(id);
      break
    default:
      response = { error: "accion no valida" }
  }
  console.log(response)
};
main()

// CLI -> COMMAND LINE INTERFACE FUNCIONA SOLO EN LA LINEA DE COMANDOS
