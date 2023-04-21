import { Component } from 'react';
import { getImages } from 'service/image-service';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showBtn: false,
  };
  componentDidUpdate(props, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      getImages(this.state.query, this.state.page).then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.photos],
          showBtn: this.state.page < Math.ceil(data.total_results / 15),
        }));
      });
    }
  }
  onSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  loadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {this.state.images.map(image => {
            return (
              <GridItem key={image.id}>
                <CardItem color={image.avg_color}>
                  <img src={image.src.large} alt={image.alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {this.state.showBtn && (
          <Button type="button" onClick={this.loadMore}>
            Load more
          </Button>
        )}

        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
