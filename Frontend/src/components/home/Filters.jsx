import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

const Filters = ({ setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const [valueMin, setValueMin] = useState(priceRange[0]);
  const [valueMax, setValueMax] = useState(priceRange[1]);

  const valueMinCLP = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(valueMin);
  const valueMaxCLP = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(valueMax);

  const filtersArray = [
    "Figura",
    "Peluche",
    "Pixel Art",
    "Musica",
    "Juego fisico",
    "Papeleria",
    "Vajilla",
    "Accesorios",
    "Ropa",
  ];

  const handleCategory = (e) => {
    const category = e.target.value;
    setCategories((prevCategories) => {
      const newCategories = prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category];
      setFilters((prev) => ({ ...prev, categoria: newCategories.join(",") }));
      return newCategories;
    });
  };

  const handleMinPrice = (e) => {
    const value = Number(e.target.value);
    setValueMin(value);
    setPriceRange([value, priceRange[1]]);
    setFilters((prev) => ({ ...prev, precio_min: value || undefined }));
  };
  
  const handleMaxPrice = (e) => {
    const value = Number(e.target.value);
    setValueMax(value);
    setPriceRange([priceRange[0], value]);
    setFilters((prev) => ({ ...prev, precio_max: value || undefined }));
  };

  return (
    <div id="filters" className="mb-2">
      <Container>
        <Row>
          <Col>
            <h4 id="titleText" className="text-center filterText">Filtros</h4>
          </Col>
        </Row>
        <Row>
          <Col className="bg-warning-subtle d-flex flex-column rounded-3">
            <h4 className="p-3 categoryText">Categoría</h4>
            <Form>
              {filtersArray.map((filter, index) => (
                <Form.Check
                  className="pb-3 formCheckColor"
                  key={index}
                  type="checkbox"
                  id={index}
                  label={filter}
                  value={filter}
                  onChange={handleCategory}
                  checked={categories.includes(filter)}
                />
              ))}
            </Form>
            <hr />
            <h4 className="pt-0 p-3 categoryText">Precio</h4>
            <Form.Group className="px-3">
              <Form.Label className="priceRangeText">
                Precio mínimo: <span className="priceRange">{valueMinCLP}</span>
              </Form.Label>
              <Form.Range
                className="custom-range"
                min="0"
                max="100000"
                step="1000"
                value={valueMin}
                onChange={handleMinPrice}
              />
            </Form.Group>
            <Form.Group className="px-3">
              <Form.Label className="priceRangeText">
                Precio máximo: <span className="priceRange">{valueMaxCLP}</span>
              </Form.Label>
              <Form.Range
                className="custom-range"
                min={0}
                max={200000}
                step={1000}
                value={valueMax}
                onChange={handleMaxPrice}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filters;