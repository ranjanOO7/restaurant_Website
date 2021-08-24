import React from "react";
import {
    Card,
    CardImg,
    // CardImgOverlay,
    CardBody,
    CardText,
    CardTitle,
} from "reactstrap";

function RenderDish({ dish }) {
    return (
        <Card key={dish.id}>
            <h1>He got here</h1>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comment }) {
    // console.log(comment);
    const comp = comment.map((com) => {
        if (comment != null) {
            return (
                <div key={com.id}>
                    <p>{com.comment}</p>
                    <p>
                        --{com.author},
                        {new Intl.DateTimeFormat("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(com.date)))}
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
const DishDetail = (props) => {
    // console.log(props.dish);
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                        {/* {this.renderDish(this.props.comp)} */}
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        <RenderComments comment={props.dish.comments} />
                        {/* {this.renderComments(this.props.comp.comments)} */}
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default DishDetail;
