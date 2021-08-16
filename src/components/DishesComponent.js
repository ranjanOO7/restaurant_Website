import React from "react";
import { Component } from "react";
import {
    Card,
    CardImg,
    // CardImgOverlay,
    CardBody,
    CardText,
    CardTitle,
} from "reactstrap";

class DishesComp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg
                    width="100%"
                    src={dish.image}
                    alt={dish.name}
                ></CardImg>

                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    renderComments() {
        return <h4>Comments</h4>;
    }
    render() {
        // const comp = this.props.comp.map((dish) => {
        console.log(this.props.comp);
        console.log(this.props.comp);
        return (
            <div class="row">
                <div className="col-12 col-sm-12 col-md-5 m-1">
                    {this.renderDish(this.props.comp)}
                </div>
                <div className="col-12 col-sm-12 col-md-5 m-1">
                    {this.renderComments()}
                </div>
            </div>
        );
        // });
    }
}

export default DishesComp;
