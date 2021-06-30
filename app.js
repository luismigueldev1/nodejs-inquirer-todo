const colors = require("colors");
const { guardarDb, leerDb } = require("./helpers/crud");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDb = leerDb();

  if (tareasDb) {
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3": //listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": //listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "5": //
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toogleCompletadas(ids);
        break;
      case "6": //borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }

    guardarDb(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
