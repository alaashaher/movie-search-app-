import React, { Component } from 'react';
import axios from 'axios';

import MovieCard from '../MovieCard/MovieCard';
import Search from '../Search/Search';

class MovieSearch extends Component {
    state = {
        movieId: 'tt1442449',
        title: '',
        movie: {},
        searchResults: [],
        isSearching: false
    }

    componentDidMount() {
        this.loadMovie()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieId !== this.state.movieId) {
            this.loadMovie()
        }
    }

    loadMovie() {
        axios.get(`http://www.omdbapi.com/?apikey=ee8711b&i=${this.state.movieId}`)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch(error => {
                console.log('Opps!', error.message);
            })
    }

    timeout = null;

    searchMovie = (event) => {
      console.log("event.target.value");
      console.log(event.target.value);
        this.setState({isSearching: true});
        this.setState({title: event.target.value});

        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            axios.get(`http://www.omdbapi.com/?apikey=ee8711b&s=${this.state.title}`)
                .then(response => {
                  console.log("response.data.Search");
                    console.log(response.data.Search);
                    if (response.data.Search) {
                        const movies = response.data.Search.slice(0, 5);
                        this.setState({ searchResults: movies });
                    }
                })
                .catch(error => {
                    console.log('Opps!', error.message);
                })
        }, 1000)


    }
    itemClicked = (item) => {
        this.setState(
            {
                movieId: item.imdbID,
                isSearching: false,
                title: item.Title,
            }
        )
    }


    render() {
        return (
            <div onClick={() => this.setState({ isSearching: false })}>
                <Search
                    defaultTitle={this.state.title}
                    search={this.searchMovie}
                    results={this.state.searchResults}
                    clicked={this.itemClicked}
                    searching={this.state.isSearching} />

                <MovieCard movie={this.state.movie} />
            </div>
        );
    }
}

export default MovieSearch;
