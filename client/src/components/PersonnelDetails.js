import React from "react";
import { Col, Form, Button, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';


const PersonnelDetails = () => {
    const handleSubmit = async (event) => {
        console.log("Handling submit")
        event.preventDefault()
        // extract form data
        const formdata = new FormData(event.target)
        console.log("formdata");
        console.log(formdata);
        // convert FormData to json object
        const json = {}
        formdata.forEach(function(value, prop){
          json[prop] = value
        })
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(json)  
        };
        console.log(json);
        fetch('http://localhost:8000/personnel', requestOptions)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .catch((err) => console.log(err));
        

    }  
    return (
        <Form onSubmit={handleSubmit}>
          <Button className="mt-2 m-1" color="primary" size="sm" type="cancel">Cancel</Button>
          <Button className="mt-2 m-1" color="primary" size="sm" type="submit">Save</Button>
            {/* Name */}
            <FormGroup row>
                <Label for="name" md={2}>Name</Label>
                <Col md={12}>
                    <Input type="name" name="name" id="name"/>
                </Col>
            </FormGroup>

            {/* Rank */}
            <FormGroup>
                <Label for="rank">Rank</Label>
                <CustomInput type="select" id="rank" name="customSelect">
                    <option value=""></option>
                    <option>Value 1</option>
                    <option>Value 2</option>
                    <option>Value 3</option>
                    <option>Value 4</option>
                    <option>Value 5</option>
                </CustomInput>
            </FormGroup>

        {/* Radio button */}
            <FormGroup tag="fieldset" row>
            <Col sm={10}>
                <FormGroup inline name="sex" check>
                    <Label check>Sex: </Label>
                </FormGroup>
                <FormGroup inline name="sex" check>
                <Label check>
                    <Input type="radio" name="sex" value="M" />{' '}
                    Male
                </Label>
                </FormGroup>
                <FormGroup inline name="sex" check>
                <Label check>
                    <Input type="radio" name="sex" value="F"/>{' '}
                    Female
                </Label>
                </FormGroup>
            </Col>
            </FormGroup>
            
            {/* Start Date */}
            <FormGroup>
            <Label for="date">Start Date:</Label>
            <Input type="date" name="date" id="date" placeholder="date placeholder" />
            </FormGroup>

            {/* Phone */}
            <FormGroup>
            <Label for="phone">Office Phone:</Label>
            <Input type="phone" name="phone" id="phone" />
            </FormGroup>

            {/* Email */}
            <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" />
            </FormGroup>


            {/* Superior */}
            <FormGroup>
                    <Label for="superior">Superior</Label>
                    <CustomInput type="select" id="superior" name="customSelect">
                        <option value=""></option>
                        <option>Value 1</option>
                        <option>Value 2</option>
                        <option>Value 3</option>
                        <option>Value 4</option>
                        <option>Value 5</option>
                    </CustomInput>
                </FormGroup>
            {/* Choose File */}
            <FormGroup row>
            <Label for="exampleFile" sm={2}>File</Label>
            <Col sm={10}>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted"></FormText>
            </Col>
            </FormGroup>
        
        </Form>
        );
    }

    






export default PersonnelDetails;
