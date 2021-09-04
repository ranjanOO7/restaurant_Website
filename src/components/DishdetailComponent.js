import React, { Component } from "react";
import {
    Card,
    CardImg,
    Breadcrumb,
    BreadcrumbItem,
    CardBody,
    CardText,
    CardTitle,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    Label,
    Nav,
    NavItem,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-sm-12 col-md-5 m-1">
            <Card key={dish.id}>
                <CardImg
                    width="100%"
                    src={baseUrl + dish.image}
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

function RenderComments({ comment, postComment, dishId }) {
    // console.log(comment);
    const comp = comment.map((com) => {
        if (comment != null) {
            return (
                <div className="col-12 col-sm-12 col-md-7 m-1">
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
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}
const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
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

                    <RenderComments
                        comment={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                    {/* {this.renderComments(this.props.comp.comments)} */}
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComOpen: false,
        };

        this.toggleCom = this.toggleCom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleCom();
        this.props.postComment(
            this.props.dishId,
            values.rating,
            values.author,
            values.comment
        );
    }

    toggleCom() {
        this.setState({
            isComOpen: !this.state.isComOpen,
        });
    }

    render() {
        return (
            <div>
                <Nav className="">
                    <NavItem>
                        <Button
                            onClick={this.toggleCom}
                            className="bg-light border border-dark text-dark"
                        >
                            <span className="fa fa-pencil fa-lg"> </span>
                            Submit Comments
                        </Button>
                    </NavItem>
                </Nav>
                <Modal isOpen={this.state.isComOpen} toggle={this.toggleCom}>
                    <ModalHeader toggle={this.toggleCom}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            className="m-1"
                            onSubmit={(values) => this.handleSubmit(values)}
                        >
                            <Row className="form-group mt-1">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    model=".rating"
                                    name="rating"
                                    className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group mt-1">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                    model=".author"
                                    name="author"
                                    id="author"
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
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: "Required",
                                        minLength:
                                            "Must be greater than 2 characters",
                                        maxLength:
                                            "Must be equal to or less than 15 characters",
                                    }}
                                />
                            </Row>
                            <Row className="form-group mt-1">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea
                                    model=".comment"
                                    name="comment"
                                    id="comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </Row>
                            <Row className="form-group mt-1">
                                {/* <Col md={{ size: 10, offset: 2 }}> */}
                                <Button type="submit" className="bg-primary">
                                    Submit
                                </Button>
                                {/* </Col> */}
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default DishDetail;
