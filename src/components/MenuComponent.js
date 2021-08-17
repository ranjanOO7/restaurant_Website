import React from "react";
import { Component } from "react";
import {
    Card,
    CardImg,
    CardImgOverlay,
    // CardBody,
    // CardText,
    CardTitle,
} from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null,
        };
        console.log("Menu components cunstructor is invoked");
    }

    componentDidMount() {
        console.log("Menu components componentDidMount cunstructor is invoked");
    }

    renderDish(dish) {
        // console.log(dish);
        if (dish != null) {
            return <DishDetail comp={dish} />;
        } else {
            return <div></div>;
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg
                            width="100%"
                            src={dish.image}
                            alt={dish.name}
                        ></CardImg>

                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        console.log("Render method is invoked");

        return (
            <div className="container">
                <div className="row">{menu}</div>
                <div>{this.renderDish(this.state.selectedDish)}</div>
            </div>
        );
    }
}

export default Menu;
