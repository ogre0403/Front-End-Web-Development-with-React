import React from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'

// 如果是整個props, 不用加 { }
// function RenderMenuItem({ dish, onClick }) {
const RenderMenuItem = ({ dish, onClick }) => {
  return (
    <Card key={dish.id} onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  )
}

// 如果參數是props中的幾個，要加 { }
const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  )
}

export default Menu
