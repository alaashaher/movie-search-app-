import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import './Search.css';

const Search = (props) => {
  console.log(props);
    let resultList = null

    if (props.searching && (props.defaultTitle !== '')) {
        resultList = (
            <ul className="results">
                {props.results.map(item => (
                    <li key={item.imdbID} onClick={() => props.clicked(item)}>
                        <img src={item.Poster} alt="Movie Poster"/>
                        {item.Title}
                    </li>
                ))}
            </ul>
        )
    }

    return (
      <Container>
        <Row>
          <Col xs="12">
            <div className="search">
                <input type="search" name="movie-search" value={props.defaultTitle} onChange={props.search} />
                {resultList}
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default Search;
