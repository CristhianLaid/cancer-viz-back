export type IFilterCommonCondition = {
    field:        string;             // Nombre de la columna a filtrar
    value:        any;                // Valor que debe coincidir
    operator?:    'AND' | 'OR' | undefined | string;       // Operador para combinar filtros
  };
  