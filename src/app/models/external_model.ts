export class External {
  public idmunicipality: number;
  public idobr_externa: any;
  public obr_consecutivo: any;
  public obr_empresa: number;
  public obr_contrato: number;
  public obr_nplano: any;
  public obr_date: any;
  public obr_direccion: any;
  public obr_municipio: number;
  public obr_ans: any;
  public obr_extado: number;
  public obr_notas: any;
  public obr_nproyecto: any;
  public obr_date_ini: any;
  public obr_date_end: any;
  public obr_tipo: number;
  public obr_date_asig: any;
}

export class Anillos {
  public idobr_anillos: any;
  public idobr_externa: any;
  public obr_anillos_consecutivo: any;
  public obr_anillos_company: any;
  public obr_anillos_contract: any;
  public obr_anillos_anillo: any;
  public obr_anillos_instalacion: any;
  public obr_anillos_pedido: any;
  public obr_anillos_type_obr: any;
  public obr_anillos_ot: any;
  public obr_anillos_state: any;
  public obr_anillos_obser: any;
  public obr_anillos_cierreanillo: any;
  public obr_anillos_gasificacion: any;
  public obr_anillos_herme: any;
  public obr_anillos_refer: any;
  public obr_anillos_concre: any;
  public obr_anillos_pav: any;
  public obr_anillos_gpz: any;
  public obr_anillos_oti: any;
  public obr_anillos_solicitud: any;

  public otiStartDate: any;
  public otiLastDate: any;
}
export class Presupuesto_Oti {
  public iditem_presupuesto: any;
  public item_presupuesto_class: any;
  public item_presupuesto_codeid: any;
  public item_presupuesto_code: any;
  public item_presupuesto_cantidad: any;
  public item_presupuesto_acomulado: any;
  public item_presupuesto_company: any;
  public item_presupuesto_contract: any;
  public item_presupuest_idoti: any;
  public item_presupuesto_idexterna: any;
}
//modelo detalles de obra
export class Dobra {
  public iddetalles_obra: any;
  public detalles_obra_compay: any;
  public detalles_obra_contract: any;
  public detalles_obra_idobra: any;
  public detalles_obra_idoti: any;
  public detalles_obra_date: any;
  public detalles_obra_encargado: any;
  public detalles_obra_pegador: any;

  public detalles_obra_encargado1: any;
  public detalles_obra_pegador1: any;
  public detalles_obraobser: any;

  public quejas: any;
  public problemss: any;
  public type_gans: any;
}
//topografia (hecho por Anderson)
export class topografiamodel {
  public topotramo: any; //Tramo
  public topoipid: any; //Ipid
  public toponodeslength: any; //Longitud entre nodos
  public topoDiameter: any; //Diametro
  public topoMaterial: any; //Material
  public topoDate: any; //Fecha
  public ininode: any; //Nodo
  public iniaddress: any; //Direccion
  public iniTypeMaterial: any; //Tipo material
  public inidiameterMaterial: any; //Diametro material
  public inicoorEste: any; //Coordenada este
  public inicoorNorte: any; //Coordenada Norte
  public inicotaKey: any; //Cota clave
  public inicotaTerreno: any; //Cota terreno
  public iniObservation: any; //Observación
  public finnode: any; //Nodo
  public finaddress: any; //Direccion
  public finTypeMaterial: any; //Tipo material
  public findiameterMaterial: any; //Diametro material
  public fincoorEste: any; //Coordenada este
  public fincoorNorte: any; //Coordenada Norte
  public fincotaKey: any; //Cota clave
  public fincotaTerreno: any; //Cota terreno
  public finObservation: any; //Observación
  public id_topografia: any; //id_topo
  public toponodoinicial: any; //nodo inicial
  public toponodofinal: any; //nodo final
  public id_material: any; //id_materil
  public topoidipid: any; //topo id ipid
  public inimate: any;
  public inimateid: any;
  public finmate: any;
  public finmateid: any;
}
export class ipidmodel {
  public ipidipid: any;
  public ipidaddress: any;
}
