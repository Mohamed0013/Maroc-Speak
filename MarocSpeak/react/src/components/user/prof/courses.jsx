import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';

const Profcourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCourses = () => {
        setLoading(true)
        axiosClient.get('/prof/mycourses')
        .then(({data}) => {
          setLoading(false)
          setCourses(data.data)
          console.log(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
      }
    
      useEffect(() => {
        getCourses();
      }, [])
    return (
        <div className="container mt-4">
            <div id='buttons_course'>
                <Link to={'/prof_courses'}>
                    <button id='all_courses'>All courses</button>
                </Link>
                <Link to={'/my_courses'}>
                    <button id='your_course'>Your courses</button>
                </Link>
            </div>
            <div className="row" id='mom-courses'>
                {courses.map(course => (
                    <div key={course.id} className="col-sm-4 mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>{course.created_at}</Card.Text>
                                <Link to={'/course_details'}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profcourses;
