import { notasService as service } from "./nota/service.js";
import { debounceTime, takeUntil } from "./utils/operators.js";
import { EventEmitter } from "./utils/event-emitter.js";

const action = debounceTime(
  500,
  takeUntil(3, () =>
    service.sumItems("2143").then(total => EventEmitter.emit('itensTotalizados', total)).catch(console.log)
  )
);

document.querySelector("#myButton").onclick = action;
