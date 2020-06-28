import React, { Component } from 'react'
import '../App.css'
import Menu from './MenuComponent'

import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './HomeComponent'
import Contact from './ContackComponent'
import DishDetail from './DishDetailComponent'
import About from './AboutComponent'
import { addComment } from '../redux/ActionCreators'

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment1: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
})

class Main extends Component {
  render() {
    // function HomePage() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured === true)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = (props) => {
      return (
        <DishDetail
          dish={this.props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
          addComment={this.props.addComment1}
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
