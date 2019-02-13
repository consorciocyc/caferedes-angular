export class constantes {
  public routeGlobal = "/sip/public/api/"; ///sip/public/api/
  public route = "/sip/public/api/";
  public routeimage = "/sip/public/public/images/"; // ruta para las imagesnes dentro de la carpeta images
  public url_complete = "/sip/public/"; // ruta para abrir los pdf de los medidores
  public url_api = "/sip/public/api/"; // ruta api
  public url_image_internas = "/sip/public/public"; // ruta api
  public SUBMENUS = {
    Materiales: 1,
    Compras: 2,
    Ingresos: 3,
    Despachos: 4,
    Reintegros: 5,
    Reintegros_Masivos: 6,
    Devoluciones: 7,
    Traslados: 8,
    Control_Series: 9,

    Usuario: 10,
    Permisos: 11,
    Proveedores: 12,
    Contratos: 13,
    Empresas: 14,
    Bodegas: 15,
    user: 16,

    Item_Cobro: 20,
    Listas_Maestras: 21,

    Documentos_Epm: 30,
    Obras_Internas: 31,
    Obras_Externas: 32,
    Operaciones: 33,
    Asignación_de_Encargados: 34,
    Programación_Masiva: 35,
    Importar_Obra: 36,
    Pago_Actividades: 37,
    Impresion: 38,
    Extraer_Datos: 39,
    Programación: 40
  };

  public Sexo = [
    { idsexo: 1, name_sexo: "MASCULINO" },
    { idsexo: 2, name_sexo: "FEMENINO" }
  ];

  public KEYBOARD = {
    TECLA_F2: 113,
    TECLA_F4: 115,
    TECLA_plus: 13
  };

  constructor() {}

  getSEXO() {
    return this.Sexo;
  }

  getRouterGlobal() {
    return this.routeGlobal;
  }

  getRouterimage() {
    return this.routeimage;
  }

  getRouterUrl() {
    return this.url_complete;
  }

  getRouter() {
    return this.route;
  }
  getRouterApi() {
    return this.url_api;
  }
  getPermist() {
    return this.SUBMENUS;
  }

  getimage() {
    return this.url_image_internas;
  }
}
