import { Maybe } from "../utils/maybe.js";
import { partialize, compose } from "../utils/operators.js";
import { handleStatus } from "../utils/promise-helpers.js";

const API = "http://localhost:3000/notas";

const getItemsFromNotas = (notasMonad) =>
  notasMonad.map((notas) => notas.flatMap((nota) => nota.itens));

const filterItemsByCode = (code, itemsMonad) =>
  itemsMonad.map((items) => items.filter((item) => item.codigo === code));

const sumItemsValue = (itemsMonad) =>
  itemsMonad.map((items) =>
    items.reduce((total, item) => total + item.valor, 0)
  );

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .then((notas) => Maybe.of(notas))
      .catch((err) => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais");
      });
  },
  sumItems(code) {
    const sumItems = compose(
      sumItemsValue,
      partialize(filterItemsByCode, code),
      getItemsFromNotas
    );

    return this.listAll()
      .then(sumItems)
      .then((result) => result.getOrElse(0));
  },
};
