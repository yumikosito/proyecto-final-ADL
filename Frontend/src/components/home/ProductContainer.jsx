import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import PaginationComponent from "./Pagination";
import { Container, Row, Col, Form, Button, Offcanvas } from "react-bootstrap";
import { Funnel, Search } from "react-bootstrap-icons";

const ProductContainer = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");

  const handleSort = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
  };

  const handleCategoryChange = (selectedCategories, selectedPriceRange) => {
    setCategories(selectedCategories);
    setPriceRange(selectedPriceRange);
  };

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        categories.length === 0 || categories.includes(product.category)
    );
    filtered = filtered.filter(
      (product) =>
        product.product_price >= priceRange[0] &&
        product.product_price <= priceRange[1]
    );

    if (search) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "") {
      setFilteredProducts(filtered);
    } else if (sort === "asc") {
      setFilteredProducts(
        [...filtered].sort((a, b) => a.product_price - b.product_price)
      );
    } else if (sort === "desc") {
      setFilteredProducts(
        [...filtered].sort((a, b) => b.product_price - a.product_price)
      );
    }
  }, [categories, priceRange, products, sort, search]);

  return (
    <>
    <Container>
      <Row>
        <Col md={4} lg={3} xl={2} className="d-none d-md-block">
          <Filters
          filterChange={handleCategoryChange}
          />
        </Col>
        <Col md={8} lg={9} xl={10}>
        <Container>
          <Row className="ms-2">
            <Col xs={12} sm={12} md={6} >
              <Form.Group className="d-flex mb-2">
                <Form.Control className="searchOrderBy" size="md" type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="success border-2 searchButtonHome"><Search size={20}/></Button>
              </Form.Group>
            </Col>

            <Col xs={6} className="mb-2">
              <Form.Select size="md" className="searchOrderBy" aria-label="Default select example" onChange={handleSort}>
                <option value="">Ordenar por</option>
                <option value="asc">Menor a mayor precio</option>
                <option value="desc">Mayor a menor precio</option>
              </Form.Select>
            </Col>

            <Col xs={6} className="d-md-none text-center pb-0 mb-2">
              <Button variant="outline-success" className="buttonFiltersSmall d-flex" onClick={() => setShowFilters(true)}>
                <p className="mb-0"> Filtros</p>
                <Funnel size={20}/>
              </Button>
            </Col>

            <Offcanvas show={showFilters} onHide={() => setShowFilters(false)}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Filters filterChange={handleCategoryChange}  />
              </Offcanvas.Body>
            </Offcanvas>
            </Row>
        </Container>

        <Container fluid>
          <Col className="d-flex flex-wrap justify-content-around">
              {filteredProducts.map((prod,index) => (
                <ProductCard key={index} {...prod} />
              ))}
            </Col>

          <Col className="d-flex justify-content-center m-4">
            <PaginationComponent productos={filteredProducts} />
          </Col>
          </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductContainer;
