import { useState } from 'react';
import style from './Filters.module.css';  // Importa el archivo CSS local

const Filters = ({
  handleFilterByOrigin,
  handleFilterByTemp,
  handleSort,
  allTemperaments,
  handleResetFilters,
}) => {
  // Estados para los filtros seleccionados
  const [selectedOrigin, setSelectedOrigin] = useState('default');
  const [selectedType, setSelectedType] = useState('default');
  const [selectedSort, setSelectedSort] = useState('default');

  // Función para restablecer los filtros a sus valores predeterminados
  const resetFilters = () => {
    setSelectedOrigin('default');
    setSelectedType('default');
    setSelectedSort('default');

    handleResetFilters();
  };

  return (
    <div className={style.filtersContainer}> {/* // Contenedor principal de filtros */}
      <div className={style.originFilter}>  {/* // Filtro de origen */}
        <select
          value={selectedOrigin}  // Valor seleccionado del filtro de origen
          onChange={(e) => {
            setSelectedOrigin(e.target.value);  // Actualiza el valor seleccionado
            handleFilterByOrigin(e);  // Llama a la función de filtro por origen
          }}
        >
          <option
            value={'default'}
            hidden
          >
            Origin
          </option>
          <option value="All">All</option>
          <option value="API">API</option>
          <option value="Created">Created</option>
        </select>
      </div>

        {/* Filtro de tipo (temperamento) */}
      <div className={style.typeFilter}> 
        <select
          value={selectedType}  // Valor seleccionado del filtro de tipo
          onChange={(e) => {
            setSelectedType(e.target.value);  // Actualiza el valor seleccionado
            handleFilterByTemp(e);  // Llama a la función de filtro por tipo
          }}
        >
          <option
            value={'default'}
            hidden
          >
            Type
          </option>
          <option value="All">All</option>
          {allTemperaments.map((temperament) => (
            <option
              key={temperament.id}
              value={temperament.name}
            >
              {temperament.name}
            </option>
          ))}
        </select>
      </div>

      <div className={style.sortFilter}>  {/*  Filtro de orden */}
        <select
          value={selectedSort}  // Valor seleccionado del filtro de orden
          onChange={(e) => {
            setSelectedSort(e.target.value);  // Actualiza el valor seleccionado
            handleSort(e);  // Llama a la función de ordenamiento
          }}
        >
          <option
            value={'default'}
            hidden
          >
            Order
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="weight-asc">weight-asc</option>
          <option value="weight-desc">weight-desc</option>
          <option value="height-asc">height-asc</option>
          <option value="height-desc">height-desc</option>
          <option value="lifeSpan-asc">lifeSpan-asc</option>
          <option value="lifeSpan-desc">lifeSpan-desc</option>
        </select>
      </div>

      <div>
        <button onClick={resetFilters}>Reset Filters</button>  {/*  Botón para restablecer los filtros */}
      </div>
    </div>
  );
};

export default Filters;  // Exporta el componente Filters
