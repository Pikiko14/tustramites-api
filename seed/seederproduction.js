const mongoose = require("mongoose");
const seeder = require("mongoose-seed");
const { genSaltSync, hashSync } = require("bcryptjs");
const salt = genSaltSync(10);

// initial seeds
seeder.connect(
  "mongodb://127.0.0.1:27017/tuexpertolegal?directConnection=true",
  function () {
    seeder.loadModels([
      "models/Internationalization.js",
      "models/User.js",
      "models/Category.js",
    ]);

    seeder.clearModels(
      ["Internationalization", "User", "Category"],
      function () {
        seeder.populateModels(data, function () {});
      }
    );
  }
);

var data = [
  {
    model: "Internationalization",
    documents: [
      {
        code: "es",
        name: "Español",
        state: true,
      },
      {
        code: "en",
        name: "Ingles",
        state: true,
      },
    ],
  },
  {
    model: "User",
    documents: [
      {
        first_name: "Administrador",
        last_name: "Tus tramites",
        email: "admin@tustramites.com",
        password: hashSync("12345678", salt),
        verify: true,
        role: "ADMINISTRADOR",
        url_image: "",
      },
      {
        first_name: "Cliente",
        last_name: "Prueba",
        email: "cliente@gmail.com",
        password: hashSync("12345678", salt),
        verify: true,
        role: "CLIENTE",
        url_image: "",
      },
    ],
  },
  {
    model: "Category",
    documents: [
      {
        name: "Familia",
        description: "Descripción Familia",
      },
      {
        name: "Inmobiliario",
        description: "Descripción Inmobiliario",
      },
      {
        name: "Empresarial",
        description: "Descripción Empresarial",
      },
      {
        name: "Trámites especiales",
        description: "Descripción Trámites especiales",
      },
    ],
  },
];

const dataActs = [
  {
    model: "NotarialActs",
    documents: [
      {
        notary: true,
        payment: true,
        document_result: "Petición",
        date: true,
        time_delivery: "0 meses",
        name: "Autorización de salida al exterior de menor de edad",
        category: {
          _id: "654ee1daec53657cb8ebba82",
          name: "Familia",
          description: "Descripción Familia",
        },
        description:
          "Acto jurídico mediante el cual uno o los dos progenitores autoriza la salida del país del menor de edad.\n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tRealización de la solicitud - minuta \n•\tSolicitud y Recolección de documentos \n•\tTrámite en la notaria para la firma de la escritura\n•\tRetiro de 2 copias certificadas\n•\tEntrega de documentación\nLos honorarios cancelados, no cubre:\n•\tPago en notaria\n",
        form: {
          "61e72f62982f4f56aaf1a07a": {
            input: {
              type: "text",
              required: false,
              _id: "61e72f62982f4f56aaf1a07a",
              name: "Nombre completo",
              maxCant: 50,
              minCant: 7,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: true,
              },
            },
          },
          "61e73042982f4f56aaf1a07b": {
            input: {
              type: "text",
              required: true,
              _id: "61e73042982f4f56aaf1a07b",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "61e73065982f4f56aaf1a07c": {
            input: {
              type: "text",
              required: true,
              _id: "61e73065982f4f56aaf1a07c",
              name: "Profesión/Ocupación",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "61e73093982f4f56aaf1a07d": {
            input: {
              type: "number",
              required: true,
              _id: "61e73093982f4f56aaf1a07d",
              name: "Celular/Teléfono",
              maxCant: 14,
              minCant: 6,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "61e730b6982f4f56aaf1a07e": {
            input: {
              type: "email",
              required: true,
              _id: "61e730b6982f4f56aaf1a07e",
              name: "Correo electrónico",
              maxCant: 25,
              minCant: 7,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "61e732f8982f4f56aaf1a07f": {
            input: {
              type: "text",
              required: true,
              _id: "61e732f8982f4f56aaf1a07f",
              name: "Dirección",
              maxCant: 60,
              minCant: 10,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: true,
              },
              "Solicitante 2": {
                iterative: false,
                checked: true,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "621554126dc93955bb8bc2c1": {
            input: {
              type: "text",
              required: true,
              _id: "621554126dc93955bb8bc2c1",
              name: "Dirección y teléfono del lugar en el exterior",
              maxCant: 70,
              minCant: 5,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "6215543d6dc93955bb8bc2c2": {
            input: {
              type: "date",
              required: true,
              _id: "6215543d6dc93955bb8bc2c2",
              name: "Fecha de salida",
              maxCant: 10,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "6215548b6dc93955bb8bc2c3": {
            input: {
              type: "date",
              required: true,
              _id: "6215548b6dc93955bb8bc2c3",
              name: "Fecha de retorno",
              maxCant: 10,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "621554a46dc93955bb8bc2c4": {
            input: {
              type: "text",
              required: true,
              _id: "621554a46dc93955bb8bc2c4",
              name: "Aerolínea",
              maxCant: 14,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "621554df6dc93955bb8bc2c5": {
            input: {
              type: "text",
              required: true,
              _id: "621554df6dc93955bb8bc2c5",
              name: "Nº de vuelo",
              maxCant: 10,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "621555576dc93955bb8bc2c6": {
            input: {
              type: "text",
              required: true,
              _id: "621555576dc93955bb8bc2c6",
              name: "Viaja solo",
              maxCant: 9,
              minCant: 2,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: true,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: false,
              },
            },
          },
          "621555b06dc93955bb8bc2c7": {
            input: {
              type: "text",
              required: false,
              _id: "621555b06dc93955bb8bc2c7",
              name: "Relación con el menor (Pariente, tutor, etc)",
              maxCant: 10,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              Solicitante: {
                iterative: false,
                checked: false,
              },
              "Solicitante 2": {
                iterative: false,
                checked: false,
              },
              "Datos viaje": {
                iterative: false,
                checked: false,
              },
              "Si viaja con una tercera persona que no sean los padres": {
                iterative: false,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "61e72e3c982f4f56aaf1a076",
              name: "Solicitante",
            },
            iterative: false,
          },
          {
            actor: {
              _id: "624b5fbf6dc93955bb8bc2e9",
              name: "Solicitante 2",
            },
            iterative: false,
          },
          {
            actor: {
              _id: "61e72e78982f4f56aaf1a078",
              name: "Datos viaje",
            },
            iterative: false,
          },
          {
            actor: {
              _id: "61e72e8f982f4f56aaf1a079",
              name: "Si viaja con una tercera persona que no sean los padres",
            },
            iterative: false,
          },
        ],
        documents: [
          {
            group: "GENERAL",
            name: "Copias de cédula y certificado de votación del o los progenitores que autorizan",
            required: true,
          },
          {
            group: "GENERAL",
            name: "Copia de cédula del menor",
            required: true,
          },
          {
            group: "GENERAL",
            name: "Copia de cédula y certificado de votación de la tercera persona cuando el menor viaje sin los padres (de ser el caso)",
            required: false,
          },
          {
            group: "GENERAL",
            name: "Si el solicitante actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado. ",
            required: false,
          },
        ],
        duration: "1 día",
        note: "Si el menor viaja con uno de los padres, la solicitud debe ser llenada por el padre que no viaja con el menor. \nSi el menor viaja sin sus padres, la solicitud deben llenarla los dos.  ",
        page: null,
      },
      {
        notary: true,
        payment: true,
        document_result: "",
        date: false,
        time_delivery: "3 horas",
        name: "APERTURA Y PUBLICACIÓN DE TESTAMENTOS CERRADOS ",
        category: {
          _id: "654ee1daec53657cb8ebba82",
          name: "Familia",
          description: "Descripción Familia",
        },
        description:
          "En el caso de que un Notario sea custodio del testamento cerrado otorgado por el fallecido, te podemos ayudar gestionando la apertura del testamento.\n\nLos honorarios de Tu Trámite VIP incluye:\n\tAnálisis de información y/o documentación digital\n\tRealización de la solicitud - petición \n\tSolicitud y recolección de documentos \n\tCita en Notaria para la apertura\nLos honorarios cancelados, no cubre:\n\tPago en notaria\n\nDuración del trámite: 4 meses\n",
        form: {
          "65779d5a48555613bcfb6eea": {
            input: {
              type: "text",
              required: true,
              _id: "65779d5a48555613bcfb6eea",
              name: "Nombre",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779d9848555613bcfb6eeb": {
            input: {
              type: "text",
              required: false,
              _id: "65779d9848555613bcfb6eeb",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "65779dcc48555613bcfb6eec": {
            input: {
              type: "text",
              required: false,
              _id: "65779dcc48555613bcfb6eec",
              name: "Profesión / Ocupación",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e3e48555613bcfb6eef": {
            input: {
              type: "text",
              required: false,
              _id: "65779e3e48555613bcfb6eef",
              name: "Dirección",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "6600ff587cd93c4ee8c875d0": {
            input: {
              type: "text",
              required: false,
              _id: "6600ff587cd93c4ee8c875d0",
              name: "Notaria a cuya custodia está el testamento cerrado ",
              maxCant: 30,
              minCant: 2,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "6600ff817cd93c4ee8c875d1": {
            input: {
              type: "text",
              required: false,
              _id: "6600ff817cd93c4ee8c875d1",
              name: "Fecha y datos del testamento",
              maxCant: 50,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
              HEREDERO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "6601019c7cd93c4ee8c875d3": {
            input: {
              type: "text",
              required: false,
              _id: "6601019c7cd93c4ee8c875d3",
              name: "Nacionalidad",
              maxCant: 10,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: false,
              },
              HEREDERO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "660101ba7cd93c4ee8c875d4": {
            input: {
              type: "text",
              required: false,
              _id: "660101ba7cd93c4ee8c875d4",
              name: "Nº cédula/pasaporte",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: false,
              },
              HEREDERO: {
                iterative: true,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "65fe01d67cd93c4ee8c875ce",
              name: "SOLICITANTE",
            },
            iterative: false,
          },
          {
            actor: {
              _id: "65fe01eb7cd93c4ee8c875cf",
              name: "HEREDERO",
            },
            iterative: true,
          },
        ],
        documents: [
          {
            group: "General",
            name: "•\tCopias de cédula y certificado de votación a color de todos los interesados",
            required: true,
          },
          {
            group: "General",
            name: "•\tCopias de pasaporte y visa vigente a color, en caso de ser extranjeros",
            required: false,
          },
          {
            group: "General",
            name: "•\tSi el solicitante actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado. ",
            required: false,
          },
        ],
        duration:
          "4 semanas con inscripción en Registro de la Propiedad desde 15 y 17 días hábiles 4 semanas con inscripción en Registro de la Propiedad desde 15 y 17 días hábiles ",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "content",
        },
      },
      {
        notary: false,
        payment: true,
        document_result: "",
        date: false,
        time_delivery: "0 meses",
        name: "COPIA CERTIFICADA",
        category: {
          _id: "654ee1daec53657cb8ebba85",
          name: "Trámites especiales",
          description: "Descripción Trámites especiales",
        },
        description:
          "Trámite mediante el cual se solicita copias de poderes, escrituras de compraventa, etc. \n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tRealización de la minuta \n•\tRecolección de documentos originales (de ser el caso)\n•\tTrámite en la notaria para la copia certificada\n•\tEntrega de 2 copias certificadas\n•\tEn caso de que se vaya a enviar al exterior trámite para apostillar\nLos honorarios cancelados, no cubre:\n•\tPago en notaria\n•\tPago de apostilla (en caso de requerimiento por el usuario) \n\nDuración del trámite: 1 día hábil\n",
        form: {
          "65779d5a48555613bcfb6eea": {
            input: {
              type: "text",
              required: true,
              _id: "65779d5a48555613bcfb6eea",
              name: "Nombre",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e3e48555613bcfb6eef": {
            input: {
              type: "text",
              required: false,
              _id: "65779e3e48555613bcfb6eef",
              name: "Dirección",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "660173f47cd93c4ee8c875d6": {
            input: {
              type: "text",
              required: true,
              _id: "660173f47cd93c4ee8c875d6",
              name: "Notaria",
              maxCant: 10,
              minCant: 2,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "6601743d7cd93c4ee8c875d8": {
            input: {
              type: "date",
              required: false,
              _id: "6601743d7cd93c4ee8c875d8",
              name: "Fecha",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "660174597cd93c4ee8c875d9": {
            input: {
              type: "text",
              required: false,
              _id: "660174597cd93c4ee8c875d9",
              name: "Acto o contrato",
              maxCant: 20,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "6601747c7cd93c4ee8c875da": {
            input: {
              type: "text",
              required: false,
              _id: "6601747c7cd93c4ee8c875da",
              name: "Otorgante",
              maxCant: 20,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "660174907cd93c4ee8c875db": {
            input: {
              type: "text",
              required: false,
              _id: "660174907cd93c4ee8c875db",
              name: "A favor de",
              maxCant: 20,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "65fe01d67cd93c4ee8c875ce",
              name: "SOLICITANTE",
            },
            iterative: false,
          },
        ],
        documents: [
          {
            group: "General",
            name: "Error. Pide ingresar un documento para crear el acto notarial. Este tramite no solicita documentos",
            required: false,
          },
        ],
        duration: "1 dia",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
      {
        notary: true,
        payment: true,
        document_result: "",
        date: true,
        time_delivery: "0 meses",
        name: "Protocolización de instrumentos públicos o privados",
        category: {
          _id: "654ee1daec53657cb8ebba85",
          name: "Trámites especiales",
          description: "Descripción Trámites especiales",
        },
        description:
          "Acto jurídico en el cual el interesado requiere guardar algún documento en el archivo de la notaría y de manera posterior obtener copias certificadas de ese documento.\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tRealización de la solicitud - petición\n•\tRecolección de documentos originales\n•\tTrámite en la notaria \n•\tEntrega de 2 copias certificadas del acta respectiva\nLos honorarios cancelados, no cubre:\n•\tPago en Notaria\n\nDuración del trámite: 1 día hábil desde que se recibe la información",
        form: {
          "65779d9848555613bcfb6eeb": {
            input: {
              type: "text",
              required: false,
              _id: "65779d9848555613bcfb6eeb",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779dcc48555613bcfb6eec": {
            input: {
              type: "text",
              required: false,
              _id: "65779dcc48555613bcfb6eec",
              name: "Profesión / Ocupación",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e3e48555613bcfb6eef": {
            input: {
              type: "text",
              required: false,
              _id: "65779e3e48555613bcfb6eef",
              name: "Dirección",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
          "65779e9648555613bcfb6ef1": {
            input: {
              type: "text",
              required: false,
              _id: "65779e9648555613bcfb6ef1",
              name: "Razón Social",
              maxCant: 28,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              SOLICITANTE: {
                iterative: false,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "65fe01d67cd93c4ee8c875ce",
              name: "SOLICITANTE",
            },
            iterative: false,
          },
        ],
        documents: [
          {
            group: "General",
            name: "•\tCopias de cédula y certificado de votación del solicitante",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopias de pasaporte y visa vigente, en caso de ser extranjero",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopia del documento a protocolizar ",
            required: false,
          },
          {
            group: "Persona jurídica",
            name: "•\tSi el solicitante es persona jurídica, adjuntar RUC, nombramiento del Representante Legal",
            required: false,
          },
        ],
        duration: "1 dia habil desde que se recibe la información ",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
      {
        notary: false,
        payment: true,
        document_result: "",
        date: false,
        time_delivery: "3 horas",
        name: "Compraventa de inmuebles",
        category: {
          _id: "654ee1daec53657cb8ebba83",
          name: "Inmobiliario",
          description: "Descripción Inmobiliario",
        },
        description:
          "Le permite a un vendedor transferir una propiedad inmueble (casa, departamento, lote de terreno) a un comprador a cambio de un valor.  \n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tSolicitud y Recolección de documentos\n•\tRealización de la minuta \n•\tTrámite en el municipio para transferencia de dominio (pago de impuesto de plusvalía, alcabala y obras)\n•\tTrámite en el Consejo Provincial para pago de impuesto de Alcabala y de Registro\n•\tTrámite en la notaria para firma de escritura\n•\tRetiro de 2 copias certificadas\n•\tTrámite de inscripción en el Registro de la Propiedad\n•\tEntrega de 2 copias certificadas con razón de inscripción\nLos honorarios cancelados, no cubre:\n•\tPago de certificados\n•\tPago de impuestos en el municipio alcabala, obras y plusvalía en caso de existir\n•\tPago de impuestos en el Consejo Provincial\n•\tPago en notaria\n•\tPago de inscripción en Registro de la Propiedad\n\nDuración del trámite: 4 semanas con inscripción en Registro de la Propiedad desde 15 y 17 días hábiles.\n",
        form: {
          "65779d5a48555613bcfb6eea": {
            input: {
              type: "text",
              required: true,
              _id: "65779d5a48555613bcfb6eea",
              name: "Nombre",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779d9848555613bcfb6eeb": {
            input: {
              type: "text",
              required: false,
              _id: "65779d9848555613bcfb6eeb",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779dcc48555613bcfb6eec": {
            input: {
              type: "text",
              required: false,
              _id: "65779dcc48555613bcfb6eec",
              name: "Profesión / Ocupación",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e3e48555613bcfb6eef": {
            input: {
              type: "text",
              required: false,
              _id: "65779e3e48555613bcfb6eef",
              name: "Dirección",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e7848555613bcfb6ef0": {
            input: {
              type: "text",
              required: false,
              _id: "65779e7848555613bcfb6ef0",
              name: "Número de predio ",
              maxCant: 25,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e9648555613bcfb6ef1": {
            input: {
              type: "text",
              required: false,
              _id: "65779e9648555613bcfb6ef1",
              name: "Razón Social",
              maxCant: 28,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              Vendedor: {
                iterative: true,
                checked: true,
              },
              Comprador: {
                iterative: true,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "65779cf248555613bcfb6ee8",
              name: "Vendedor",
            },
            iterative: true,
          },
          {
            actor: {
              _id: "65779cfd48555613bcfb6ee9",
              name: "Comprador",
            },
            iterative: true,
          },
        ],
        documents: [
          {
            group: "General",
            name: "•\tCopia de cédula y certificado de votación del vendedor y comprador y de sus cónyuges en caso de ser casados. ",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopia de pasaporte y visa vigente, en caso de que alguno de los solicitantes sea extranjero.",
            required: false,
          },
          {
            group: "General",
            name: "•\tEscritura de adquisición del inmueble (escritura madre)",
            required: true,
          },
          {
            group: "General",
            name: "•\tCertificado de gravámenes obtenido del Registro de la Propiedad (*)",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopia del impuesto a la herencia, en caso de herencia.",
            required: false,
          },
          {
            group: "General",
            name: "•\tSi el comprador tiene disolución de sociedad conyugal o capitulaciones matrimoniales, partida de matrimonio marginada.",
            required: false,
          },
          {
            group: "General",
            name: "•\tSi uno de los solicitantes actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado. ",
            required: false,
          },
          {
            group: "Requisitos personas jurídicas (Compañías)",
            name: "•\tVendedor: RUC, nombramiento del Representante Legal y acta de la Junta General que autorice la venta. ",
            required: false,
          },
          {
            group: "Requisitos personas jurídicas (Compañías)",
            name: "•\tComprador: RUC y el nombramiento del Representante Legal. ",
            required: false,
          },
          {
            group: "Requisitos personas jurídicas (Compañías)",
            name: "•\tCopia de cédula y papeleta de votación del o los Representantes Legales. ",
            required: false,
          },
        ],
        duration:
          "4 semanas con inscripción en Registro de la Propiedad desde 15 y 17 días hábiles 4 semanas con inscripción en Registro de la Propiedad desde 15 y 17 días hábiles ",
        note_2:
          "(*) Si no cuentas con este documento, en TUS TRAMITES VIP podemos tramitarlo. Por favor indícalo en los comentarios y ten en cuenta que este valor depende de la institución correspondiente, así que posteriormente deberás realizar su pago de forma adicional.",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
      {
        notary: false,
        payment: true,
        document_result: "",
        date: false,
        time_delivery: "0 meses",
        name: "CANCELACIÓN DE HIPOTECA",
        category: {
          _id: "654ee1daec53657cb8ebba83",
          name: "Inmobiliario",
          description: "Descripción Inmobiliario",
        },
        description:
          "La hipoteca debe ser cancelada por el acreedor una vez la deuda haya sido pagada. \n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tRealización de la minuta \n•\tSolicitud y Recolección de documentos\n•\tTrámite en la notaria para firma de la escritura\n•\tRetiro de 2 copias certificadas del documento\n•\tInscripción del contrato en el Registro de la propiedad \nLos honorarios cancelados, no cubre:\n•\tPago en notaria\n•\tPago de inscripción\n\nDuración del trámite: 2 semanas con inscripción en Registro de la Propiedad\n",
        actors: [],
        form: {},
        documents: [
          {
            group: "General",
            name: "•\tCopia de cédula y certificado de votación del acreedor",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopia de pasaporte y visa vigente, en caso de ser extranjero",
            required: false,
          },
          {
            group: "General",
            name: "•\tEscritura de constitución de la hipoteca ",
            required: true,
          },
          {
            group: "General",
            name: "•\tSi el solicitante actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado",
            required: false,
          },
          {
            group: "Persona jurídica",
            name: "•\tRUC, nombramiento del Representante Legal y acta de la Junta General que autorice cancelar la hipoteca. ",
            required: false,
          },
          {
            group: "Persona jurídica",
            name: "•\tCopia de cédula y papeleta de votación del Representante Legal",
            required: false,
          },
        ],
        duration: "2 semanas con inscripción en Registro de la Propiedad",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
      {
        notary: true,
        payment: true,
        document_result: "Minuta",
        date: true,
        time_delivery: "2 horas ",
        name: "CESIÓN DE PARTICIPACIONES DE LA COMPAÑÍA",
        category: {
          _id: "654ee1daec53657cb8ebba84",
          name: "Empresarial",
          description: "Descripción Empresarial",
        },
        description:
          "Es la venta o cesión voluntaria de participaciones y/o acciones. \n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información y/o documentación digital\n•\tFormulación y trazo de directrices para realizar la cesión de participaciones de la compañía\n•\tElaboración de documentos (convocatoria-actas-certificados)\n•\tRecolección de documentos \n•\tElaboración de minuta\n•\tTrámite en la notaria para firma de escritura\n•\tIngreso en la notaría a sentar razones (en escritura de constitución)\n•\tIngreso de escritura al Registro Mercantil para su inscripción\n•\tRetiro y entrega al usuario de 3 copias con razones de inscripción\nLos honorarios cancelados, no cubre:\n•\tPago en notaria (escritura de disolución)\n•\tPago en notaria (marginación)\n•\tPago de inscripción en el Registro Mercantil\n\nDuración del trámite: 13 días hábiles\n",
        form: {
          "65779d5a48555613bcfb6eea": {
            input: {
              type: "text",
              required: true,
              _id: "65779d5a48555613bcfb6eea",
              name: "Nombre",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779d9848555613bcfb6eeb": {
            input: {
              type: "text",
              required: false,
              _id: "65779d9848555613bcfb6eeb",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779dcc48555613bcfb6eec": {
            input: {
              type: "text",
              required: false,
              _id: "65779dcc48555613bcfb6eec",
              name: "Profesión / Ocupación",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "65779e3e48555613bcfb6eef": {
            input: {
              type: "text",
              required: false,
              _id: "65779e3e48555613bcfb6eef",
              name: "Dirección",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "6601782d7cd93c4ee8c875e1": {
            input: {
              type: "text",
              required: true,
              _id: "6601782d7cd93c4ee8c875e1",
              name: "Nombre de la Compañía",
              maxCant: 50,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: false,
              },
            },
          },
          "660178957cd93c4ee8c875e2": {
            input: {
              type: "text",
              required: false,
              _id: "660178957cd93c4ee8c875e2",
              name: "Cuantas acciones o participaciones se le va a ceder",
              maxCant: 5,
              minCant: 1,
              validation: true,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: false,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "6601765a7cd93c4ee8c875dd": {
            input: {
              type: "text",
              required: false,
              _id: "6601765a7cd93c4ee8c875dd",
              name: "Razón social",
              maxCant: 30,
              minCant: 4,
              validation: true,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
          "660178c47cd93c4ee8c875e3": {
            input: {
              type: "text",
              required: false,
              _id: "660178c47cd93c4ee8c875e3",
              name: "Representante Legal",
              maxCant: 20,
              minCant: 3,
              validation: true,
              actor: true,
            },
            actors: {
              CEDENTE: {
                iterative: true,
                checked: true,
              },
              CESIONARIO: {
                iterative: true,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "660177f07cd93c4ee8c875df",
              name: "CEDENTE",
            },
            iterative: true,
          },
          {
            actor: {
              _id: "660177fc7cd93c4ee8c875e0",
              name: "CESIONARIO",
            },
            iterative: true,
          },
        ],
        documents: [
          {
            group: "General",
            name: "•\tCopia de cédula o pasaporte con visa vigente y certificado de votación de los cedentes y cesionarios.",
            required: false,
          },
          {
            group: "General",
            name: "•\tCopia de la escritura de constitución de la Compañía",
            required: false,
          },
          {
            group: "General",
            name: "•\tNombramiento del Representante Legal vigente",
            required: false,
          },
          {
            group: "General",
            name: "•\tRuc de la Compañía",
            required: false,
          },
          {
            group: "General",
            name: "•\tActa de la Junta de socios autorizando la Cesión de Participaciones del socio solicitante.",
            required: false,
          },
          {
            group: "General",
            name: "•\tCertificado emitido por el Representante Legal, dando a conocer la autorización conferida por la junta ",
            required: false,
          },
          {
            group: "Persona Jurídica",
            name: "•\tSi alguno de los cedentes o cesionarios es una persona jurídica, adjuntar RUC, nombramiento del Representante Legal y acta de la Junta General.",
            required: false,
          },
          {
            group: "Persona Jurídica",
            name: "•\tSi alguno de los solicitantes actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado. ",
            required: false,
          },
        ],
        duration: "13 días hábiles",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
      {
        notary: true,
        payment: true,
        document_result: "",
        date: false,
        time_delivery: "2 horas",
        name: "CONSTITUCIÓN DE COMPAÑÍAS",
        category: {
          _id: "654ee1daec53657cb8ebba84",
          name: "Empresarial",
          description: "Descripción Empresarial",
        },
        description:
          "Acto jurídico mediante el cual se crea una persona jurídica. \n\nLos honorarios de Tu Trámite VIP incluye:\n•\tAnálisis de información para constitución de la compañía\n•\tReserva de denominación y establecimiento de actividad comercial la compañía\n•\tElaboración de la minuta \n•\tRecolección de documentos (de ser el caso)\n•\tTrámite en la notaria (ingreso de documentos y retiro de escritura)\n•\tIngreso de escritura al Registro Mercantil para su inscripción\n•\tRetiro de 3 copias con razones de inscripción\n•\tTrámite en la Superintendencia para registro de dirección\n•\tTrámite en el SRI para obtención del RUC\n•\tEntrega al usuario de la documentación respectiva\nLos honorarios cancelados, no cubre:\n•\tPago en Notaria\n•\tPago de inscripción en el Registro Mercantil\n\nDuración del trámite: 16 días hábiles\n",
        form: {
          "65779d5a48555613bcfb6eea": {
            input: {
              type: "text",
              required: true,
              _id: "65779d5a48555613bcfb6eea",
              name: "Nombre",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "65779d9848555613bcfb6eeb": {
            input: {
              type: "text",
              required: false,
              _id: "65779d9848555613bcfb6eeb",
              name: "Estado civil",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "65779dcc48555613bcfb6eec": {
            input: {
              type: "text",
              required: false,
              _id: "65779dcc48555613bcfb6eec",
              name: "Profesión / Ocupación",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "65779e0248555613bcfb6eed": {
            input: {
              type: "text",
              required: false,
              _id: "65779e0248555613bcfb6eed",
              name: "Celular/Teléfono",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "65779e2548555613bcfb6eee": {
            input: {
              type: "email",
              required: false,
              _id: "65779e2548555613bcfb6eee",
              name: "Correo electrónico ",
              maxCant: 25,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "6601850a7cd93c4ee8c875e9": {
            input: {
              type: "text",
              required: false,
              _id: "6601850a7cd93c4ee8c875e9",
              name: "RUC/NIT/ número de identificación",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: true,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "6601765a7cd93c4ee8c875dd": {
            input: {
              type: "text",
              required: false,
              _id: "6601765a7cd93c4ee8c875dd",
              name: "Razón social",
              maxCant: 30,
              minCant: 4,
              validation: true,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: true,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "660178c47cd93c4ee8c875e3": {
            input: {
              type: "text",
              required: false,
              _id: "660178c47cd93c4ee8c875e3",
              name: "Representante Legal",
              maxCant: 20,
              minCant: 3,
              validation: true,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: true,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "6601019c7cd93c4ee8c875d3": {
            input: {
              type: "text",
              required: false,
              _id: "6601019c7cd93c4ee8c875d3",
              name: "Nacionalidad",
              maxCant: 10,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: true,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "660101ba7cd93c4ee8c875d4": {
            input: {
              type: "text",
              required: false,
              _id: "660101ba7cd93c4ee8c875d4",
              name: "Nº cédula/pasaporte",
              maxCant: 15,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: true,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: true,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: false,
              },
            },
          },
          "660185d87cd93c4ee8c875eb": {
            input: {
              type: "text",
              required: false,
              _id: "660185d87cd93c4ee8c875eb",
              name: "Tipo de Compañía para constituir (Anónima, Limitada, en Comandita por Participaciones, Sociedad Civil o de Hecho)",
              maxCant: 30,
              minCant: 2,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "6601862f7cd93c4ee8c875ec": {
            input: {
              type: "text",
              required: false,
              _id: "6601862f7cd93c4ee8c875ec",
              name: "Nombre de la Compañía (Ingresar por lo menos 4 nombres opcionales)",
              maxCant: 60,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "6601865b7cd93c4ee8c875ed": {
            input: {
              type: "text",
              required: false,
              _id: "6601865b7cd93c4ee8c875ed",
              name: "Descripción de las actividades que se pretende realizar ",
              maxCant: 70,
              minCant: 5,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660186767cd93c4ee8c875ee": {
            input: {
              type: "text",
              required: false,
              _id: "660186767cd93c4ee8c875ee",
              name: "Ciudad de domicilio de la Compañía",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660186a27cd93c4ee8c875ef": {
            input: {
              type: "text",
              required: false,
              _id: "660186a27cd93c4ee8c875ef",
              name: "Capital inicial de la Compañía ",
              maxCant: 10,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660186b67cd93c4ee8c875f0": {
            input: {
              type: "number",
              required: false,
              _id: "660186b67cd93c4ee8c875f0",
              name: "Valor de cada participación/acción",
              maxCant: 10,
              minCant: 2,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660186ce7cd93c4ee8c875f1": {
            input: {
              type: "text",
              required: false,
              _id: "660186ce7cd93c4ee8c875f1",
              name: "Administradores",
              maxCant: 30,
              minCant: 4,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660186ef7cd93c4ee8c875f2": {
            input: {
              type: "text",
              required: false,
              _id: "660186ef7cd93c4ee8c875f2",
              name: "Gerente General:",
              maxCant: 20,
              minCant: 3,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
          "660187097cd93c4ee8c875f3": {
            input: {
              type: "text",
              required: false,
              _id: "660187097cd93c4ee8c875f3",
              name: "Porcentaje de c/socio-accionista en el capital",
              maxCant: 7,
              minCant: 1,
              validation: false,
              actor: true,
            },
            actors: {
              "SOLICITANTE/SOCIO/ACCIONISTA": {
                iterative: true,
                checked: false,
              },
              "SI LA COMPAÑÍA ES EXTRANJERA": {
                iterative: false,
                checked: false,
              },
              "COMPAÑÍA A CONSTITUIR": {
                iterative: false,
                checked: true,
              },
            },
          },
        },
        actors: [
          {
            actor: {
              _id: "660184817cd93c4ee8c875e5",
              name: "SOLICITANTE/SOCIO/ACCIONISTA",
            },
            iterative: true,
          },
          {
            actor: {
              _id: "660184bc7cd93c4ee8c875e7",
              name: "SI LA COMPAÑÍA ES EXTRANJERA",
            },
            iterative: false,
          },
          {
            actor: {
              _id: "660184cf7cd93c4ee8c875e8",
              name: "COMPAÑÍA A CONSTITUIR",
            },
            iterative: false,
          },
        ],
        documents: [
          {
            group: "General",
            name: "•\tCopias de cédula y certificado de votación de los socios/accionistas/firmantes Copias de pasaporte y visa vigente, en caso de que algún interesado sea extranjero",
            required: false,
          },
          {
            group: "General",
            name: "•\tSi alguno de los solicitantes actúa con poder, adjuntar poder con fecha de expedición no mayor a 3 meses y a un año en caso de proceder del extranjero (apostillado) o certificación de que el poder no ha sido revocado. ",
            required: false,
          },
          {
            group: "Persona Jurídica",
            name: "•\tAdjuntar RUC, nombramiento del Representante Legal y acta de la Junta General para ser socio o accionista.",
            required: false,
          },
          {
            group: "Persona Jurídica",
            name: "•\tCopia de cédula y papeleta de votación de el o los Representantes Legales. ",
            required: false,
          },
          {
            group: "Empresa extranjera",
            name: "•\tActa de aprobación apostillada de la Junta General para constituir la compañía en Ecuador",
            required: false,
          },
          {
            group: "Empresa extranjera",
            name: "•\tPoder especial apostillado otorgado a nuestro Consorcio Jurídico o a la persona que se va a encargar de constituir la Compañía en Ecuador.",
            required: false,
          },
          {
            group: "Empresa extranjera",
            name: "•\tAdjuntar nómina de socios/accionistas de la matriz (documento apostillado)",
            required: false,
          },
        ],
        duration: "16 días hábiles",
        note: "Para diligenciar los datos de la constitución de la nueva compañía, si tienes alguna inquietud, puedes consultarnos en  nuestro chat en línea para poder guiarte en el proceso.",
        page: {
          _id: "6577a3b548555613bcfb6ef3",
          title: "TÉRMINOS Y CONDICIONES ESPECÍFICOS PARA COMPRAVENTA ",
          url: "term-compraventa",
          content: "",
        },
      },
    ],
  },
];

// seed of act
seeder.connect(
  "mongodb://127.0.0.1:27017/tuexpertolegal?directConnection=true",
  function () {
    seeder.loadModels(["models/NotarialAct.js"]);

    seeder.clearModels(["NotarialActs"], function () {
      seeder.populateModels(dataActs, async function () {
        // Get Category model and seed NotarialAct data
        const notarialActsModel = mongoose.model("NotarialActs");
        const dataNotarial = await notarialActsModel.find().exec();

        const categoryModel= mongoose.model("Category");
        const categories = await categoryModel.find().exec();

        // get id of act notarial
        for (const element of dataNotarial) {
          const elementId = element._id;
          let categorySelected = null;

          // validate  names
          for (const element2 of dataActs[0].documents) {
            if (element.name.toLowerCase() === element2.name.toLowerCase()) {
              categorySelected = element2.category.name;
              break;
            }
          }

          // set correct id of category
          if (categorySelected) {
            const categoryFind = categories.find(
                (category) => category.name.toLowerCase() === categorySelected.toLowerCase()
              )
              if (categoryFind) {
                await notarialActsModel.findByIdAndUpdate(
                  elementId,
                  {
                    category: categoryFind._id,
                  }
                )
              }
          }
        }
        seeder.disconnect();
      });
    });
  }
);
