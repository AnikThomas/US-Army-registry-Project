import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Col, Form, Button, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import Select from 'react-select'

const url = 'http://localhost:8000/personnel';

const UpdatePersonnelDetails = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: ""
      })

    const {id} = useParams();

    useEffect(() => {
        console.log('fetching');
        fetch(url + "/" + id, {method: "get"})
            .then((res) => res.json())
            .then((data) => {
                console.log("fetching a personnel data:" + JSON.stringify(data))
                setFormData(data);
            })
            .catch((err) => console.log(err));
        return () => {};
    }, [id]);


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
          json[prop] = value;

          if(value === "superior" && prop === "") {
            json[prop] = null
          }

        })
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(json)  
        };
        console.log(json);
        fetch('http://localhost:8000/personnel/' + id, requestOptions)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .catch((err) => console.log(err));
    }  

    const rankOptions = [
        { value: 'General', label: 'General' },
        { value: 'Colonel', label: 'Colonel' },
        { value: 'Major', label: 'Major' },
        { value: 'Captain', label: 'Captain' },
        { value: 'Lieutenant', label: 'Lieutenant' },
        { value: 'Warrant Officer', label: 'Warrant Officer' },
        { value: 'Sergeant', label: 'Sergeant' },
        { value: 'Corporal', label: 'Corporal' },
        { value: 'Specialist', label: 'Specialist' },
        { value: 'Private', label: 'Private' },
      ]

    return (
        <Form onSubmit={handleSubmit}>
          <Button className="mt-2 m-1" color="primary" size="sm" type="cancel">Cancel</Button>
          <Button className="mt-2 m-1" color="primary" size="sm" type="submit">Save</Button>

          <Input type="hidden" id="_id" defaultValue={formData._id}/>
            {/* Name */}
            <FormGroup row>
                <Label for="name" md={2}>Name</Label>
                <Col md={12}>
                    <Input type="name" name="name" id="name" defaultValue={formData.name}/>
                </Col>
            </FormGroup>

            {/* Rank */}
            <FormGroup>
                <Label for="rank">Rank</Label>
                <Select key={JSON.stringify(formData.rank)} id="rank" name="rank" options={rankOptions} defaultInputValue={formData.rank} />
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
            <Input type="date" name="date" id="date" placeholder="date placeholder" defaultValue={formData.date} />
            </FormGroup>

            {/* Phone */}
            <FormGroup>
            <Label for="phone">Office Phone:</Label>
            <Input type="phone" name="phone" id="phone" defaultValue={formData.phone}/>
            </FormGroup>

            {/* Email */}
            <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" defaultValue={formData.email}/>
            </FormGroup>

            {/* Superior */}
            <FormGroup>
                    <Label for="superior">Superior</Label>
                    <CustomInput type="select" id="superior" name="superiorFixMe" defaultValue={formData.superior}>
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
                <Input type="file" name="file" id="exampleFile" defaultValue={formData.file}/>
                <FormText color="muted"></FormText>
            </Col>
            </FormGroup>
        
        </Form>
        );
    }

    






export default UpdatePersonnelDetails;
