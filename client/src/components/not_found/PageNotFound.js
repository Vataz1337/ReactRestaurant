import React from 'react';
import { Container, Button } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <Container>
            <h1 className="text-center">404 - Page Not Found</h1>
            <p className="text-center">Sorry, the page you are looking for does not exist.</p>
            <p className="text-center">
                <Button variant="primary" href="/">Go to Homepage</Button>
            </p>
        </Container>
    );
}

export default PageNotFound;