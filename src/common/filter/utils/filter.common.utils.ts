export const convertQueryParamsToConditions = ({
  query,
}: {
  query: Record<string, string | string[]>;
}) => {
  // Extraer `or`, asegurando que siempre sea un array
  const orFields: string[] = Array.isArray(query.or)
    ? query.or.map((key) => key.replace(/_/g, ' '))
    : query.or
    ? [query.or.replace(/_/g, ' ')]
    : [];

  // Eliminar `or` antes de procesar los filtros
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key]) => key !== 'or')
  );

  // Crear condiciones aplicando `OR` o `AND` (por defecto `AND`)
  return Object.entries(filteredQuery).map(([key, value]) => ({
    field: key.replace(/_/g, ' '),
    value: value,
    operator: orFields.includes(key.replace(/_/g, ' ')) ? 'OR' : 'AND', // Solo los de `or` serán OR
  }));
};

