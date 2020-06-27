import React, { Component } from 'react'

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail extends Component {
  constructor(props) {
    super(props)
  }

  renderDish(dish) {
    if (dish != null) {
      const comment = dish.comments.map((c) => {
        return (
          <>
            <CardText>{c.comment}</CardText>
            <CardText>
              {`--- ${c.author}, 
            ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(
              new Date(Date.parse(c.date))
            )}`}
            </CardText>
          </>
        )
      })

      return (
        <>
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-5 m-1">
            <Card className="border-0">
              <CardBody>
                <CardTitle>Comment</CardTitle>
                {comment}
              </CardBody>
            </Card>
          </div>
        </>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.renderDish(this.props.dish)
  }
}

export default DishDetail
