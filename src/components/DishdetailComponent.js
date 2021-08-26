import React from "react";
import {
    Card,
    CardImg,
    Breadcrumb,
    BreadcrumbItem,
    CardBody,
    CardText,
    CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-sm-12 col-md-5 m-1">
            <Card key={dish.id}>
                <h1>He got here</h1>
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
        </div>
    );
}

function RenderComments({ comment }) {
    // console.log(comment);
    const comp = comment.map((com) => {
        if (comment != null) {
            return (
                <div className="col-12 col-sm-12 col-md-5 m-1">
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
                </div>
            );
        } else {
            return <div></div>;
        }
    });
    return (
        <div className="col-12 col-sm-12 col-md-5 m-1">
            <h4>Comments</h4>
            <div>{comp}</div>
        </div>
    );
}
const DishDetail = (props) => {
    console.log(props);
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    {/* {this.renderDish(this.props.comp)} */}

                    <RenderComments comment={props.comments} />
                    {/* {this.renderComments(this.props.comp.comments)} */}
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default DishDetail;
