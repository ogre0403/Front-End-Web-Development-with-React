import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  Row,
  Col,
  Label,
} from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom'

const required = (val) => val && val.length
const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleSubmit = (values) => {
    alert('Current State is: ' + JSON.stringify(values))
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group ml-1 mr-1">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group ml-1 mr-1">
                <Label htmlFor="yourname">Your Name</Label>
                <Control.text
                  model=".yourname"
                  id="yourname"
                  name="yourname"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".yourname"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </Row>
              <Row className="form-group ml-1 mr-1">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
      </>
    )
  }
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
