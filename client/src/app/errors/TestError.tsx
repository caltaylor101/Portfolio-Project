import { useState } from 'react';
import axios from 'axios';
import { Header } from 'antd/lib/layout/layout';
import { Button, Row } from 'antd';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'blog/notaguid/notaguid').catch(err => console.log(err));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'blog', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header title='Test Error component' />
            <Row>
                <Button.Group>
                    <Button onClick={handleNotFound} >Not Found</Button>
                    <Button onClick={handleBadRequest} >Bad Request</Button>
                    <Button onClick={handleValidationError} >Validation Error</Button>
                    <Button onClick={handleServerError} >Server Error</Button>
                    <Button onClick={handleUnauthorised} >Unauthorized</Button>
                    <Button onClick={handleBadGuid} >Bad Guid</Button>
                </Button.Group>
            </Row>
            {errors && 
                <ValidationErrors errors={errors} />
            }
        </>
    )
}