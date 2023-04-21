import { Component } from 'react';
import { getImages } from 'service/image-service';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: "",
    page: 1,
  }
  componentDidUpdate(props, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      getImages(this.state.query, this.state.page).then(data => console.log(data));
    }
  } 
  onSubmit =(query)=> {
    this.setState({ query });
  }


  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
