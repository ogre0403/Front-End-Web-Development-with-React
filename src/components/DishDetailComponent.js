import React from 'react'

import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const CommentForm = () => {
  return (
    <Button outline color="secondary">
      <span className="fa fa-pencil fa-lg"></span> Submit Comment
    </Button>
  )
}

// function RenderDish({ dish }) {
// or
// const RenderDish = ({ dish }) => {
const RenderDish = ({ dish, comments }) => {
  if (dish != null) {
    const comment = comments.map((c) => {
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
          <CommentForm />
        </div>
      </>
    )
  } else {
    return <div></div>
  }
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} comments={props.comments} />
      </div>
    </div>
  )
}

export default DishDetail
