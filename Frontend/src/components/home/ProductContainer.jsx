import React, { useContext, useState, useEffect } from "react";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import PaginationComponent from "./Pagination";
import { ProductContext } from "../../context/ProductContext";
import { Container, Row, Col, Form, Button, Offcanvas } from "react-bootstrap";
import { Funnel, Search } from "react-bootstrap-icons";

const ProductContainer = () => {
  const { filteredProducts, totalProducts, limits, setPage, setFilters } =
    useContext(ProductContext);

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState(filteredProducts);

  // Manejo del filtro de búsqueda por nombre
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Manejo del filtro de ordenamiento
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  // Filtrar y ordenar los productos en base a los cambios de búsqueda y orden
  useEffect(() => {
    let filtered = [...filteredProducts];

    // Filtrado por búsqueda de nombre
    if (search) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Ordenamiento por precio
    if (sort === "asc") {
      filtered = filtered.sort((a, b) => a.product_price - b.product_price);
    } else if (sort === "desc") {
      filtered = filtered.sort((a, b) => b.product_price - a.product_price);
    }

    setProducts(filtered);
  }, [search, sort, filteredProducts]);

  return (
    <Container>
      <Row>
        <Col md={4} lg={3} xl={2} className="d-none d-md-block">
          <Filters setFilters={setFilters} />
        </Col>
        <Col md={8} lg={9} xl={10}>
          <Container>
            <Row className="ms-2">
              <Col xs={12} sm={12} md={6}>
                <Form.Group className="d-flex mb-2">
                  <Form.Control
                    className="searchOrderBy"
                    size="md"
                    type="text"
                    placeholder="Buscar"
                    value={search}
                    onChange={handleSearch}
                  />
                  <Button variant="success border-2 searchButtonHome">
                    <Search size={20} />
                  </Button>
                </Form.Group>
              </Col>

              <Col xs={6} className="mb-2">
                <Form.Select
                  size="md"
                  className="searchOrderBy"
                  onChange={handleSort}
                >
                  <option value="">Ordenar por</option>
                  <option value="asc">Menor a mayor precio</option>
                  <option value="desc">Mayor a menor precio</option>
                </Form.Select>
              </Col>

              <Col xs={6} className="d-md-none text-center pb-0 mb-2">
                <Button
                  variant="outline-success"
                  className="buttonFiltersSmall d-flex"
                  onClick={() => setShowFilters(true)}
                >
                  <p className="mb-0"> Filtros</p>
                  <Funnel size={20} />
                </Button>
              </Col>

              <Offcanvas show={showFilters} onHide={() => setShowFilters(false)}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <Filters setFilters={setFilters} />
                </Offcanvas.Body>
              </Offcanvas>
            </Row>
          </Container>

          <Container fluid>
            <Col className="d-flex flex-wrap justify-content-around">
              {products.map((prod, index) => (
                <ProductCard key={index} {...prod} />
              ))}
            </Col>

            <Col className="d-flex justify-content-center m-4">
              <PaginationComponent
                productos={products}
                totalProducts={totalProducts}
                limits={limits}
                setPage={setPage}
              />
            </Col>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductContainer;
