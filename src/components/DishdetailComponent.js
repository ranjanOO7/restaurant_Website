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

class DishDetail extends Component {
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
    renderComments(comment) {
        const comp = comment.map((com) => {
            if (comment != null) {
                return (
                    <div>
                        <p>{com.comment}</p>
                        <p>
                            --{com.author},{com.date}
                        </p>
                    </div>
                );
            } else {
                return <div></div>;
            }
        });
        return (
            <div>
                <h4>Comments</h4>
                <div>{comp}</div>
            </div>
        );
    }
    render() {
        console.log(this.props.comp);
        console.log(this.props.comp.comments);
        return (
            <div className="row">
                <div className="col-12 col-sm-12 col-md-5 m-1">
                    {this.renderDish(this.props.comp)}
                </div>
                <div className="col-12 col-sm-12 col-md-5 m-1">
                    {this.renderComments(this.props.comp.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
